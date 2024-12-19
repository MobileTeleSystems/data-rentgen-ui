import { AuthProvider } from "react-admin";
import { parseResponse, getURL } from "@/dataProvider/utils";

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
                    window.location.href = json.error.details;
                }
                if (status >= 200 && status < 300) {
                    localStorage.setItem("username", json.name);
                    window.location.href = "/";
                }
            })
            .catch((e) => {
                console.error(e);
            });
    },
    logout: () => {
        // TODO Change this method after adding /logout endpoint on backend
        localStorage.removeItem("username");
        window.location.href = "/#/login";
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
        if (error.body.error.code === "auth_redirect") {
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
};

export { keycloakAuthProvider };
