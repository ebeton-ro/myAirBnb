<template>
    <div>
        <div class="col-12">
            <v-card>
                <v-card-title>My bookings</v-card-title>
            </v-card>
            <v-card class="mt-lg-3 mb-auto" v-if="!getStoreBookings.length">
                <v-card-title class="red--text"><v-icon color="red">mdi-alert</v-icon> No booking added. Reserve some!</v-card-title>
            </v-card>
        </div>
        <div class="col-12 text-left">
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
    }
}
</script>

<style scoped>

</style>
