//import Vue from 'vue';
import axios from "axios";
const firebase = require("@/firebaseConfig.js");
import store from "@/store";

const client = axios.create({
    baseURL: "http://localhost:8082",
    json: true,
});

export default {
    async execute(method, resource, data) {
        return client({
                method,
                url: resource,
                data,
                validateStatus: () => true,
            })
            .then((req) => {
                return req;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    },
    async getData(topic) {
        return await this.execute("get", `/data/${topic}`);
    },
    async getPages() {
        await this.setAuthHeader();
        return await this.execute("get", "/admin/manage/pages");
    },
    async createPage(pageName) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/manage/pages", {
            pageName: pageName,
        });
    },
    async deletePage(pageID) {
        await this.setAuthHeader();
        return await this.execute("delete", "/admin/manage/pages", {
            pageID: pageID,
        });
    },
    async getStructures(pageName) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/manage/structures", {
            pageName: pageName,
        });
    },
    async checkUser() {
        let idToken = await this.getIdToken();

        console.log(idToken);
        let req = await this.execute("post", "/admin/user/login", {
            id_token: idToken,
        });

        if (req.status === 401) return false;
        else if (req.status === 202) return true;
        else return false;
    },
    async getIdToken() {
        var idToken;

        if (
            store.getters.user.data === null ||
            store.getters.user.data.idToken === null ||
            store.getters.user.data.idToken === undefined
        ) {
            idToken = await firebase.auth.currentUser
                .getIdToken( /* forceRefresh */ true)

            .catch(function(error) {
                console.log(error);
                return false;
            });
        } else {
            idToken = store.getters.user.data.idToken;
        }
        return idToken;
    },
    async setAuthHeader() {
        client.defaults.headers["Authorization"] =
            "Bearer " + (await this.getIdToken());
    },
};