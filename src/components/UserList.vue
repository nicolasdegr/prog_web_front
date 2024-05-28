<template>
  <!-- Container voor de lijst van gebruikers -->
  <div class="user-list-container">
    <h2>All Users</h2>
    <!-- Acties voor het ophalen van gebruikers en zoeken naar een gebruiker -->
    <div class="actions">
      <!-- Knop om alle gebruikers op te halen -->
      <button class="styled-button" @click="fetchUsers">Fetch All Users</button>
      <!-- Formulier om te zoeken naar een gebruiker op basis van gebruikersnaam -->
      <form @submit.prevent="searchUser" class="search-form">
        <input v-model="searchUsername" placeholder="Search by Username" required />
        <button class="styled-button" type="submit">Search User</button>
      </form>
    </div>
    <!-- Lijst van gebruikers als er resultaten zijn -->
    <ul v-if="users.length" class="user-list">
      <li v-for="user in users" :key="user.id" class="user-card">
        <strong>Username:</strong> {{ user.username }}<br />
        <strong>Email:</strong> {{ user.email }}<br />
        <strong>Role:</strong> {{ user.role }}<br />
      </li>
    </ul>
    <!-- Bericht als er geen gebruikers zijn gevonden -->
    <p v-else>No users found.</p>
    <!-- Knop om terug te gaan naar het dashboard -->
    <button class="back-button" @click="goBack">Back to Dashboard</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserList',
  data() {
    return {
      // Data eigenschappen voor de lijst van gebruikers en de zoekterm
      users: [],
      searchUsername: ''
    };
  },
  methods: {
    // Methode om alle gebruikers op te halen
    fetchUsers() {
      axios.get('http://localhost:5089/admin/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Methode om te zoeken naar een gebruiker op basis van de gebruikersnaam
    searchUser() {
      axios.get(`http://localhost:5089/admin/user?username=${this.searchUsername}`)
        .then(response => {
          this.users = [response.data];  // Aangenomen dat de respons een enkel gebruikersobject is
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
/* Styling voor de container van de gebruikerslijst */
.user-list-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de gebruikerslijst */
.user-list-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

/* Styling voor de actieknoppen en het zoekformulier */
.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

/* Styling voor het zoekformulier */
.search-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Styling voor de invoervelden in het zoekformulier */
.search-form input {
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

/* Styling voor de lijst van gebruikers */
.user-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

/* Styling voor de gebruikerskaarten */
.user-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  text-align: left;
}

/* Styling voor de sterke elementen in de gebruikerskaarten */
.user-card strong {
  color: #333;
}

/* Styling voor de terugknop */
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

/* Styling voor hover state van de terugknop */
.back-button:hover {
  background: linear-gradient(135deg, #eb6841, #f47c3c);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Styling voor actieve state van de terugknop */
.back-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Styling voor focus state van de terugknop */
.back-button:focus {
  outline: none;
}
</style>
