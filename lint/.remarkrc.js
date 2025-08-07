import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import remarkLintHeadingStyle from 'remark-lint-heading-style';
import remarkRetext from 'remark-retext';
import retextCasePolice from 'retext-case-police';
import { parser as retextEnglish } from 'retext-english';
import unifiedLintRule from 'unified-lint-rule';


import remarkLintHugoCallouts from './remark-lint-hugo-callouts.js';

export default {
    plugins: [
        // Provides a great set of standard markdown rules
        remarkPresetLintConsistent,

        // Force ATX headings
        [remarkLintHeadingStyle, { "style": "atx" }],

        // Force title case for headings
        ['remark-lint-heading-style', ['error', 'title-case']],

        // Force specific capitalization for certain words (e.g., Hyprland, Wayland)
        [
            remarkRetext,
            [
                retextEnglish,
                [
                    retextCasePolice,
                    {
                        // Force specific words to be capitalized
                        check: [
                            'Hyprland',
                            'Wayland',
                            'RegEx',
                            'XWayland',
                        ],
                    },
                ],
            ],
        ],

        // Force all Hugo callouts to have a type
        [unifiedLintRule, 'remark-lint:hugo-callouts', remarkLintHugoCallouts],
    ],
};