<template>
  <!-- Container voor de boekingspagina -->
  <div class="bookings-container">
    <h2>My Bookings</h2>
    <!-- Formulier om een boeking op te halen -->
    <form @submit.prevent="fetchBooking">
      <div class="input-group">
        <!-- Selectievak voor het kiezen van een camping -->
        <select v-model="campgroundName" required>
          <option value="" disabled>Select Campground</option>
          <option v-for="campground in campgrounds" :key="campground.id" :value="campground.name">
            {{ campground.name }}
          </option>
        </select>
        <!-- Invoerveld voor gebruikersnaam, alleen lezen -->
        <input v-model="username" placeholder="Username" readonly />
      </div>
      <!-- Knop om het formulier in te dienen -->
      <button class="styled-button" type="submit">Find Booking</button>
    </form>
    <!-- Sectie voor de boekingsdetails als deze zijn gevonden -->
    <div v-if="booking" class="booking-details">
      <h3>Booking Details</h3>
      <p><strong>Username:</strong> {{ booking.username }}</p>
      <p><strong>Campground Name:</strong> {{ booking.campgroundName }}</p>
      <p><strong>Start Date:</strong> {{ booking.startDate }}</p>
      <p><strong>End Date:</strong> {{ booking.endDate }}</p>
      <p><strong>Status:</strong> {{ booking.status }}</p>
    </div>
    <!-- Bericht als er geen boeking is gevonden -->
    <p v-else>No booking found with the provided details.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'MyBookings',
  data() {
    return {
      // Data eigenschappen voor het formulier en de lijst van campings
      campgroundName: '',
      campgrounds: [],
      booking: null
    };
  },
  computed: {
    ...mapGetters(['getUsername']),
    // Computed property om de gebruikersnaam op te halen
    username() {
      return this.getUsername;
    }
  },
  // Lifecycle hook om campings op te halen wanneer de component wordt aangemaakt
  created() {
    this.fetchCampgrounds();
  },
  methods: {
    // Methode om de lijst van campings op te halen
    fetchCampgrounds() {
      axios.get('http://localhost:5089/campground/all')
        .then(response => {
          this.campgrounds = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Methode om boekingsdetails op te halen
    fetchBooking() {
      axios.get('http://localhost:5089/booking/detail', {
        params: {
          username: this.username,
          campgroundName: this.campgroundName
        }
      })
      .then(response => {
        this.booking = response.data;
      })
      .catch(error => {
        console.error(error);
        this.booking = null;
      });
    }
  }
};
</script>

<style>
/* Styling voor de container van de boekingspagina */
.bookings-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de boekingspagina */
.bookings-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

/* Styling voor de invoergroep */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

/* Styling voor de invoervelden en selectievak */
.input-group input,
.input-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling voor de knoppen */
.styled-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

/* Styling voor hover state van de knoppen */
.styled-button:hover {
  background: linear-gradient(135deg, #5563c1, #623d86);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Styling voor actieve state van de knoppen */
.styled-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Styling voor focus state van de knoppen */
.styled-button:focus {
  outline: none;
}

/* Styling voor de boekingsdetails sectie */
.booking-details {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  text-align: left;
}

/* Styling voor de paragrafen in de boekingsdetails */
.booking-details p {
  color: #333;
  font-size: 1.1em;
  margin: 10px 0;
}

/* Styling voor de titel van de boekingsdetails */
.booking-details h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5em;
}
</style>
