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
];

const WORDS_ENFORCE_EXACT_CAPITALIZATION = [
  ...WORDS_DO_NOT_CAPITALIZE_IN_HEADINGS,
  ["Hyprland", "XWayland", "RegEx"],
];

export default {
  plugins: [
    [
      "remark-lint-heading-capitalization",
      {
        ignorePattern: WORDS_DO_NOT_CAPITALIZE_IN_HEADINGS.join("|"),
      },
    ],
    ["remark-preset-lint-recommended"],
    ["remark-preset-lint-consistent"],
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
