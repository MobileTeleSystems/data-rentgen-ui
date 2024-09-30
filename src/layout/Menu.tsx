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
                to="/locations"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.locations.name`, {
                    smart_count: 2,
                })}
                leftIcon={<WarehouseIcon />}
                dense={dense}
            />
            <MenuItemLink
                to="/datasets"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.datasets.name`, {
                    smart_count: 2,
                })}
                leftIcon={<DatasetIcon />}
                dense={dense}
            />
            <MenuItemLink
                to="/jobs"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.jobs.name`, {
                    smart_count: 2,
                })}
                leftIcon={<TaskIcon />}
                dense={dense}
            />
            <MenuItemLink
                to="/runs"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.runs.name`, {
                    smart_count: 2,
                })}
                leftIcon={<PlayArrowIcon />}
                dense={dense}
            />
        </Box>
    );
};

export default Menu;
