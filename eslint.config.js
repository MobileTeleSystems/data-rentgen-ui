import jsPlugin from "@eslint/js";
import tsPlugin from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import compatPlugin from "eslint-plugin-compat";

export default tsPlugin.config(
    jsPlugin.configs.recommended,
    tsPlugin.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    compatPlugin.configs["flat/recommended"],
);
