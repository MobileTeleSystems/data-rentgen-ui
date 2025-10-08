import {
    CreateParams,
    DataProvider,
    DeleteParams,
    GetListParams,
    GetManyParams,
    GetOneParams,
    QueryFunctionContext,
    UpdateParams,
} from "react-admin";
import { parseJSON, parseResponse, getURL, addTokenHeader } from "./utils";

type GetLineageParams = {
    id: number | string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    filter?: any;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    meta?: any;
};

const camelCaseToKebabCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const camelCaseToSnakeCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

const defaultDataProvider: DataProvider = {
    deleteMany: () => Promise.resolve({}),
    updateMany: () => Promise.resolve({}),
    getList: (
        resource: string,
        params: GetListParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        if (params.pagination) {
            url.searchParams.append("page", params.pagination.page.toString());
            url.searchParams.append(
                "page_size",
                params.pagination.perPage.toString(),
            );
        }

        if (params.filter) {
            for (const field in params.filter) {
                const value = params.filter[field];
                if (Array.isArray(value)) {
                    value.forEach((v) => {
                        url.searchParams.append(field, v);
                    });
                    continue;
                }
                url.searchParams.append(field, params.filter[field]);
            }
        }

        let headers = new Headers();
        headers = addTokenHeader(headers);

        return fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => {
                const json = parseJSON(status, body);
                return {
                    data: json.items,
                    total: json.meta.total_count,
                    pageInfo: {
                        hasNextPage: json.meta.has_next,
                        hasPreviousPage: json.meta.has_previous,
                    },
                };
            });
    },
    getMany: (
        resource: string,
        params: GetManyParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        params.ids.forEach((id) => {
            url.searchParams.append(
                `${camelCaseToSnakeCase(resourceOne)}_id`,
                id.toString(),
            );
        });

        let headers = new Headers();
        headers = addTokenHeader(headers);

        return fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => {
                const json = parseJSON(status, body);
                return {
                    data: json.items,
                };
            });
    },
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    getOne: (resource: string, params: GetOneParams & QueryFunctionContext) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        url.searchParams.append(
            `${camelCaseToSnakeCase(resourceOne)}_id`,
            params.id.toString(),
        );

        let headers = new Headers();
        headers = addTokenHeader(headers);

        return fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => {
                const json = parseJSON(status, body);
                if (json.items.length === 0) {
                    throw new Error("Not found");
                }
                return { data: json.items[0] };
            });
    },
    getLineage: (
        resource: string,
        params: GetLineageParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}/lineage`);
        url.searchParams.append("start_node_id", params.id.toString());

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        for (const k in params.filter) {
            if (params.filter[k]) {
                const filter = JSON.stringify(params.filter[k]).replaceAll(
                    /(^")|("$)/g,
                    "",
                );
                url.searchParams.append(k, filter);
            }
        }

        let headers = new Headers();
        headers = addTokenHeader(headers);

        return fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => parseJSON(status, body));
    },
    getLocationTypes: (params: QueryFunctionContext) => {
        const url = getURL(`/v1/locations/types`);

        let headers = new Headers();
        headers = addTokenHeader(headers);

        return fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => parseJSON(status, body));
    },
    getJobTypes: (params: QueryFunctionContext) => {
        const url = getURL(`/v1/jobs/types`);

        let headers = new Headers();
        headers = addTokenHeader(headers);

        return fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => parseJSON(status, body));
    },
    create: (resource: string, params: CreateParams) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        let headers = new Headers();
        headers = addTokenHeader(headers);
        headers.set("Content-Type", "application/json");

        return fetch(url.toString(), {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => {
                return {
                    data: parseJSON(status, body),
                };
            });
    },
    update: (resource: string, params: UpdateParams) => {
        const url = getURL(
            `/v1/${camelCaseToKebabCase(resource)}/${params.id}`,
        );

        let headers = new Headers();
        headers = addTokenHeader(headers);
        headers.set("Content-Type", "application/json");

        return fetch(url.toString(), {
            method: "PATCH",
            body: JSON.stringify(params.data),
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => {
                return {
                    data: parseJSON(status, body),
                };
            });
    },
    delete: (resource: string, params: DeleteParams) => {
        const url = getURL(
            `/v1/${camelCaseToKebabCase(resource)}/${params.id}`,
        );

        let headers = new Headers();
        headers = addTokenHeader(headers);
        headers.set("Content-Type", "application/json");

        return fetch(url.toString(), {
            method: "DELETE",
            headers: headers,
            credentials: "include",
        })
            .then(parseResponse)
            .then(({ status, body }) => {
                return {
                    data: parseJSON(status, body),
                };
            });
    },
};

export default defaultDataProvider;
