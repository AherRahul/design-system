//NOTE: nem todos os parâmetros estão funcionando aqui
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: "docs",
  options: {
    previewTabs: {
      canvas: { hidden: true },
    },
    storySort: {
      order: [
        "Foundation",
        [
          "Principles",
          "Cores",
          "Typography",
          "Font Weight",
          "Spacing",
          "Edges",
          "Layout"
        ],
        "Components",
        [
          "Display",
          "Notification",
          "Forms",
          "Navigation",
          "Containers",
          "Overlays",
          "Loaders",
          "Structural",
          "Utils",
        ],
      ],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import { app } from "@storybook/vue3";
import Rdstip from "../src/utils/directives/rdstip";
import RdsFloatify from "../src/utils/directives/rdsFloatify";

app.directive("rdstip", Rdstip);
app.directive("rds-floatify", RdsFloatify);
app.mount("#app");
