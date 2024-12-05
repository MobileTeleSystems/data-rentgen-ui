import { HttpError } from "react-admin";

const parseResponse = (response: any) =>
    response.text().then((text: string) => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
    }));

const parseJSON = (status: number, body: string) => {
    let json = JSON.parse(body);
    if (status < 200 || status >= 400) {
        throw new HttpError((json && json.message) || body, status, json);
    }
    return json;
};

const API_URL = "http://localhost:8000";

const getURL = (path: string) => {
    // if API_URL is relative, resolve it to absolute URL using current window location
    const baseUrl = window.location.toString();
    return new URL(API_URL + path, baseUrl);
};

export { parseResponse, parseJSON, getURL };
