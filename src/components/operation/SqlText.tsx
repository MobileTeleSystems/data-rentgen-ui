import { useTheme } from "@mui/material";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    stackoverflowLight,
    hybrid,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sqlMore from "react-syntax-highlighter/dist/esm/languages/hljs/sql_more";

SyntaxHighlighter.registerLanguage("sql", sqlMore);

const SqlText = ({ query }: { query: string | null }) => {
    const mode = useTheme().palette.mode;
    if (!query) {
        return null;
    }
    const style = mode == "light" ? stackoverflowLight : hybrid;
    return (
        <SyntaxHighlighter language="sql" style={style}>
            {query}
        </SyntaxHighlighter>
    );
};

export default SqlText;
