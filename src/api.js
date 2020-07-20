//import Vue from 'vue';
import axios from "axios";
const firebase = require("@/firebaseConfig.js");
import store from "@/store";

const client = axios.create({
    //baseURL: "https://api.game-gear.kedil.de",
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
        return await this.execute("post", `/data/`, { pageName: topic });
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
        return await this.execute("post", "/admin/manage/pages/delete", {
            pageID: pageID,
        });
    },
    async editPageName(pageID, newPageName) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/manage/pages/edit", {
            pageID: pageID,
            newPageName: newPageName,
        });
    },
    async getStructures(pageName) {
        await this.setAuthHeader();
        let res = await this.execute("post", "/admin/manage/structures", {
            pageName: pageName,
        });
        console.log(res);

        return res;
    },
    async updateStructure(structure) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/manage/structures/edit", {
            structureId: structure.structureId,
            content: structure.content,
        });
    },
    async createStructure(page, position, content) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/manage/insert", {
            page: page,
            position: position,
            content: content,
        });
    },
    async deleteStructure(structureId) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/manage/delete", {
            structure_id: structureId,
        });
    },
    async addUser(userId) {
        await this.setAuthHeader();
        return await this.execute("put", "/admin/user/manage", {
            user_id: userId,
        });
    },
    async removeUser(userId) {
        await this.setAuthHeader();
        return await this.execute("post", "/admin/user/manage", {
            user_id: userId,
        });
    },
    async getUsers() {
        await this.setAuthHeader();
        return await this.execute("get", "/admin/user/manage");
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