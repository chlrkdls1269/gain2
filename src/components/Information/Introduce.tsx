import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InformationProps } from "@/types";

const Introduce = ({ markdown }: Pick<InformationProps, "markdown">) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children, ...props }) => {
          if (href?.startsWith("#")) {
            return (
              <a
                href={href}
                onClick={(e) => {
                  const target = document.getElementById(href.slice(1));
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                {...props}
              >
                {children}
              </a>
            );
          }
          return (
            <a href={href} target="_blank" rel="noreferrer" {...props}>
              {children}
            </a>
          );
        },
      }}
    >
      {markdown ?? ""}
    </ReactMarkdown>
  );
};

export default Introduce;
