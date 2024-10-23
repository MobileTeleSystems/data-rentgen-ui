import {
    DataProvider,
    GetListParams,
    GetManyParams,
    GetOneParams,
    QueryFunctionContext,
} from "react-admin";
import BACKEND_SERVER_URL from "./url";
import { parseJSON, parseResponse } from "./utils";

const defaultDataProvider: DataProvider = {
    // @ts-ignore
    create: () => Promise.resolve({ data: { id: 0 } }),
    // @ts-ignore
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({}),
    getList: (
        resource: string,
        params: GetListParams & QueryFunctionContext,
        signal?: AbortSignal,
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
        signal?: AbortSignal,
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
    getOne: (
        resource: string,
        params: GetOneParams & QueryFunctionContext,
        signal?: AbortSignal,
    ) => {
        const url = new URL(`${BACKEND_SERVER_URL}/v1/${resource}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        url.searchParams.append(`${resourceOne}_id`, params.id.toString());

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
    // @ts-ignore
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({}),
};

export default defaultDataProvider;
