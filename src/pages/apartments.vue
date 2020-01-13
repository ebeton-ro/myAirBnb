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
            <v-data-table
                class="col-11 ma-auto"
                :headers="headerTable"
                item-key="id"
                sort-by="rating"
                sort-desc
                :items="getStoreApartments"
                :search="search"
            >
            <template v-slot:top>
                <v-spacer></v-spacer>
                <v-text-field
                        class="d-inline-block pull-right mx-4"
                        v-model="search"
                        append-icon="fas fa-search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </template>
            <template v-slot:body="{ items }" >
                <tr  v-for="item in items" :key="item.name"  @dblclick="addToBookinkgs(item.id)" class="customTableRow">
                <td>
                    <v-img :src="item.image.src" :alt="item.image.alt" width="64" class="ma-1"/>
                </td>
                <td>
                    {{item.country}}
                </td>
                <td>
                    {{item.city}}
                </td>
                <td>
                    {{item.description}}
                </td>
                <td>
                    <v-rating
                        v-model="item.rating"
                        :length="length"
                        :empty-icon="emptyIcon"
                        :full-icon="fullIcon"
                        :half-icon="halfIcon"
                        class="coll-12"
                        dense
                        x-small
                    ></v-rating>
                </td>
                <td>
                    {{item.numberOfGuests}}
                </td>
                <td>
                    {{item.numberBedrooms}}
                </td>
                <td>
                    {{item.owner.firstName}} {{item.owner.lastName}}
                </td>
            </tr>
            </template>
            </v-data-table>
        </div>
    </div>
    </div>
</template>

<script>
import apartment from "../components/apartment"
import { mapGetters } from 'vuex'
export default {
    name: "apartments",
    data () {
        return {
            isCard: true,
            search: '',
            linkText: 'Show more',
            emptyIcon: 'mdi-star-outline',
            fullIcon: 'mdi-star',
            halfIcon: 'mdi-star-half-full',
            length: 10,
            gridType: 'grid', /* this should be stored in localstorage or cookie */
            headerTable: [
                {
                    text: 'Image',
                    align: 'center',
                    sortable: false,
                    value: 'image'
                },
                {
                    text: 'Country',
                    align: 'left',
                    sortable: true,
                    value: 'country',
                },
                {
                    text: 'City',
                    align: 'left',
                    sortable: true,
                    value: 'city',
                },
                {
                    text: 'Description',
                    align: 'left',
                    sortable: false,
                    length: 200,
                    value: 'description',
                },
                {
                    text: 'Rating',
                    align: 'center',
                    sortable: true,
                    length: 200,
                    value: 'rating',
                },
                {
                    text: 'Number of guests',
                    align: 'center',
                    sortable: true,
                    value: 'numberOfGuests'
                },
                {
                    text: 'Number of bedrooms',
                    align: 'center',
                    sortable: true,
                    value: 'numberOfBedrooms'
                },
                {
                    text: 'Owner',
                    align: 'left',
                    sortable: false,
                    value: 'owner',
                    // filter: (value) => {
                    //     if (!this.getStoreApartments.owner) return true
                    //
                    //     return String(this.getStoreApartments.owner.firstName + ' ' + this.getStoreApartments.owner.lastName).toLowerCase().includes(value.toLowerCase())
                    // },
                }
            ]
        }
    },
    computed: {
        ...mapGetters('apartments', ['getStoreApartments'])
    },
    components:{
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
        addToBookinkgs (key) {
            alert(key)
        }
    }
}
</script>

<style scoped>
.customTableRow td{
    border-bottom: 1px solid grey;
}

.customTableRow:last-child td{
    border-bottom: none;
}
</style>
