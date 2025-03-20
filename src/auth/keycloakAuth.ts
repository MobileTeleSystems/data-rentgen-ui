import { AuthProvider } from "react-admin";
import { parseResponse, getURL } from "@/dataProvider/utils";
import { HttpError } from "react-admin";

const keycloakAuthProvider: AuthProvider = {
    login: () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        };
        // @ts-expect-error requestOptions
        return fetch(getURL("/v1/users/me"), requestOptions)
            .then(parseResponse)
            .then(({ status, body }) => {
                const json = JSON.parse(body);
                if (status === 401 && json.error.code === "auth_redirect") {
                    // Redirect to Keycloak login page
                    window.location.href = json.error.details;
                }
                if (status >= 200 && status < 300) {
                    localStorage.setItem("username", json.name);
                    // Using direct window.location.href cause {redirectTo: '/'} doesn't work.
                    window.location.href = "/";
                }
            });
    },
    logout: () => {
        // TODO Change this method after adding /logout endpoint on backend
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
        if (error.body.error.code === "auth_redirect") {
            // Redirect to Keycloak login page
            window.location.href = error.body.error.details;
        }
        throw error;
    },
    getIdentity: () => {
        const user = localStorage.getItem("username");
        if (!user) {
            return Promise.reject();
        }
        return Promise.resolve({
            id: "user",
            fullName: user,
            // TODO: add avatar example
            avatar: "./avatar.svg",
        });
    },
    handleCallback: () => {
        const query = window.location.search;
        const url = getURL("/v1/auth/callback" + query);
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        };
        // @ts-expect-error requestOptions
        return fetch(url.toString(), requestOptions).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                // Call login method to make a /user/me request and get username
                return keycloakAuthProvider.login({});
            }
            if (response.status < 200 || response.status >= 300) {
                throw new HttpError(
                    response.statusText,
                    response.status,
                    response.body,
                );
            }
        });
    },
};

export { keycloakAuthProvider };
