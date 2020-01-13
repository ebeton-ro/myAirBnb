<template>
    <div>
        <v-card>
            <v-card-title>My bookings</v-card-title>
        </v-card>
        <div class="col-11">
            <apartment
                v-for="(apartment, index) in getStoreBookings"
                :key="apartment.id"
                :apartment="apartment"
                :index="index"
                :isCard="true"
                :forceStateEnable="true"
                style="text-align: left"
                />
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Apartment from "../components/apartment";

export default {
    name: "bookings",
    components: {Apartment},
    computed: {
        ...mapGetters('user', ['getStoreBookings']) /* In case of an user account we need to know the user id or another unique identification */
    },
    beforeMount() {
        // eslint-disable-next-line no-console
        console.log(this.getStoreBookings)
    }
}
</script>

<style scoped>

</style>
