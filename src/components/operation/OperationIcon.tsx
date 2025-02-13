import { ReactElement } from "react";
import { Stack, StackProps } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useTranslate } from "react-admin";

const OperationIcon = (props: StackProps): ReactElement => {
    const translate = useTranslate();
    return (
        <Stack direction={"column"} {...props}>
            {<HandymanIcon />}
            <span>
                {translate("resources.operations.name", { smart_count: 1 })}
            </span>
        </Stack>
    );
};
export default OperationIcon;
