import { Menu } from "react-admin";

const AppMenu = () => {
    return (
        <>
            <Menu>
                <Menu.ResourceItem name="datasets" />
                <Menu.ResourceItem name="jobs" />
                <Menu.ResourceItem name="runs" />
                <Menu.ResourceItem name="locations" />
            </Menu>
        </>
    );
};

export default AppMenu;
