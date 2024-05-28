<template>
  <!-- Container voor het registratieformulier -->
  <div class="form-container">
    <h2>Register</h2>
    <!-- Formulier voor registratie -->
    <form @submit.prevent="register">
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
      <button class="styled-button" type="submit">Register</button>
    </form>
    <!-- Succesbericht -->
    <div v-if="showSuccessMessage" class="success-message">
      Registration successful!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      // Data eigenschappen voor het formulier
      username: '',
      email: '',
      password: '',
      role: '',
      showSuccessMessage: false
    };
  },
  methods: {
    // Methode om te registreren
    register() {
      axios.post('http://localhost:5089/user/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      }).then(response => {
        console.log(response.data);
        // Succesbericht tonen
        this.showSuccessMessage = true;
        // Formulier resetten
        this.username = '';
        this.email = '';
        this.password = '';
        this.role = '';
        // Succesbericht na 3 seconden verbergen
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }).catch(error => {
        console.error(error);
      });
    }
  }
};
</script>

<style>
/* Styling voor de container van het formulier */
.form-container {
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
.form-container h2 {
  color: #333;
  margin-bottom: 20px;
}

/* Styling voor de invoergroep */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
