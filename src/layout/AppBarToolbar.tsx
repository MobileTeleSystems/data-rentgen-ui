import {
    LoadingIndicator,
    LocalesMenuButton,
    ToggleThemeButton,
} from "react-admin";

export const AppBarToolbar = () => (
    <>
        <LocalesMenuButton />
        <ToggleThemeButton />
        <LoadingIndicator />
    </>
);
