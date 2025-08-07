import { visit } from "unist-util-visit";

export default function remarkLintWordCase(options = {}) {
  const debug = !!options.debug || !!process.env.DEBUG_WORDCASE;

  const words = Array.isArray(options.words) ? options.words : [];
  const ignoreUrls = !!options["ignore-urls"];
  const ignoreCode = !!options["ignore-code"];

  if (debug) {
    console.log("[remark-lint-word-case] init:", {
      words,
      ignoreUrls,
      ignoreCode,
    });
  }

  if (words.length === 0) {
    if (debug)
      console.log(
        "[remark-lint-word-case] no words configured — nothing to check"
      );
    return () => {};
  }

  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (ignoreCode && (node.type === "code" || node.type === "inlineCode")) {
        if (debug) console.log("[remark-lint-word-case] skipping code node");
        return;
      }

      if (
        ignoreUrls &&
        (node.type === "link" ||
          node.type === "linkReference" ||
          node.type === "image" ||
          node.type === "imageReference")
      ) {
        if (debug)
          console.log("[remark-lint-word-case] skipping link/image node");
        return;
      }

      if (
        ignoreUrls &&
        parent &&
        (parent.type === "link" || parent.type === "linkReference")
      ) {
        if (debug)
          console.log(
            "[remark-lint-word-case] skipping text inside link label"
          );
        return;
      }

      if (node.type !== "text") return;

      const text = node.value;
      for (const expected of words) {
        const re = new RegExp(`\\b${expected}\\b`, "gi");
        let match;
        while ((match = re.exec(text)) !== null) {
          if (match[0] !== expected) {
            if (debug)
              console.log(
                `[remark-lint-word-case] mismatch found: "${match[0]}" → should be "${expected}"`
              );
            file.message(
              `Expected “${expected}” but found “${match[0]}”`,
              node
            );
          }
        }
      }
    });
  };
}
