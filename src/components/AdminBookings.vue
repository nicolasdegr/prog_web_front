<template>
  <!-- Container voor de boekingsdetails -->
  <div class="booking-details-container">
    <h2>Booking Details</h2>
    <!-- Formulier voor het ophalen van boekingsinformatie -->
    <form @submit.prevent="fetchBooking" class="booking-form">
      <div class="input-group">
        <!-- Invoerveld voor de gebruikersnaam -->
        <input v-model="username" placeholder="Username" required />
        <!-- Selecteer veld voor het kiezen van een camping -->
        <select v-model="campgroundName" required>
          <option disabled value="">Select Campground</option>
          <option v-for="campground in campgrounds" :key="campground.id" :value="campground.name">{{ campground.name }}</option>
        </select>
        <!-- Knop om het formulier in te dienen en boeking op te halen -->
        <button class="styled-button" type="submit">Fetch Booking</button>
      </div>
    </form>
    <!-- Sectie voor het tonen van de boekingsinformatie als deze is opgehaald -->
    <div v-if="booking" class="booking-info">
      <h3>Booking Information</h3>
      <p><strong>Username:</strong> {{ booking.username }}</p>
      <p><strong>Campground:</strong> {{ booking.campgroundName }}</p>
      <p><strong>Start Date:</strong> {{ booking.startDate }}</p>
      <p><strong>End Date:</strong> {{ booking.endDate }}</p>
    </div>
    <!-- Knop om terug te gaan naar het dashboard -->
    <button class="back-button" @click="goBack">Back to Dashboard</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminBookings',
  data() {
    return {
      // Data eigenschappen voor het formulier en de boekingsinformatie
      username: '',
      campgroundName: '',
      booking: null,
      campgrounds: [] // Toevoegen van deze eigenschap om de lijst van campings op te slaan
    };
  },
  // Lifecycle hook om campings op te halen bij het laden van de component
  mounted() {
    this.fetchCampgrounds(); // Haal campings op wanneer de component wordt geladen
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
    // Methode om boekingsinformatie op te halen
    fetchBooking() {
      axios.get(`http://localhost:5089/booking/detail?username=${this.username}&campgroundName=${this.campgroundName}`)
        .then(response => {
          this.booking = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Methode om terug te gaan naar het dashboard
    goBack() {
      this.$router.push('/admin/dashboard');
    }
  }
};
</script>

<style>
/* Styling voor de container van de boekingsdetails */
.booking-details-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de boekingsdetails */
.booking-details-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

/* Styling voor het boekingsformulier */
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

/* Styling voor de input groep */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Styling voor de input velden en select veld */
.input-group input, .input-group select {
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

/* Styling voor de sectie met boekingsinformatie */
.booking-info {
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  text-align: left;
}

/* Styling voor de titel van de boekingsinformatie */
.booking-info h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.5em;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
}

/* Styling voor de paragrafen in de boekingsinformatie */
.booking-info p {
  color: #555;
  font-size: 1em;
  margin: 10px 0;
}

/* Styling voor de terug knop */
.back-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

/* Styling voor hover state van de terug knop */
.back-button:hover {
  background: linear-gradient(135deg, #eb6841, #f47c3c);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Styling voor actieve state van de terug knop */
.back-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Styling voor focus state van de terug knop */
.back-button:focus {
  outline: none;
}
</style>
