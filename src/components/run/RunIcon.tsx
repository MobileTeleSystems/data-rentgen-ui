import { ReactElement } from "react";
import { Stack, StackProps } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useTranslate } from "react-admin";

const RunIcon = (props: StackProps): ReactElement => {
    const translate = useTranslate();
    return (
        <Stack direction={"column"} {...props}>
            {<PlayArrow />}
            <span>{translate("resources.runs.name", { smart_count: 1 })}</span>
        </Stack>
    );
};
export default RunIcon;
