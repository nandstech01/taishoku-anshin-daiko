import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
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

const remarkExtractHeadings: Plugin<[], Root> = function() {
  return (tree: Root, file: VFile) => {
    const vfile = file as CustomVFile;
    vfile.data.headings = [];
    const stack: (TableOfContentsItem | undefined)[] = [undefined, undefined, undefined];

    visit(tree, 'heading', (node) => {
      const depth = node.depth;
      console.log('Found heading:', { depth, text: toString(node) });
      if (depth >= 2 && depth <= 4) {
        const text = toString(node);
        const id = generateHeadingId(text);
        const item: TableOfContentsItem = {
          id,
          text,
          level: depth,
          children: [],
        };

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
    .use(remarkExtractHeadings)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { class: 'anchor' }
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const vfile = file as CustomVFile;
  return {
    html: String(file),
    headings: vfile.data.headings,
  };
}

export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]/g, '-')
    .replace(/[^\w\u3000-\u9fff\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
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