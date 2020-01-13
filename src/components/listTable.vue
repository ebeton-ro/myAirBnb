<template>
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
            <tr
                v-for="item in items"
                :key="item.name"
                @dblclick="addToBookinkgs(item.id, false)"
                class="customTableRow"
            >
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
                    {{item.numberOfBedrooms}}
                </td>
                <td>
                    {{item.owner.firstName}} {{item.owner.lastName}}
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
export default {
    props: ['getStoreApartments'],
    name: "listTable",
    data: () => ({
        search: '',
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
            }
        ]
    }),
    methods: {
        addToBookinkgs (key, newStatus) {
            this.$store.dispatch('apartments/changeBookingStatus', {id: key, newStatus: newStatus})
        }
    }
}
</script>

<style scoped>
    .customTableRow td{
        border-bottom: 1px solid grey;
        cursor: pointer;
    }

    .customTableRow:last-child td{
        border-bottom: none;
    }
</style>
