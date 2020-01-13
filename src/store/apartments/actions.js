import axios from 'axios'

export function dataApartments ({ commit }) {
    axios.get('https://jsonstorage.net/api/items/7fcd8f43-5a9c-4718-bd42-b9acadd64162').then(response => {
        if (response && response.data)
        commit('setDataApartments', response.data)
    })
}

export function changeBookingStatus({ commit, state }, payload) {
    if (state && state.apartments && state.apartments.length && payload && payload.id) {
        let temp = state.apartments.find( x => x.id === payload.id)
        if (temp) {
            let indexTemp = state.apartments.indexOf(temp)
            commit(state.apartments[indexTemp])
        }
    }
}