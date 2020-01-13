<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          class="mr-2"
          text
          @click="changeComponent('apartments')"
        >
          <v-icon class="mr-2">mdi-domain</v-icon>
          <span>Apartment list</span>
        </v-btn>
        <v-btn
          text
          @click="changeComponent('bookings')"
        >
          <v-icon class="mr-2" color="green">mdi-home</v-icon>
          <span>My bookings</span>
        </v-btn>
      </div>

      <v-spacer />
    </v-app-bar>
    <v-content>
      <apartments v-if="navigation === 'apartments'" />
      <bookings v-if="navigation === 'bookings'"  />
    </v-content>
  </v-app>
</template>

<script>
import apartments from "../pages/apartments";
import bookings from "../pages/bookings";
export default {
  name: 'App',

  data: () => ({
    navigation: 'apartments',
    safeGuards: ['apartments', 'bookings']
  }),
  methods: {
    changeComponent(componentName) {
      if (this.safeGuards.indexOf(componentName) !== -1) {
        this.navigation = componentName
      }
    }
  },
  components:{
    apartments,
    bookings
  },
  beforeMount() {
    this.$store.dispatch('apartments/dataApartments')
  }
};
</script>
