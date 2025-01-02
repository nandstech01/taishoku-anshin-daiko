import './blog.css';
import Header from '@/components/common/Header';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="blog-container">
        <div className="blog-content">
          {children}
        </div>
      </main>
    </>
  );
} 