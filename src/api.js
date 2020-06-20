//import Vue from 'vue';
import axios from "axios";
const firebase = require("@/firebaseConfig.js");

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
        let idToken = await firebase.auth.currentUser
            .getIdToken( /* forceRefresh */ true)

        .catch(function(error) {
            console.log(error);

            // Handle error
        });
        return this.execute("post", "/admin/user/login", { id_token: idToken });
    },
};