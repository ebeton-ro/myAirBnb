import Vue from 'vue'
import Vuex from 'vuex'
import apartments from './apartments'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        apartments,
        user
    }
})
