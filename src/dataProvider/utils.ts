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

export { parseResponse, parseJSON };
