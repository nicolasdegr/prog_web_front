<template>
  <!-- Container voor het vinden van campings -->
  <div class="campground-container">
    <h2>Find Campground</h2>
    <!-- Formulier om campings op te halen op basis van criteria -->
    <form @submit.prevent="fetchCampground">
      <div class="input-group">
        <!-- Invoerveld voor locatie -->
        <input v-model="location" placeholder="Location" />
        <!-- Invoerveld voor prijs -->
        <input v-model="price" placeholder="Price" required />
        <!-- Invoerveld voor voorzieningen, komma-gescheiden -->
        <input v-model="amenities" placeholder="Amenities (comma-separated)" />
        <!-- Knop om het formulier in te dienen en te zoeken naar campings -->
        <button class="styled-button" type="submit">Search</button>
      </div>
    </form>
    <!-- Lijst van campings als er resultaten zijn -->
    <div v-if="campgrounds.length" class="campground-list">
      <div v-for="campground in campgrounds" :key="campground.id" class="campground-details">
        <h3>{{ campground.name }}</h3>
        <p><strong>Location:</strong> {{ campground.location }}</p>
        <p><strong>Description:</strong> {{ campground.description }}</p>
        <p><strong>Price:</strong> {{ campground.price }} per night</p>
        <p><strong>Photos:</strong></p>
        <ul>
          <li v-for="photo in campground.photos" :key="photo">{{ photo }}</li>
        </ul>
        <p><strong>Amenities:</strong></p>
        <ul>
          <li v-for="amenity in campground.amenities" :key="amenity">{{ amenity }}</li>
        </ul>
      </div>
    </div>
    <!-- Bericht als er geen campings zijn gevonden -->
    <p v-else-if="campgrounds !== null">No campgrounds found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CampgroundDetail',
  data() {
    return {
      // Data eigenschappen voor het formulier en de lijst van campings
      location: '',
      price: '',
      amenities: '',
      campgrounds: []
    };
  },
  methods: {
    // Methode om campings op te halen op basis van de ingevoerde criteria
    fetchCampground() {
      axios.get('http://localhost:5089/campground/detail', {
        params: {
          price: this.price,
          location: this.location,
          amenities: this.amenities
        }
      })
      .then(response => {
        this.campgrounds = response.data;
      })
      .catch(error => {
        console.error(error);
        this.campgrounds = [];
      });
    }
  }
};
</script>

<style>
/* Styling voor de container van het zoekformulier voor campings */
.campground-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de zoekpagina */
.campground-container h2 {
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

/* Styling voor de invoervelden */
.input-group input {
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

/* Styling voor de lijst van campings */
.campground-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Styling voor de details van een camping */
.campground-details {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: calc(50% - 20px);
  margin-top: 20px;
  text-align: left;
}

/* Styling voor de paragrafen en kopjes in de details van een camping */
.campground-details p,
.campground-details h3 {
  color: #333;
}

/* Styling voor de lijsten in de details van een camping */
.campground-details ul {
  list-style-type: disc;
  margin: 10px 0;
  padding-left: 20px;
}

/* Styling voor de items in de lijsten */
.campground-details li {
  margin-bottom: 5px;
  color: #333;
}
</style>
