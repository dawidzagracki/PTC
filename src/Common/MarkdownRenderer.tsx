import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => <h1 style={{ marginTop: "20px" }}>{children}</h1>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code: ({ node, className, children, ...props }) => (
          <pre
            style={{
              background: "#101927",
              padding: "14px",
              borderRadius: "6px",
            }}
          >
            <code>{children}</code>
          </pre>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
