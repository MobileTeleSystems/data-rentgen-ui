import { AuthProvider } from "react-admin";

import { getURL } from "@/dataProvider/utils";

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        // @ts-expect-error requestOptions
        return fetch(getURL("/v1/auth/token"), requestOptions)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((json) => json.access_token)
            .then((token) => {
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
            })
            .catch((e) => {
                console.error(e);
            });
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkError(error) {
        const status = error.status;
        if (status === 401) {
            localStorage.removeItem("token");
            throw new Error(error.statusText);
        }
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(),
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

export default authProvider;
