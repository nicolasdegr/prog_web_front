<template>
  <!-- Container voor de boekingspagina -->
  <div class="booking-container">
    <h2>Book a Campground</h2>
    <!-- Formulier voor het maken van een boeking -->
    <form @submit.prevent="makeBooking">
      <div class="input-group">
        <!-- Invoerveld voor gebruikersnaam, alleen lezen -->
        <input v-model="username" placeholder="Username" readonly />
        <!-- Selectievak voor het kiezen van een camping -->
        <select v-model="campgroundName" required>
          <option value="" disabled>Select Campground</option>
          <option v-for="campground in campgrounds" :key="campground.id" :value="campground.name">
            {{ campground.name }}
          </option>
        </select>
        <!-- Invoervelden voor start- en einddatum -->
        <input v-model="startDate" type="date" placeholder="Start Date" required />
        <input v-model="endDate" type="date" placeholder="End Date" required />
      </div>
      <!-- Knop om het boekingsformulier in te dienen -->
      <button class="styled-button" type="submit">Book</button>
    </form>
    <!-- Succesbericht na succesvolle boeking -->
    <div v-if="showSuccessMessage" class="success-message">
      Booking successful!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'CampgroundBooking',
  data() {
    return {
      // Data eigenschappen voor het formulier en de lijst van campings
      username: '',
      campgroundName: '',
      startDate: '',
      endDate: '',
      campgrounds: [],
      showSuccessMessage: false
    };
  },
  computed: {
    ...mapGetters(['getUsername']),
    // Computed property om de huidige gebruikersnaam op te halen
    currentUsername() {
      return this.getUsername;
    }
  },
  created() {
    // Initialiseer gebruikersnaam en haal campings op wanneer de component wordt aangemaakt
    this.username = this.currentUsername;
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
    // Methode om een boeking te maken
    makeBooking() {
      axios.post(`http://localhost:5089/booking/create?username=${this.username}&campgroundName=${this.campgroundName}&startDate=${this.startDate}&endDate=${this.endDate}`)
        .then(response => {
          console.log(response.data);
          this.showSuccessMessage = true;
          // Verberg succesbericht na 3 seconden
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          // Reset het formulier na succesvolle boeking
          this.campgroundName = '';
          this.startDate = '';
          this.endDate = '';
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
/* Styling voor de container van de boekingspagina */
.booking-container {
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
.booking-container h2 {
  color: #333;
  margin-bottom: 20px;
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

/* Styling voor het succesbericht */
.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1em;
}
</style>
