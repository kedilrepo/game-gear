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
    getData(topic) {
        return this.execute("get", `/data/${topic}`);
    },
    async checkUser() {
        var idToken;

        if (
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

        console.log(idToken);
        let req = await this.execute("post", "/admin/user/login", {
            id_token: idToken,
        });

        if (req.status === 401) return false;
        else if (req.status === 202) return true;
        else return false;
    },
};