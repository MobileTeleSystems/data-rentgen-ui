import { HttpError } from "react-admin";

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseResponse = (response: any): Promise<any> =>
    response.text().then((text: string) => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
    }));

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseJSON = (status: number, body: string): any => {
    if (status == 204) {
        return {};
    }

    const json = JSON.parse(body);

    if (status < 200 || status >= 400) {
        throw new HttpError(json?.error?.message ?? body, status, json);
    }
    return json;
};

const API_URL = "http://localhost:8000";

const getURL = (path: string): URL => {
    // if API_URL is relative, resolve it to absolute URL using current window location
    const baseUrl = window.location.toString();
    return new URL(API_URL + path, baseUrl);
};

const addTokenHeader = (headers: Headers): Headers => {
    const token = localStorage.getItem("token");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export { parseResponse, parseJSON, getURL, addTokenHeader };
