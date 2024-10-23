import { ReactElement } from "react";
import { SelectColumnsButton, TopToolbar } from "react-admin";

import { Box } from "@mui/material";

const ListActions = ({ children }: { children?: ReactElement }) => {
    return (
        <>
            {children && <Box width="100%">{children}</Box>}
            <TopToolbar>
                <SelectColumnsButton />
            </TopToolbar>
        </>
    );
};

export default ListActions;
