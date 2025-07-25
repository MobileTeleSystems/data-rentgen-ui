import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { forwardRef } from "react";
import KeyIcon from "@mui/icons-material/Key";
import {
    Link,
    Logout,
    useCreatePath,
    useTranslate,
    useUserMenu,
} from "react-admin";

import { UserMenu as RAUserMenu } from "react-admin";

const PersonalTokensMenuItem = forwardRef<HTMLAnchorElement>((props, ref) => {
    const userMenuContext = useUserMenu();
    const translate = useTranslate();
    const createPath = useCreatePath();
    if (!userMenuContext) {
        throw new Error(
            "<SettingsMenuItem> should be used inside a <UserMenu>",
        );
    }

    const path = createPath({
        resource: "personalTokens",
        type: "list",
    });
    const { onClose } = userMenuContext;
    return (
        <MenuItem
            onClick={onClose}
            ref={ref}
            component={Link}
            to={path}
            {...props}
        >
            <ListItemIcon>
                <KeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
                {translate("resources.personalTokens.name", {
                    smart_count: 10,
                })}
            </ListItemText>
        </MenuItem>
    );
});
PersonalTokensMenuItem.displayName = "PersonalTokensMenuItem";

const UserMenu = () => {
    return (
        <RAUserMenu>
            <PersonalTokensMenuItem />
            <Logout />
        </RAUserMenu>
    );
};

export default UserMenu;
