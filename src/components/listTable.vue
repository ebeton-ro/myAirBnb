<template>
    <v-data-table
            class="col-11 ma-auto"
            :headers="headerTable"
            item-key="id"
            sort-by="rating"
            sort-desc
            fixed-header
            :items="getStoreApartments"
            height="650px"
            calculate-widths
            width="100%"
    >
        <template v-slot:body="{ items }" >
            <tr
                v-for="item in items"
                :key="item.name"
                @dblclick="addToBookinkgs(item, false)"
                class="customTableRow"
                :class=" { 'disabledCustomTableRow': !item.available} "
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
                    {{item.price}}
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
                    {{item.available ? 'Available' : 'Not available'}}
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
        emptyIcon: 'mdi-star-outline',
        fullIcon: 'mdi-star',
        halfIcon: 'mdi-star-half-full',
        length: 10,
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
                text: 'Price',
                align: 'left',
                sortable: false,
                value: 'price',
            },
            {
                text: 'Rating',
                align: 'center',
                sortable: true,
                value: 'rating',
            },
            {
                text: 'Availability',
                align: 'center',
                sortable: true,
                value: 'available',
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
        addToBookinkgs (apartment, newStatus) {
            if (apartment.available) {
                this.$store.dispatch('apartments/changeBookingStatus', {id: apartment.id, newStatus: newStatus})
            }
        }
    }
}
</script>

<style scoped>
    .customTableRow td{
        border-bottom: 1px solid grey;
        cursor: pointer;
    }

    .customTableRow.disabledCustomTableRow td{
        cursor: not-allowed;
    }
    .customTableRow:last-child td{
        border-bottom: none;
    }
</style>
