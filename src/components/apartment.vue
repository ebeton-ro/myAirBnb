<template>
    <v-card
        class="pa-2 ml-auto mr-auto mt-2 mb-2 mr-md-2 ml-md-2"
        :class="{ 'col-11 col-sm-7 col-md-3 col-lg-lg-2 col-xl-2 d-inline-block': isCard, 'col-12': !isCard}"
        :disabled="!apartment.available && !isBooked"
        hover
    >
        <v-container>
            <v-row justify="space-between">
                <v-img
                    height="200"
                    width="200"
                    :src="apartment.image.src"
                    :alt="apartment.image.alt"
                />
            </v-row>
            <v-row>
                <v-card-title
                    dense
                    class="customTitleClass"
                    :title="apartment.country + ' ' + apartment.city"
                >
                <span
                        class="d-inline-block pr-1"
                        v-show="apartment && apartment.country && apartment.country.length">
                    {{apartment.country}}</span>
                    <span v-show="apartment && apartment.city && apartment.city.length">{{apartment.city}}</span>
                </v-card-title>
            </v-row>
            <v-row>
                <v-rating
                    v-model="apartment.rating"
                    :length="length"
                    :empty-icon="emptyIcon"
                    :full-icon="fullIcon"
                    :half-icon="halfIcon"
                    dense
                    />
            </v-row>
            <v-row>
                <v-card-subtitle>
                    {{apartment.price}}
                </v-card-subtitle>
            </v-row>
            <v-row
                class="pb-0 mb-0"
            >
                <v-card-text>
                    {{description}} <span v-show="showMoreLink" @click="linkShowMore" class="customShowMoreClass primary--text">{{linkText}}</span>
                </v-card-text>
            </v-row>
            <v-row>
                <v-chip
                    title="Number of guests"
                    color="blue"
                    text-color="white"
                    class="ml-2 mr-1"
                >
                    <v-icon
                        left
                        small
                    >mdi-account</v-icon>
                    {{apartment.numberOfGuests}}
                </v-chip>
                <v-chip
                    title="Number of bedrooms"
                    color="blue"
                    text-color="white"
                    class="ml-1 mr-1"
                >
                    <v-icon
                        left
                        small
                    >mdi-bed-empty</v-icon>
                    {{apartment.numberOfBedrooms}}
                </v-chip>
            </v-row>
            <v-row>
                <span
                    class="d-inline-block pr-1"
                    v-show="apartment && apartment.owner && apartment.owner.firstName">
                    {{apartment.owner.firstName}}
                </span>
                <span v-show="apartment && apartment.owner && apartment.owner.lastName">{{apartment.owner.lastName}}</span>

            </v-row>
            <v-row>
                <v-card-actions
                >
                    <v-btn
                        dense
                        text
                        class="pl-0 pr-0 text-capitalize"
                        @click="addToBookinkgs(apartment.id, true)"
                    >
                        {{actionButtonText}}
                    </v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: ['apartment', 'isCard', 'isBooked'],
    name: 'apartment',
    data: () => ({
        length: 10,
        maxDescriptionLength: 200,
        showMoreLink: false,
        showMoreText: false,
        linkText: 'Show more',
        emptyIcon: 'mdi-star-outline',
        fullIcon: 'mdi-star',
        halfIcon: 'mdi-star-half-full',
    }),
    computed:{
        description () {
            if (this.apartment.description.length < this.maxDescriptionLength || this.showMoreText) {
                return this.apartment.description
            }
            this.linkShowMore('initial')
            return this.apartment.description.substr(0, this.maxDescriptionLength) + '...'
        },
        actionButtonText () {
            if (this.isBooked) {
                return 'Cancel Booking'
            }
            return 'RESERVE'
        }
    },
    methods: {
        linkShowMore (type) {
            if(type === 'initial') {
                this.showMoreLink = true
            } else {
                this.showMoreText = !this.showMoreText
                this.linkText = this.showMoreText ? 'Hide some':'Show more'
            }
        },
        addToBookinkgs (key, newStatus) {
            this.$store.dispatch('apartments/changeBookingStatus', {id: key, newStatus: newStatus})
        }
    },
    watch: {
        'apartment': function (newVal) {
            if (newVal.description.length > this.maxDescriptionLength) {
                this.showMoreLink = true
            }
        }
    }
}
</script>

<style scoped>
.customTitleClass{
    word-break-wrap: all;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 2.5em;
}

.v-card__text{
    min-height: 165px!important;
}

.customShowMoreClass{
    display: inline-block;
    float: right;
    cursor: pointer;
}
</style>
