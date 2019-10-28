import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
/*eslint linebreak-style: ['error', 'windows']*/
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    getInfo_status: '',
    formStatus: false,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
    getInfoStatus(state, status) {
      state.getInfo_status = status;
    },
    form_submitted(state) {
      state.formStatus = true;
    },

  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
            url: 'http://localhost:8081/user/login',
            data: user,
            method: 'POST'
          })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            console.log(token);
            commit('auth_success', token);
            resolve(resp.data.type);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    fullsignup({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
            url: 'http://localhost:8081/user/fullsignup',
            data: user,
            method: 'POST'
          })
          .then(resp => {
            const token = resp.data.token;
            console.log(token)
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token);
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    orgSignUp({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
            url: 'http://localhost:8081/user/orgsignup',
            data: user,
            method: 'POST'
          })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token);
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    logout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      })
    },
    identifyUser() {
      return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:8081/user/userType',
            data: {
              credential: this.getters.token
            },
            method: 'POST'
          })
          .then(resp => {
            console.log(this.getters.token);
            var userType = resp.data.userType;
            if (userType == 'Regular user') {
              console.log(userType);
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err)
          });
      })
    },
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:8081/user/userInfo',
            data: {
              data: this.getters.token
            },
            method: 'POST'
          })
          .then(resp => {
            console.log(resp.data);
            commit('getInfoStatus', 'success');
            resolve(resp.data);
          })
          .catch(err => {
            commit('getInfoStatus', 'error');
            reject(err);
          });
      })
    },
    submit({commit}) {
      commit("form_submitted")
    }

  },
  getters: {
    isLoggedIn: state => !!state.token,
    token: state => state.token,
    authStatus: state => state.status,
    getInfoStatus: state => state.getInfo_status,
    isSumbitted: state => state.formStatus,
  },

});
