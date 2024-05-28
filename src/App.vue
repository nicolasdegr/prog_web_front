<template>
  <!-- Hoofddocument van de applicatie -->
  <div id="app">
    <!-- Header met navigatie -->
    <header>
      <div class="header-content">
        <h1>AdventureBase Booking</h1>
        <nav>
          <!-- Navigatieknoppen voor niet-ingelogde gebruikers -->
          <template v-if="!isLoggedIn">
            <button class="styled-button" @click="goToRegister" :disabled="isCurrentRoute('/register')">Register</button>
            <button class="styled-button" @click="goToLogin" :disabled="isCurrentRoute('/login')">Login</button>
          </template>
          <!-- Navigatieknoppen voor ingelogde gebruikers -->
          <template v-else>
            <button class="styled-button" @click="goToCampgroundList" :disabled="isCurrentRoute('/user/home')">All Campground Spots</button>
            <button class="styled-button" @click="goToUserProfile" :disabled="isCurrentRoute('/user/profile')">Profile</button>
            <button class="styled-button" @click="goToUserBookings" :disabled="isCurrentRoute('/user/bookings')">My Bookings</button>
            <button class="styled-button" @click="goToBookCampground" :disabled="isCurrentRoute('/user/book-campground')">Book a Campground</button>
            <button class="styled-button" @click="goToUserReviews" :disabled="isCurrentRoute('/user/reviews')">Submit a Review</button>
            <button class="styled-button" @click="goToCampgroundDetail" :disabled="isCurrentRoute('/campground/detail')">Find Campground by Filter</button>
            <button v-if="isAdmin" class="styled-button" @click="goToAdminDashboard" :disabled="isCurrentRoute('/admin/dashboard')">Admin Dashboard</button>
            <button class="styled-button" @click="logout">Logout</button>
          </template>
        </nav>
      </div>
    </header>
    <!-- Hoofdinhoud -->
    <main>
      <router-view />
    </main>
    <!-- Footer -->
    <footer>
      <p>&copy; 2024 AdventureBase Booking. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getUser']),
    // Controleert of de gebruiker is ingelogd
    isLoggedIn() {
      return this.getUser !== null;
    },
    // Controleert of de gebruiker een admin is
    isAdmin() {
      return this.getUser && this.getUser.role === 'Admin';
    }
  },
  methods: {
    ...mapActions(['clearUser']),
    // Controleert of de huidige route overeenkomt met een gegeven route
    isCurrentRoute(route) {
      return this.$route.path === route;
    },
    // Navigatiemethoden voor verschillende routes
    goToRegister() {
      this.$router.push('/register');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToCampgroundList() {
      this.$router.push('/user/home');
    },
    goToUserProfile() {
      this.$router.push('/user/profile');
    },
    goToUserBookings() {
      this.$router.push('/user/bookings');
    },
    goToBookCampground() {
      this.$router.push('/user/book-campground');
    },
    goToUserReviews() {
      this.$router.push('/user/reviews');
    },
    goToAdminDashboard() {
      this.$router.push('/admin/dashboard');
    },
    goToCampgroundDetail() {
      this.$router.push('/campground/detail');
    },
    // Methode om uit te loggen
    logout() {
      this.clearUser();
      this.$router.push('/login'); // Navigeer naar de loginpagina
      window.location.reload(); // Ververs de pagina
    }
  }
};
</script>

<style>
/* Algemene styling voor de applicatie */
body {
  background: #f0f4f8;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Styling voor de header */
header {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header-content {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styling voor de titel in de header */
header h1 {
  margin: 0;
  font-size: 2.5em;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Styling voor de navigatie */
nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

/* Styling voor de hoofdinhoud */
main {
  flex: 1;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f4f8;
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
}

/* Styling voor de footer */
footer {
  background: #667eea;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
}

footer p {
  margin: 0;
  font-size: 1em;
}

/* Styling voor de knoppen */
.styled-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Styling voor hover state van de knoppen */
.styled-button:hover:not([disabled]) {
  background: linear-gradient(135deg, #5563c1, #623d86);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Styling voor actieve state van de knoppen */
.styled-button:active:not([disabled]) {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Styling voor focus state van de knoppen */
.styled-button:focus {
  outline: none;
}

/* Styling voor uitgeschakelde knoppen */
.styled-button[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
