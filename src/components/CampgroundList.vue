<template>
  <!-- Container voor de lijst van alle campings -->
  <div class="campground-list-container">
    <h2>All Campground Spots</h2>
    <!-- Rasterweergave van campings -->
    <div class="campground-grid">
      <div v-for="campground in campgrounds" :key="campground.id" class="campground-card">
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CampgroundList',
  data() {
    return {
      // Data eigenschap voor de lijst van campings
      campgrounds: []
    };
  },
  // Lifecycle hook om campings op te halen wanneer de component wordt aangemaakt
  created() {
    this.fetchCampgrounds();
  },
  methods: {
    // Methode om campings op te halen
    fetchCampgrounds() {
      axios.get('http://localhost:5089/campground/all')
        .then(response => {
          this.campgrounds = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
/* Styling voor de container van de lijst van campings */
.campground-list-container {
  width: 90%;
  max-width: 1200px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de lijst van campings */
.campground-list-container h2 {
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #333;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
}

/* Styling voor het raster van campings */
.campground-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

/* Styling voor de camping kaarten */
.campground-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
}

/* Hover effect voor de camping kaarten */
.campground-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Styling voor de titel van de camping kaart */
.campground-card h3 {
  margin-top: 0;
  color: #333;
  font-family: 'Playfair Display', serif;
  font-size: 1.5em;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
}

/* Styling voor de paragrafen in de camping kaart */
.campground-card p {
  color: #555;
  font-size: 1em;
  margin: 10px 0;
}

/* Styling voor de lijsten in de camping kaart */
.campground-card ul {
  list-style-type: disc;
  margin: 10px 0;
  padding-left: 20px;
}

/* Styling voor de items in de lijsten */
.campground-card li {
  margin-bottom: 5px;
  color: #555;
}

/* Styling voor de sterke elementen in de camping kaart */
.campground-card strong {
  color: #333;
  font-weight: 600;
}
</style>
