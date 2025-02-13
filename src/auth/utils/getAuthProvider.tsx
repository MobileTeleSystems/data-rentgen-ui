import authProvider from "../dummyAuth";
import { keycloakAuthProvider } from "../keycloakAuth";
import { Login, keycloakLoginForm } from "@/components/login";

// replaced by docker image entrypoint
/* eslint-disable prefer-const */
let AUTH_PROVIDER = "dummyAuthProvider";

const getAuthProvider = () => {
    switch (AUTH_PROVIDER) {
        case "keycloakAuthProvider":
            return {
                provider: keycloakAuthProvider,
                loginPage: keycloakLoginForm,
            };
        default:
            return {
                provider: authProvider,
                loginPage: Login,
            };
    }
};

export { getAuthProvider };
