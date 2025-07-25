import { AppBar, TitlePortal } from "react-admin";
import { Box, useMediaQuery, Theme } from "@mui/material";

import { AppBarToolbar } from "./AppBarToolbar";
import UserMenu from "./UserMenu";

const CustomAppBar = () => {
    const isLargeEnough = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.up("sm"),
    );
    return (
        <AppBar
            color="secondary"
            toolbar={<AppBarToolbar />}
            userMenu={<UserMenu />}
            alwaysOn
        >
            <TitlePortal />
            {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
        </AppBar>
    );
};

export default CustomAppBar;
