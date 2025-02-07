import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { Root, Text, Parent, RootContent } from 'mdast';
import { VFile } from 'vfile';
import { Plugin } from 'unified';

export type TableOfContentsItem = {
  id: string;
  text: string;
  level: number;
  children?: TableOfContentsItem[];
};

type CustomVFile = VFile & {
  data: {
    headings: TableOfContentsItem[];
  };
};

// 画像処理用のプラグイン
const remarkProcessImages: Plugin<[], Root> = function() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent: Parent | undefined) => {
      if (!parent || typeof index !== 'number') return;

      const imageRegex = /!\[\[([a-f0-9-]+)\]\]/g;
      if (imageRegex.test(node.value)) {
        const parts: RootContent[] = [];
        let lastIndex = 0;
        let match;

        // Reset regex state
        imageRegex.lastIndex = 0;
        
        while ((match = imageRegex.exec(node.value)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push({
              type: 'text',
              value: node.value.slice(lastIndex, match.index)
            } as Text);
          }

          // Add image node
          parts.push({
            type: 'html',
            value: `<div class="blog-image" data-image-id="${match[1]}"><img src="/api/images/${match[1]}" alt="" loading="lazy" /></div>`
          });

          lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < node.value.length) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex)
          } as Text);
        }

        // Replace the current node with the new parts
        parent.children.splice(index, 1, ...parts);
      }
    });
  };
};

// 共通のID生成関数
export function generateHeadingId(text: string): string {
  // 数字のみの場合は、プレフィックスを追加
  const match = text.match(/^(\d+)\.\s*(.+)$/);
  if (match) {
    const [, number, title] = match;
    const normalizedTitle = title
      .toLowerCase()
      .replace(/[^\w\u3000-\u9fff\s-]/g, '') // 日本語文字、英数字、ハイフン、スペースを許可
      .replace(/[\(\)（）：\?？、。]/g, '') // 括弧、コロン、疑問符、読点、句点を削除
      .replace(/[　\s]+/g, '-') // 全角スペース、半角スペースをハイフンに変換
      .replace(/-+/g, '-') // 連続するハイフンを単一のハイフンに変換
      .replace(/^-+|-+$/g, '') // 先頭と末尾のハイフンを削除
      .trim(); // 余分な空白を削除
    return `section-${number}-${normalizedTitle}`;
  }

  // 通常のケース
  return text
    .toLowerCase()
    .replace(/[^\w\u3000-\u9fff\s-]/g, '') // 日本語文字、英数字、ハイフン、スペースを許可
    .replace(/[\(\)（）：\?？、。]/g, '') // 括弧、コロン、疑問符、読点、句点を削除
    .replace(/[　\s]+/g, '-') // 全角スペース、半角スペースをハイフンに変換
    .replace(/-+/g, '-') // 連続するハイフンを単一のハイフンに変換
    .replace(/^-+|-+$/g, '') // 先頭と末尾のハイフンを削除
    .trim(); // 余分な空白を削除
}

const remarkExtractHeadings: Plugin<[], Root> = function() {
  return (tree: Root, file: VFile) => {
    const vfile = file as CustomVFile;
    vfile.data.headings = [];
    const stack: (TableOfContentsItem | undefined)[] = [undefined, undefined, undefined];

    visit(tree, 'heading', (node) => {
      const depth = node.depth;
      if (depth >= 2 && depth <= 4) {
        const text = toString(node);
        const id = generateHeadingId(text);
        const item: TableOfContentsItem = {
          id,
          text,
          level: depth,
          children: [],
        };

        // デバッグ用のログを追加
        console.log('Generated heading:', { text, id, depth });

        if (depth === 2) {
          vfile.data.headings.push(item);
          stack[0] = item;
          stack[1] = undefined;
          stack[2] = undefined;
        } else if (depth === 3 && stack[0]) {
          if (!stack[0].children) stack[0].children = [];
          stack[0].children.push(item);
          stack[1] = item;
          stack[2] = undefined;
        } else if (depth === 4 && stack[1]) {
          if (!stack[1].children) stack[1].children = [];
          stack[1].children.push(item);
          stack[2] = item;
        }
      }
    });
  };
};

export async function parseMarkdown(content: string): Promise<{ html: string; headings: TableOfContentsItem[] }> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkProcessImages)
    .use(remarkExtractHeadings)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug, {
      prefix: '',
      slugify: generateHeadingId
    })
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { class: 'anchor' }
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const vfile = file as CustomVFile;
  
  // デバッグ用：生成されたIDを確認
  console.log('Generated headings:', vfile.data.headings.map(h => ({
    text: h.text,
    id: h.id,
    level: h.level,
    originalText: h.text,
    generatedId: generateHeadingId(h.text)
  })));

  return {
    html: String(file),
    headings: vfile.data.headings,
  };
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const lines = content.split('\n');
  const stack: (TableOfContentsItem | undefined)[] = [];

  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    const h4Match = line.match(/^####\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1];
      const id = generateHeadingId(text);
      const item: TableOfContentsItem = {
        id,
        text,
        level: 2,
        children: [],
      };
      headings.push(item);
      stack[0] = item;
      stack[1] = undefined;
    } else if (h3Match && stack[0]) {
      const text = h3Match[1];
      const id = generateHeadingId(text);
      const item: TableOfContentsItem = {
        id,
        text,
        level: 3,
        children: [],
      };
      if (!stack[0].children) {
        stack[0].children = [];
      }
      stack[0].children.push(item);
      stack[1] = item;
    } else if (h4Match && stack[1]) {
      const text = h4Match[1];
      const id = generateHeadingId(text);
      const item: TableOfContentsItem = {
        id,
        text,
        level: 4,
      };
      if (!stack[1].children) {
        stack[1].children = [];
      }
      stack[1].children.push(item);
    }
  });

  return headings;
} 