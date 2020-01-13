export function setDataApartments (state, payload) {
    state.apartments = payload
}

export function setApartmentStatus(state, payload) {
    if (state && state.apartments && state.apartments[payload.index]) {
        state.apartments[payload.index].available = payload.newStatus
    }
}
