import {
    DataProvider,
    GetListParams,
    GetManyParams,
    GetOneParams,
    QueryFunctionContext,
} from "react-admin";
import BACKEND_SERVER_URL from "./url";
import { parseJSON, parseResponse } from "./utils";

type GetLineageParams = {
    id: number | string;
    filter?: any;
    meta?: any;
};

const defaultDataProvider: DataProvider = {
    // @ts-ignore
    create: () => Promise.resolve({ data: { id: 0 } }),
    // @ts-ignore
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({}),
    getList: (
        resource: string,
        params: GetListParams & QueryFunctionContext,
    ) => {
        const url = new URL(`${BACKEND_SERVER_URL}/v1/${resource}`);

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
                url.searchParams.append(field, params.filter[field]);
            }
        }

        const signal = params.signal;

        return new Promise((resolve, reject) => {
            return fetch(url.toString(), {
                method: "GET",
                signal,
            })
                .catch((error) => reject(error))
                .then(parseResponse)
                .then(({ status, body }) => {
                    const json = parseJSON(status, body, reject);
                    return resolve({
                        data: json.items,
                        total: json.meta.total_count,
                        pageInfo: {
                            hasNextPage: json.meta.has_next,
                            hasPreviousPage: json.meta.has_previous,
                        },
                    });
                });
        });
    },
    getMany: (
        resource: string,
        params: GetManyParams & QueryFunctionContext,
    ) => {
        const url = new URL(`${BACKEND_SERVER_URL}/v1/${resource}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        params.ids.forEach((id) => {
            url.searchParams.append(`${resourceOne}_id`, id.toString());
        });

        const signal = params.signal;

        return new Promise((resolve, reject) => {
            return fetch(url.toString(), {
                method: "GET",
                signal,
            })
                .then(parseResponse)
                .catch((error) => reject(error))
                .then(({ status, body }) => {
                    const json = parseJSON(status, body, reject);
                    return resolve({
                        data: json.items,
                    });
                });
        });
    },
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    getOne: (resource: string, params: GetOneParams & QueryFunctionContext) => {
        const url = new URL(`${BACKEND_SERVER_URL}/v1/${resource}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        url.searchParams.append(`${resourceOne}_id`, params.id.toString());

        const signal = params.signal;

        return new Promise((resolve, reject) => {
            return fetch(url.toString(), {
                method: "GET",
                signal,
            })
                .then(parseResponse)
                .catch((error) => reject(error))
                .then(({ status, body }) => {
                    const json = parseJSON(status, body, reject);
                    if (json.items.length === 0) {
                        return reject(new Error("Not found"));
                    }
                    return resolve({ data: json.items[0] });
                });
        });
    },
    getLineage: (
        resource: string,
        params: GetLineageParams & QueryFunctionContext,
    ) => {
        const url = new URL(`${BACKEND_SERVER_URL}/v1/${resource}/lineage`);
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

        const signal = params.signal;

        return new Promise((resolve, reject) => {
            return fetch(url.toString(), {
                method: "GET",
                signal,
            })
                .then(parseResponse)
                .catch((error) => reject(error))
                .then(({ status, body }) => {
                    const json = parseJSON(status, body, reject);
                    return resolve(json);
                });
        });
    },
    // @ts-ignore
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({}),
};

export default defaultDataProvider;
