<template>
    <div class="d-lg-table">
    <div class="row">
    <div class="col-12 ma-2">
        Layout:
        <v-btn
            text
            class="ml-1"
            exact-active-class="active"
            @click="changeLayout('grid')"
            hover
        >
            <v-icon>mdi-grid</v-icon>
        </v-btn>
        <v-btn
            text
            class="ml-1 mr-1"
            hover
            exact-active-class="active"
            @click="changeLayout('list')"
        >
            <v-icon>fas fa-list</v-icon>
        </v-btn>
    </div>
    </div>
        <div class="row">
        <div
            v-if="gridType === 'grid'"
            class="col-12 text-center">

        <apartment
            v-for="(apartment, index) in getStoreApartments"
            :key="apartment.id"
            :apartment="apartment"
            :index="index"
            :isCard="isCard"
            :forceStateEnable="false"
            style="text-align: left"
            />
        </div>
        <div
            class="col-12 text-center"
            v-else
        >
            <list-table
                :getStoreApartments="getStoreApartments"
            ></list-table>
        </div>
    </div>
    </div>
</template>

<script>
import apartment from "../components/apartment"
import { mapGetters } from 'vuex'
import ListTable from "../components/listTable";
export default {
    name: "apartments",
    data () {
        return {
            isCard: true,
            emptyIcon: 'mdi-star-outline',
            fullIcon: 'mdi-star',
            halfIcon: 'mdi-star-half-full',
            gridType: 'grid', /* this should be stored in localstorage or cookie */

        }
    },
    computed: {
        ...mapGetters('apartments', ['getStoreApartments'])
    },
    components:{
        ListTable,
        apartment
    },
    methods: {
        changeLayout(type){
            if (type === 'grid') {
                this.gridType = 'grid'
                this.isCard = true
            } else {
                this.gridType = 'list'
                this.isCard = false
            }
        },
        addToBookinkgs (key, newStatus) {
            this.$store.dispatch('apartments/changeBookingStatus', {id: key, newStatus: newStatus})
        }
    }
}
</script>
