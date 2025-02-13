import jsPlugin from "@eslint/js";
import tsPlugin from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";

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
);
