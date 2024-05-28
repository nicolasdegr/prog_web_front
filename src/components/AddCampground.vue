<template>
  <!-- Container voor het toevoegen van een camping -->
  <div class="add-campground-container">
    <h2>Add Campground</h2>
    <!-- Formulier voor het toevoegen van een nieuwe camping -->
    <form @submit.prevent="addCampground">
      <div class="input-group">
        <!-- Invoervelden voor de camping details -->
        <input v-model="name" placeholder="Campground Name" required />
        <input v-model="location" placeholder="Location" required />
        <textarea v-model="description" placeholder="Description" required></textarea>
        <input v-model="price" type="number" placeholder="Price per night" required />
        <input v-model="newPhoto" placeholder="Photo URL" />
        <!-- Knop om een nieuwe foto toe te voegen -->
        <button class="styled-button" type="button" @click="addPhoto">Add Photo</button>
        <!-- Lijst van toegevoegde foto's -->
        <ul>
          <li v-for="photo in photos" :key="photo">{{ photo }}</li>
        </ul>
        <input v-model="newAmenity" placeholder="Amenity" />
        <!-- Knop om een nieuwe voorziening toe te voegen -->
        <button class="styled-button" type="button" @click="addAmenity">Add Amenity</button>
        <!-- Lijst van toegevoegde voorzieningen -->
        <ul>
          <li v-for="amenity in amenities" :key="amenity">{{ amenity }}</li>
        </ul>
        <!-- Knop om het formulier in te dienen -->
        <button class="styled-button" type="submit">Add Campground</button>
      </div>
    </form>
    <!-- Knop om terug te gaan naar het dashboard -->
    <button class="back-button" @click="goBack">Back to Dashboard</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCampground',
  data() {
    return {
      // Data eigenschappen voor het formulier
      name: '',
      location: '',
      description: '',
      price: '',
      newPhoto: '',
      photos: [],
      newAmenity: '',
      amenities: []
    };
  },
  methods: {
    // Methode om een foto toe te voegen aan de lijst
    addPhoto() {
      if (this.newPhoto.trim() !== '') {
        this.photos.push(this.newPhoto);
        this.newPhoto = '';
      }
    },
    // Methode om een voorziening toe te voegen aan de lijst
    addAmenity() {
      if (this.newAmenity.trim() !== '') {
        this.amenities.push(this.newAmenity);
        this.newAmenity = '';
      }
    },
    // Methode om een nieuwe camping toe te voegen
    addCampground() {
      axios.post('http://localhost:5089/Campground/admin/add', {
        id: 0,
        name: this.name,
        location: this.location,
        description: this.description,
        price: this.price,
        photos: this.photos,
        amenities: this.amenities
      }).then(response => {
        console.log(response.data);
        // Reset het formulier na succesvolle toevoeging
        this.name = '';
        this.location = '';
        this.description = '';
        this.price = '';
        this.photos = [];
        this.amenities = [];
      }).catch(error => {
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
/* Styling voor de container van het formulier */
.add-campground-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van het formulier */
.add-campground-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

/* Styling voor de input groep */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

/* Styling voor de input velden en textarea */
.input-group input,
.input-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling voor de textarea */
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
