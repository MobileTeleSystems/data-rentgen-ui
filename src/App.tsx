import polyglotI18nProvider from "ra-i18n-polyglot";
import {
    Admin,
    localStorageStore,
    StoreContextProvider,
    Resource,
} from "react-admin";

import authProvider from "./authProvider";
import defaultDataProvider from "./dataProvider";
import englishMessages from "./i18n/en";
import { Login } from "./components";
import { Layout } from "./layout";
import { mainLightTheme, mainDarkTheme } from "./themes/main";

const store = localStorageStore(undefined, "DataRentgen");

const i18nProvider = polyglotI18nProvider((locale) => englishMessages, "en", [
    { locale: "en", name: "English" },
]);

const App = () => {
    return (
        <StoreContextProvider value={store}>
            <Admin
                title=""
                dataProvider={defaultDataProvider}
                store={store}
                authProvider={authProvider}
                loginPage={Login}
                layout={Layout}
                i18nProvider={i18nProvider}
                disableTelemetry
                lightTheme={mainLightTheme}
                darkTheme={mainDarkTheme}
                defaultTheme="light"
            >
                <Resource name="locations" />
                <Resource name="datasets" />
                <Resource name="jobs" />
                <Resource name="runs" />
            </Admin>
        </StoreContextProvider>
    );
};

export default App;
