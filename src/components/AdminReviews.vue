<template>
  <!-- Container voor de beoordelingen -->
  <div class="reviews-container">
    <h2>All Reviews</h2>
    <!-- Knop om beoordelingen op te halen -->
    <button class="styled-button" @click="fetchReviews">Fetch Reviews</button>
    <!-- Lijst met beoordelingen als er beoordelingen zijn -->
    <ul v-if="reviews.length" class="reviews-list">
      <li v-for="review in reviews" :key="review.id" class="review-card">
        <p><strong>User ID:</strong> {{ review.userId }}</p>
        <p><strong>Campground ID:</strong> {{ review.campgroundId }}</p>
        <p><strong>Comment:</strong> {{ review.comment }}</p>
        <p><strong>Rating:</strong> {{ review.rating }}</p>
      </li>
    </ul>
    <!-- Bericht als er geen beoordelingen zijn gevonden -->
    <p v-else>No reviews found.</p>
    <!-- Knop om terug te gaan naar het dashboard -->
    <button class="back-button" @click="goBack">Back to Dashboard</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminReviews',
  data() {
    return {
      // Data eigenschap voor de beoordelingen
      reviews: []
    };
  },
  methods: {
    // Methode om beoordelingen op te halen
    fetchReviews() {
      axios.get('http://localhost:5089/admin/reviews')
        .then(response => {
          this.reviews = response.data;
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
/* Styling voor de container van de beoordelingen */
.reviews-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de beoordelingen */
.reviews-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
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

/* Styling voor de lijst van beoordelingen */
.reviews-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

/* Styling voor een beoordeling kaart */
.review-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  text-align: left;
}

/* Styling voor de paragrafen in een beoordeling kaart */
.review-card p {
  color: #555;
  font-size: 1em;
  margin: 5px 0;
}

/* Styling voor de sterke elementen in een beoordeling kaart */
.review-card strong {
  color: #333;
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
