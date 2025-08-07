// remark-lint-hugo-callouts.js
import { visit } from 'unist-util-visit';

// This regex finds callout shortcodes: {{< callout ... >}}
const calloutRegex = /\{\{<\s*callout([^>]*)\s*>\}\}/g;

const remarkLintHugoCallouts = (tree, file) => {
    // Use 'visit' to check every text node in the document
    visit(tree, 'text', (node) => {
        // Check if the text node's content matches our regex
        for (const match of node.value.matchAll(calloutRegex)) {
            const shortcodeParams = match[1]; // The part inside the shortcode

            // If the parameters do not include 'type='
            if (!shortcodeParams.includes('type=')) {
                // Report an error
                file.message('Callout shortcode is missing a `type` parameter.', node);
            }
        }
    });
};

export default remarkLintHugoCallouts;