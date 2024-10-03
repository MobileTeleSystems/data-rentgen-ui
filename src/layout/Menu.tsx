import { Box } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DatasetIcon from "@mui/icons-material/Dataset";
import WarehouseIcon from "@mui/icons-material/Warehouse";

import {
    MenuProps,
    useSidebarState,
    useTranslate,
    MenuItemLink,
} from "react-admin";

const Menu = ({ dense = false }: MenuProps) => {
    const [open] = useSidebarState();
    const translate = useTranslate();

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
                transition: (theme) =>
                    theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            <MenuItemLink
                to="/datasets"
                state={{ _scrollToTop: true }}
                primaryText={translate(`pos.menu.datasets`)}
                leftIcon={<DatasetIcon />}
                dense={dense}
            />
            <MenuItemLink
                to="/jobs"
                state={{ _scrollToTop: true }}
                primaryText={translate(`pos.menu.jobs`)}
                leftIcon={<TaskIcon />}
                dense={dense}
            />
            <MenuItemLink
                to="/runs"
                state={{ _scrollToTop: true }}
                primaryText={translate(`pos.menu.runs`)}
                leftIcon={<PlayArrowIcon />}
                dense={dense}
            />
        </Box>
    );
};

export default Menu;
