import Vue from 'vue'
import Vuex from 'vuex'
import { get } from "@/store/request";

Vue.use(Vuex)

const state = {
	baseUrl: 'http://open.rixiazai.com',
	userInfo: {
		aptitude: null,
		email: '',
		id: null,
		name: '',
		nature: null,
		phone: null,
		subscription: '',
		had_aptitude: null
	}
};

const mutations = {

	getUserInfoData(state, data) {
		state.userInfo = data
	}
};

const getters = {
};

const actions = {
	async getUserInfo({ commit, state, req }) {
		const rawData = await get('home/user/checkLogin');
		if (rawData.code === 100) {
			commit("getUserInfoData", rawData.data)
		} else if(rawData.code === 405) {;
            console.log(rawData.msg)
		}
	}
};

const store = () => new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})

export default store