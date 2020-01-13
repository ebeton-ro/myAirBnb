export function updateMyBookings (state, payload) {
    if (state && state.mybookings && state.mybookings.length) {
        let indexTemp = state.mybookings.findIndex(x => x.id === payload.apartment.id)
        if (indexTemp === -1) { /* We do not have it we push it */
            state.mybookings.push(payload.apartment)
        } else { /* We have it we splice it */
            state.mybookings.splice(indexTemp, 1)
        }
    } else {
        state.mybookings.push(payload.apartment)
    }
}
