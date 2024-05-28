<template>
  <!-- Container voor het admin dashboard -->
  <div class="admin-dashboard-container">
    <div class="main-content">
      <div>
        <h2>Admin Dashboard</h2>
        <!-- Navigatie knoppen voor verschillende acties op het dashboard -->
        <nav>
          <button class="styled-button" @click="goToFetchCampgrounds">Fetch All Campgrounds</button>
          <button class="styled-button" @click="goToAddCampground">Add Campground</button>
          <button class="styled-button" @click="goToUpdateCampground">Update Campground</button>
          <button class="styled-button" @click="goToViewUsers">View All Users</button>
          <button class="styled-button" @click="goToSearchUsers">Search Users</button>
          <button class="styled-button" @click="goToViewBookings">View All Bookings</button>
          <button class="styled-button" @click="goToViewReviews">View All Reviews</button>
        </nav>
        <!-- Placeholder voor de router-view -->
        <router-view />
      </div>
      <!-- Sectie voor dashboard statistieken -->
      <div class="dashboard-stats">
        <h3>Dashboard Stats</h3>
        <div v-if="stats">
          <p><strong>Users:</strong> {{ stats.users }}</p>
          <p><strong>Campgrounds:</strong> {{ stats.campgrounds }}</p>
          <p><strong>Bookings:</strong> {{ stats.bookings }}</p>
          <p><strong>Reviews:</strong> {{ stats.reviews }}</p>
        </div>
        <div v-else>
          <p>Loading stats...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      // Data eigenschap voor de statistieken
      stats: null
    };
  },
  // Lifecycle hook om de dashboard statistieken op te halen wanneer de component wordt aangemaakt
  created() {
    this.fetchDashboardStats();
  },
  methods: {
    // Methode om de dashboard statistieken op te halen
    fetchDashboardStats() {
      axios.get('http://localhost:5089/admin/dashboard')
        .then(response => {
          this.stats = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Methode om naar de pagina voor het toevoegen van een camping te gaan
    goToAddCampground() {
      this.$router.push('/admin/add-campground');
    },
    // Methode om naar de pagina voor het updaten van een camping te gaan
    goToUpdateCampground() {
      this.$router.push('/admin/update-campground');
    },
    // Methode om naar de pagina voor het bekijken van alle gebruikers te gaan
    goToViewUsers() {
      this.$router.push('/admin/users');
    },
    // Methode om naar de pagina voor het zoeken naar gebruikers te gaan
    goToSearchUsers() {
      this.$router.push('/admin/search-users');
    },
    // Methode om naar de pagina voor het bekijken van alle boekingen te gaan
    goToViewBookings() {
      this.$router.push('/admin/bookings');
    },
    // Methode om naar de pagina voor het bekijken van alle beoordelingen te gaan
    goToViewReviews() {
      this.$router.push('/admin/reviews');
    },
    // Methode om naar de pagina voor het ophalen van alle campings te gaan
    goToFetchCampgrounds() {
      this.$router.push('/user/home');
    }
  }
};
</script>

<style>
/* Styling voor de container van het admin dashboard */
.admin-dashboard-container {
  width: 90%;
  max-width: 1200px;
  margin: 40px auto;
  background: linear-gradient(to bottom right, #ffffff, #f0f4f8);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  text-align: center;
}

/* Styling voor de hoofdinhoud */
.main-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Styling voor de titel van het admin dashboard */
.admin-dashboard-container h2 {
  font-size: 2.5em;
  color: #333;
  font-family: 'Playfair Display', serif;
  margin-bottom: 30px;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling voor de navigatieknoppen */
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

/* Styling voor de knoppen */
.styled-button {
  padding: 12px 24px; 
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em; 
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Styling voor hover state van de knoppen */
.styled-button:hover {
  background: linear-gradient(135deg, #5563c1, #623d86);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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

/* Styling voor de dashboard statistieken sectie */
.dashboard-stats {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 250px;
  margin-left: 20px;
  text-align: left;
}

/* Styling voor de titel van de dashboard statistieken */
.dashboard-stats h3 {
  margin-top: 0;
  color: #333;
  font-family: 'Playfair Display', serif;
  font-size: 1.5em;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

/* Styling voor de paragrafen in de dashboard statistieken */
.dashboard-stats p {
  color: #555;
  font-size: 1em;
  margin: 10px 0;
}
</style>
