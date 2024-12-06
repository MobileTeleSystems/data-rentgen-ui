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
import { mainLightTheme, mainDarkTheme } from "@/themes/main";
import { Login } from "@/components/login";
import {
    LocationRaList,
    LocationRaShow,
    LocationRaRepr,
    LocationRaEdit,
} from "@/components/location";
import {
    DatasetRaList,
    DatasetRaRepr,
    DatasetRaShow,
} from "@/components/dataset";
import { JobRaList, JobRaShow, JobRaRepr } from "@/components/job";
import { RunRaList, RunRaShow } from "@/components/run";
import { OperationRaShow } from "@/components/operation";
import { PlayArrow, Public, Settings } from "@mui/icons-material";
import { DatasetIcon } from "@/components/icons";

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
                requireAuth
            >
                <Resource
                    name="locations"
                    icon={Public}
                    list={LocationRaList}
                    show={LocationRaShow}
                    edit={LocationRaEdit}
                    recordRepresentation={<LocationRaRepr />}
                />
                <Resource
                    name="datasets"
                    icon={DatasetIcon}
                    list={DatasetRaList}
                    show={DatasetRaShow}
                    recordRepresentation={<DatasetRaRepr />}
                />
                <Resource
                    name="jobs"
                    icon={Settings}
                    list={JobRaList}
                    show={JobRaShow}
                    recordRepresentation={<JobRaRepr />}
                />
                <Resource
                    name="runs"
                    icon={PlayArrow}
                    list={RunRaList}
                    show={RunRaShow}
                />
                <Resource name="operations" show={OperationRaShow} />
            </Admin>
        </StoreContextProvider>
    );
};

export default App;
