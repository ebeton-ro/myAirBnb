export function resetAllBookings ( store ) {
    for (let item in store.state.mybookings) {
        let indexTemp = store.rootState.apartments.apartments.findIndex(x => x.id === store.state.mybookings[item].id)
        store.commit('apartments/setApartmentStatus', { index: indexTemp, newStatus: !store.rootState.apartments.apartments[indexTemp].available}, { root: true })
    }

    store.commit('resetBookings')
}
