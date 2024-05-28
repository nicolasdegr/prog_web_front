<template>
  <!-- Container voor het updaten van een camping -->
  <div class="update-campground-container">
    <h2>Update Campground</h2>
    <!-- Formulier om een camping op te halen als er nog geen camping is geselecteerd -->
    <div v-if="!campground">
      <form @submit.prevent="fetchCampground">
        <div class="input-group">
          <!-- Selectievak voor het kiezen van een camping -->
          <select v-model="campgroundName" required>
            <option value="" disabled>Select Campground</option>
            <option v-for="camp in campgrounds" :key="camp.id" :value="camp.name">{{ camp.name }}</option>
          </select>
          <!-- Knop om de camping op te halen -->
          <button class="styled-button" type="submit">Find Campground</button>
        </div>
      </form>
    </div>
    <!-- Formulier om de campinggegevens te updaten als de camping is geselecteerd -->
    <div v-else>
      <form @submit.prevent="updateCampground">
        <h3>{{ campground.name }}</h3>
        <div class="input-group">
          <!-- Invoervelden voor campinggegevens -->
          <input v-model="campground.name" placeholder="Name" required />
          <input v-model="campground.location" placeholder="Location" required />
          <textarea v-model="campground.description" placeholder="Description" required></textarea>
          <input v-model="campground.price" placeholder="Price per night" required />
          <input v-model="newPhoto" placeholder="Photo URL" />
          <!-- Knop om een foto toe te voegen -->
          <button class="styled-button" type="button" @click="addPhoto">Add Photo</button>
          <!-- Lijst van foto's -->
          <ul>
            <li v-for="photo in campground.photos" :key="photo">{{ photo }}</li>
          </ul>
          <input v-model="newAmenity" placeholder="Amenity" />
          <!-- Knop om een voorziening toe te voegen -->
          <button class="styled-button" type="button" @click="addAmenity">Add Amenity</button>
          <!-- Lijst van voorzieningen -->
          <ul>
            <li v-for="amenity in campground.amenities" :key="amenity">{{ amenity }}</li>
          </ul>
          <!-- Knop om de campinggegevens bij te werken -->
          <button class="styled-button" type="submit">Update Campground</button>
        </div>
      </form>
    </div>
    <!-- Knop om terug te gaan naar het dashboard -->
    <button class="back-button" @click="goBack">Back to Dashboard</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateCampground',
  data() {
    return {
      // Data eigenschappen voor het formulier en de campingdetails
      campgroundName: '',
      campground: null,
      campgrounds: [],
      newPhoto: '',
      newAmenity: ''
    };
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
    // Methode om een camping op te halen op basis van de naam
    fetchCampground() {
      axios.get('http://localhost:5089/campground/detailByName', {
        params: {
          name: this.campgroundName
        }
      })
      .then(response => {
        this.campground = response.data;
      })
      .catch(error => {
        console.error(error);
        this.campground = null;
      });
    },
    // Methode om een nieuwe foto toe te voegen aan de lijst van foto's
    addPhoto() {
      if (this.newPhoto.trim() !== '') {
        this.campground.photos.push(this.newPhoto);
        this.newPhoto = '';
      }
    },
    // Methode om een nieuwe voorziening toe te voegen aan de lijst van voorzieningen
    addAmenity() {
      if (this.newAmenity.trim() !== '') {
        this.campground.amenities.push(this.newAmenity);
        this.newAmenity = '';
      }
    },
    // Methode om de campinggegevens bij te werken
    updateCampground() {
      axios.put(`http://localhost:5089/campground/admin/update?name=${this.campgroundName}`, this.campground)
        .then(response => {
          console.log(response.data);
          // Reset de staat na een succesvolle update
          this.campgroundName = '';
          this.campground = null;
          this.newPhoto = '';
          this.newAmenity = '';
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Methode om terug te gaan naar het dashboard
    goBack() {
      this.$router.push('/admin/dashboard');
    }
  },
  // Lifecycle hook om campings op te halen wanneer de component wordt gemonteerd
  mounted() {
    this.fetchCampgrounds();
  }
};
</script>

<style>
/* Styling voor de container van de update pagina */
.update-campground-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de update pagina */
.update-campground-container h2 {
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
