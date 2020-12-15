//import Vue from 'vue';
import axios from "axios";
import store from "@/store";

const firebase = require("@/firebaseConfig.js");

const client = axios.create({
  baseURL: "https://api.game-gear.kedil.de",
  // baseURL: "http://192.168.19.66:8082",
  json: true
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      validateStatus: () => true
    })
      .then(req => {
        return req;
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  },
  async getData(topic) {
    return await this.execute("post", `/data/`, { pageName: topic });
  },
  async getBlogs() {
    return await this.execute("get", `/blog/`);
  },
  async getBlog(url) {
    return await this.execute("get", `/blog/${url}`);
  },
  async getBlogInfo(url) {
    await this.setAuthHeader();
    return await this.execute("post", `/admin/manage/blog`, { blogName: url });
  },
  async getPages() {
    await this.setAuthHeader();
    return await this.execute("get", "/admin/manage/pages");
  },
  async createPage(pageName) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/pages", {
      pageName: pageName
    });
  },
  async createBlog(blogName) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/blogs", {
      blogName: blogName
    });
  },
  async deletePage(pageID) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/pages/delete", {
      pageID: pageID
    });
  },
  async deleteBlog(blogID) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/blogs/delete", {
      blogID: blogID
    });
  },
  async editPageName(pageID, newPageName) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/pages/edit", {
      pageID: pageID,
      newPageName: newPageName
    });
  },
  async editBlogName(blogID, newBlogName) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/blogs/edit", {
      blogID: blogID,
      newBlogName: newBlogName
    });
  },
  async getStructures(pageName) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/structures", {
      pageName: pageName
    });
  },
  async getBlogStructures(blogName) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/structures", {
      blogName: blogName
    });
  },
  async updateStructure(structure) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/structures/edit", {
      structureId: structure.structureId,
      content: structure.content
    });
  },
  async updateBlogStructure(structure) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/structures/edit", {
      structureId: structure.structureId,
      content: structure.content
    });
  },
  async createStructure(page, position, content) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/insert", {
      page: page,
      position: position,
      content: content
    });
  },
  async createBlogStructure(blog, position, content) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/insert", {
      blog: blog,
      position: position,
      content: content
    });
  },
  async deleteStructure(structureId) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/delete", {
      structure_id: structureId
    });
  },
  async deleteBlogStructure(structureId) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/manage/blog/delete", {
      structure_id: structureId
    });
  },
  async addUser(userId) {
    await this.setAuthHeader();
    return await this.execute("put", "/admin/user/manage", {
      user_id: userId
    });
  },
  async removeUser(userId) {
    await this.setAuthHeader();
    return await this.execute("post", "/admin/user/manage", {
      user_id: userId
    });
  },
  async getUsers() {
    await this.setAuthHeader();
    return await this.execute("get", "/admin/user/manage");
  },
  async checkUser() {
    let idToken = await this.getIdToken();

    // console.log(idToken);
    let req = await this.execute("post", "/admin/user/login", {
      id_token: idToken
    });

    return req.status === 202;
  },
  async getIdToken() {
    var idToken;

    if (
      store.getters.user.data === null ||
      store.getters.user.data.idToken === null ||
      store.getters.user.data.idToken === undefined
    ) {
      idToken = await firebase.auth.currentUser
        .getIdToken(/* forceRefresh */ true)

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
  }
};
