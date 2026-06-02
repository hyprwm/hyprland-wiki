const WORDS_DO_NOT_CAPITALIZE_IN_HEADINGS = [
  "swww",
  "uwsm",
  "wallrizz",
  "swww",
  "hyprpm",
  "hyprpaper",
  "swaybg",
  "waypaper",
  "wpaperd",
  "mpvpaper",
  "wofi",
  "rofi",
  "bmenu",
  "tty",
];

const WORDS_ENFORCE_EXACT_CASING = [
  ...WORDS_DO_NOT_CAPITALIZE_IN_HEADINGS,
  "Hyprland",
  "XWayland",
  "RegEx",
  "DRM",
  "QWERTY",
  "AZERTY",
  "OBS",
  "GPU",
  "CPU",
];

export default {
  plugins: [
    [
      "remark-lint-heading-capitalization",
      {
        ignorePattern:
          "`[^`]*`|" + // Everything inside backticks
          WORDS_DO_NOT_CAPITALIZE_IN_HEADINGS.join("|"), // Ignore words that already have a specific case defined
      },
    ],
    [
      "remark-lint-word-case",
      {
        words: WORDS_ENFORCE_EXACT_CASING,
      },
    ],
    ["remark-preset-lint-recommended"],
    ["remark-preset-lint-consistent"],
    ["remark-lint-blockquote-indentation", 2],
    ["remark-lint-code-block-style", "fenced"],
    ["remark-lint-emphasis-marker", "_"],
    ["remark-lint-strong-marker", "*"],
    ["remark-lint-heading-style", "atx"],
    [
      "remark-lint-table-cell-padding",
      {
        style: "padded",
      },
    ],
    ["remark-lint-table-pipes"],
    [
      "remark-frontmatter",
      {
        type: "yaml",
        fence: "---",
      },
    ],
  ],
};
