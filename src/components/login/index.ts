import Login from "./Login";
import authProvider from "@/authProvider";
import { keycloakAuthProvider } from "@/auth/keycloakAuth";
import { keycloakLoginForm, KeycloakAuthCallback } from "./keycloak";

const AUTH_PROVIDER = "dummyAuthProvider";

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

export { getAuthProvider, KeycloakAuthCallback };
