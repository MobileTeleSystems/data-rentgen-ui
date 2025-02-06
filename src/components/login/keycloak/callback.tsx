import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import { getURL } from "@/dataProvider/utils";
import { HttpError } from "react-admin";

const KeycloakAuthCallback = () => {
    const params = useLocation();
    const url = getURL("/v1/auth/callback" + params["search"]);
    const requestOptions = {
        method: "GET",
        redirect: "follow",
        credentials: "include",
    };
    useEffect(() => {
        // @ts-expect-error requestOptions
        fetch(url.toString(), requestOptions)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new HttpError(
                        response.statusText,
                        response.status,
                        response.body,
                    );
                }
                window.location.href = "/";
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    return <CircularProgress size={25} thickness={2} />;
};

export default KeycloakAuthCallback;
