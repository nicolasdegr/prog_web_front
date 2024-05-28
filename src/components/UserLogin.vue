<template>
  <!-- Container voor de loginpagina -->
  <div class="login-container">
    <h2>Login</h2>
    <!-- Formulier voor het inloggen -->
    <form @submit.prevent="login">
      <div class="input-group">
        <!-- Invoerveld voor gebruikersnaam -->
        <input v-model="username" placeholder="Username" required />
        <!-- Invoerveld voor email -->
        <input v-model="email" placeholder="Email" required />
        <!-- Invoerveld voor wachtwoord -->
        <input v-model="password" type="password" placeholder="Password" required />
        <!-- Invoerveld voor rol (Gebruiker of Admin) -->
        <input v-model="role" placeholder="Role (User or Admin)" required />
      </div>
      <!-- Knop om het formulier in te dienen -->
      <button class="styled-button" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'UserLogin',
  data() {
    return {
      // Data eigenschappen voor het formulier
      username: '',
      email: '',
      password: '',
      role: ''
    };
  },
  methods: {
    ...mapActions(['setUser']),
    // Methode om in te loggen
    login() {
      axios.post('http://localhost:5089/user/login', {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      }).then(response => {
        const user = response.data;
        localStorage.setItem('username', user.username);
        this.setUser(user); // Sla de gebruiker op in Vuex
        if (user.role === 'Admin') {
          this.$router.push('/admin/dashboard');
        } else {
          this.$router.push('/user/home');
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }
};
</script>

<style>
/* Styling voor de container van de loginpagina */
.login-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de loginpagina */
.login-container h2 {
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
</style>
