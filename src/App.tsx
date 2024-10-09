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
import { Layout } from "./layout";
import { mainLightTheme, mainDarkTheme } from "@themes/main";
import { Login } from "./components/login";
import { DatasetGrid, DatasetShow } from "./components/dataset";

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
                <Resource
                    name="datasets"
                    list={DatasetGrid}
                    show={DatasetShow}
                />
                <Resource name="jobs" />
                <Resource name="runs" />
            </Admin>
        </StoreContextProvider>
    );
};

export default App;
