import { HttpError } from "react-admin";

const parseResponse = (response: any) =>
    response.text().then((text: string) => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
    }));

const parseJSON = (
    status: number,
    body: string,
    reject: (error: any) => void,
) => {
    let json;
    try {
        json = JSON.parse(body);
    } catch (e) {
        return reject(e);
    }
    if (status < 200 || status >= 400) {
        return reject(
            new HttpError((json && json.message) || body, status, json),
        );
    }
    return json;
};

export { parseResponse, parseJSON };
