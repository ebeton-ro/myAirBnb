<template>
    <div>
        <div class="col-12 text-center">
            <v-card>
                <v-card-title class="col-10">My bookings</v-card-title>
                <v-card-actions v-if="getStoreBookings.length" class="text-center">
                <v-btn
                    class="ma-auto"
                    @click="resetAllBookings"
                >
                    Reset
                </v-btn>
                </v-card-actions>
            </v-card>
            <v-card class="mt-lg-3 mb-auto" v-if="!getStoreBookings.length">
                <v-card-title class="red--text"><v-icon color="red">mdi-alert</v-icon> No booking added. Reserve some!</v-card-title>
            </v-card>
        </div>
        <div class="col-12 text-center no-gutters pa-0">
        <div class="col-11 col-lg-11 text-left ma-auto no-gutters pa-0">
            <apartment
                v-for="(apartment, index) in getStoreBookings"
                :key="apartment.id"
                :apartment="apartment"
                :index="index"
                :isCard="true"
                :isBooked="true"
                style="text-align: left"
                />
        </div>
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
    methods: {
        resetAllBookings () {
            this.$store.dispatch('user/resetAllBookings')
        }
    }
}
</script>

<style scoped>

</style>
