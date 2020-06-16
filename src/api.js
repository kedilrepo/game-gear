//import Vue from 'vue';
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8082/",
    json: true,
});

export default {
    async execute(method, resource, data) {
        return client({
                method,
                url: resource,
                data,
            })
            .then((req) => {
                return req.data;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    },
    getData(topic) {
        return this.execute("get", `/${topic}`);
    },
};