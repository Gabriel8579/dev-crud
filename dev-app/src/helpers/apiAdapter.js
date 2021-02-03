import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import config from "../config.json";

const apiUrl = config.api_url;
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const query = {
            page: page - 1,
            limit: perPage,
            ...params.filter,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: json.total,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        return null;
    },

    getManyReference: (resource, params) => {
        return null;
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        return null;
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        return null;
    },
};
