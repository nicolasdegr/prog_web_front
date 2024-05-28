<template>
  <!-- Container voor het indienen van een beoordeling -->
  <div class="review-container">
    <h2>Submit a Review</h2>
    <!-- Formulier voor het indienen van een beoordeling -->
    <form @submit.prevent="submitReview">
      <div class="input-group">
        <!-- Selectievak voor het kiezen van een camping -->
        <select v-model="campgroundName" required>
          <option disabled value="">Select Campground</option>
          <option v-for="campground in campgrounds" :key="campground.id" :value="campground.name">
            {{ campground.name }}
          </option>
        </select>
        <!-- Invoerveld voor gebruikersnaam, alleen lezen -->
        <input v-model="username" placeholder="Username" readonly />
        <!-- Tekstvak voor commentaar -->
        <textarea v-model="comment" placeholder="Comment" required></textarea>
        <!-- Invoerveld voor beoordeling (1-5) -->
        <input v-model="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" required />
      </div>
      <!-- Knop om het formulier in te dienen -->
      <button class="styled-button" type="submit">Submit Review</button>
    </form>
    <!-- Succesbericht na succesvolle indiening -->
    <div v-if="showSuccessMessage" class="success-message">
      Review uploaded successfully!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'CampgroundReview',
  data() {
    return {
      // Data eigenschappen voor het formulier en de lijst van campings
      campgroundName: '',
      username: '',
      comment: '',
      rating: 0,
      campgrounds: [],
      showSuccessMessage: false
    };
  },
  // Lifecycle hook om campings op te halen en gebruikersnaam in te stellen wanneer de component wordt aangemaakt
  created() {
    this.fetchCampgrounds();
    this.setUsername();
  },
  computed: {
    ...mapGetters(['getUsername']),
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
    // Methode om de gebruikersnaam in te stellen
    setUsername() {
      this.username = this.getUsername;
    },
    // Methode om een beoordeling in te dienen
    submitReview() {
      axios.post(`http://localhost:5089/review/add?campgroundName=${this.campgroundName}&username=${this.username}`, {
        comment: this.comment,
        rating: this.rating
      }).then(response => {
        console.log(response.data);
        this.clearForm();
        this.showSuccessMessage = true;
        // Verberg succesbericht na 3 seconden
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }).catch(error => {
        console.error(error);
      });
    },
    // Methode om het formulier te resetten
    clearForm() {
      this.campgroundName = '';
      this.comment = '';
      this.rating = 0;
    }
  }
};
</script>

<style>
/* Styling voor de container van de beoordeling */
.review-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de beoordeling */
.review-container h2 {
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

/* Styling voor de invoervelden, tekstvak en selectievak */
.input-group input,
.input-group textarea,
.input-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling voor het tekstvak */
.input-group textarea {
  resize: vertical;
  min-height: 100px;
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
