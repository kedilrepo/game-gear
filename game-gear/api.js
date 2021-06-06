// import Vue from 'vue';
import axios, { post } from 'axios';
// import store from '@/store';
// const firebase = require('@/firebaseConfig.js');

const url = 'https://api.game-gear.kedil.de';
// const url = "http://192.168.19.66:8082";

const client = axios.create({
  baseURL: url,
  json: true
});

export default {
  async execute (method, resource, data) {
    return await new Promise((resolve, reject) => {
      client({
        method,
        url: resource,
        data,
        validateStatus: () => true
      })
        .then((req) => {
          resolve(req);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          resolve([]);
        });
    });
  },
  async getData (topic) {
    return await this.execute('post', '/data/', { pageName: topic });
  },
  async getBlogs () {
    return await this.execute('get', '/blog/');
  },
  async getBlog (url) {
    return await this.execute('get', `/blog/${url}`);
  },
  async getBlogInfo (url) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog', { blogName: url });
  },
  async getPages () {
    await this.setAuthHeader();
    return await this.execute('get', '/admin/manage/pages');
  },
  async createPage (pageName) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/pages', {
      pageName
    });
  },
  async createBlog (blogName) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/blogs', {
      blogName
    });
  },
  async deletePage (pageID) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/pages/delete', {
      pageID
    });
  },
  async deleteBlog (blogID) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/blogs/delete', {
      blogID
    });
  },
  async editPageName (pageID, newPageName) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/pages/edit', {
      pageID,
      newPageName
    });
  },
  async editBlogName (blogID, newBlogName) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/blogs/edit', {
      blogID,
      newBlogName
    });
  },
  async getStructures (pageName) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/structures', {
      pageName
    });
  },
  async getBlogStructures (blogName) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/structures', {
      blogName
    });
  },
  async updateStructure (structure) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/structures/edit', {
      structureId: structure.structureId,
      content: structure.content
    });
  },
  async updateBlogStructure (structure) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/structures/edit', {
      structureId: structure.structureId,
      content: structure.content
    });
  },
  async createStructure (page, position, content) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/insert', {
      page,
      position,
      content
    });
  },
  async createBlogStructure (blog, position, content) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/insert', {
      blog,
      position,
      content
    });
  },
  async deleteStructure (structureId) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/delete', {
      structure_id: structureId
    });
  },
  async deleteBlogStructure (structureId) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/manage/blog/delete', {
      structure_id: structureId
    });
  },
  async addUser (userId) {
    await this.setAuthHeader();
    return await this.execute('put', '/admin/user/manage', {
      user_id: userId
    });
  },
  async removeUser (userId) {
    await this.setAuthHeader();
    return await this.execute('post', '/admin/user/manage', {
      user_id: userId
    });
  },
  async getUsers () {
    await this.setAuthHeader();
    return await this.execute('get', '/admin/user/manage');
  },
  async checkUser () {
    const idToken = await this.getIdToken();

    // console.log(idToken);
    const req = await this.execute('post', '/admin/user/login', {
      id_token: idToken
    });

    return req.status === 202;
  },
  async uploadFile (formData) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await this.getIdToken())
      }
    };

    return post(url + '/admin/manage/upload', formData, config);
  },
  async getFiles () {
    await this.setAuthHeader();
    return await this.execute('get', '/admin/manage/files');
  },
  async getIdToken () {
    let idToken;
    console.log('Store', "''");
    if (
      this.$nuxt.$store.getters.user.data === null ||
      this.$nuxt.$store.getters.user.data.idToken === null ||
      this.$nuxt.$store.getters.user.data.idToken === undefined
    ) {
      idToken = await this.$fire.auth.currentUser
        .getIdToken(/* forceRefresh */ true)

        .catch(function (error) {
          console.log(error);
          return false;
        });
    } else {
      idToken = this.$nuxt.$store.getters.user.data.idToken;
    }
    return idToken;
  },
  async setAuthHeader () {
    client.defaults.headers.Authorization =
      'Bearer ' + (await this.getIdToken());
  }
};
