import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { useState } from "react";

// ─── Image with lightbox ─────────────────────────────────────────────────────
const DocImage = ({ src, alt }: { src?: string; alt?: string }) => {
  const [open, setOpen] = useState(false);
  if (!src) return null;
  return (
    <>
      <figure className="my-6">
        <div
          className="group relative overflow-hidden rounded-xl border border-border cursor-zoom-in shadow-sm hover:shadow-md transition-shadow"
          onClick={() => setOpen(true)}
        >
          <img
            src={src}
            alt={alt || ""}
            className="w-full object-contain max-h-[480px] bg-muted/30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md">
              Click to enlarge
            </span>
          </div>
        </div>
        {alt && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none font-light"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <img
            src={src}
            alt={alt || ""}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

// ─── Custom component overrides ──────────────────────────────────────────────
const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-foreground mt-0 mb-6 pb-3 border-b border-border">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border/60">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-foreground mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-foreground mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-sm text-muted-foreground leading-7 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-1 space-y-1.5 list-none">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-4 space-y-1.5 list-decimal">{children}</ol>
  ),
  li: ({ children, ...props }) => {
    // Check if inside ol (ordered list) - simpler rendering
    return (
      <li className="text-sm text-muted-foreground leading-relaxed pl-1">
        {children}
      </li>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-4 border-primary/40 bg-primary/5 rounded-r-lg px-4 py-3 text-sm text-foreground/80 italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return (
        <code className="block w-full overflow-x-auto text-xs font-mono leading-relaxed">
          {children}
        </code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-primary">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-5 p-4 rounded-xl bg-muted border border-border overflow-x-auto text-sm">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => <DocImage src={src} alt={alt} />,
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/60 text-foreground font-semibold">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-muted-foreground">{children}</td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
    >
      {children}
    </a>
  ),
};

// ─── Main DocPage component ───────────────────────────────────────────────────
interface DocPageProps {
  /** Raw markdown string — paste your .md content here */
  content: string;
  className?: string;
}

const DocPage = ({ content, className = "" }: DocPageProps) => {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default DocPage;
