import jsPlugin from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
    jsPlugin.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
