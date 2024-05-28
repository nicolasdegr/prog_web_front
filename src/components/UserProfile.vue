<template>
  <!-- Container voor de profielpagina -->
  <div class="profile-container">
    <h2>Profile</h2>
    <!-- Weergave van profielinformatie als deze niet wordt bewerkt -->
    <div v-if="!isEditing">
      <div class="profile-info">
        <p><strong>Username:</strong> {{ username }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Role:</strong> {{ role }}</p>
        <p><strong>Password:</strong> <input type="password" v-model="password" readonly /></p>
      </div>
      <!-- Knop om het bewerken van het profiel mogelijk te maken -->
      <div class="button-group">
        <button class="styled-button" @click="enableEditing">Edit Profile</button>
      </div>
    </div>
    <!-- Formulier voor het bewerken van profielinformatie -->
    <div v-else>
      <h3>Edit Profile Information</h3>
      <div class="input-group">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="role" placeholder="Role (User or Admin)" required />
      </div>
      <!-- Knoppen om het profiel bij te werken of het bewerken te annuleren -->
      <div class="button-group">
        <button class="styled-button" @click="updateProfile">Update Profile</button>
        <button class="styled-button cancel-button" @click="cancelEditing">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  data() {
    return {
      // Data eigenschappen voor het formulier
      email: '',
      role: '',
      password: '',
      isEditing: false
    };
  },
  computed: {
    ...mapGetters(['getUsername', 'getUser']),
    // Computed property om de gebruikersnaam op te halen
    username() {
      return this.getUsername;
    }
  },
  methods: {
    // Methode om profielinformatie op te halen
    fetchProfile() {
      const username = this.username;
      if (!username) {
        console.error("No username found in session.");
        return;
      }

      console.log(`Fetching profile for username: ${username}`);

      axios.get('http://localhost:5089/user/profile', {
        headers: {
          'username': username
        }
      }).then(response => {
        const user = response.data;
        this.email = user.email;
        this.role = user.role;
        this.password = '********';  // Gemaskeerd wachtwoord, niet opgehaald van de server om veiligheidsredenen
      }).catch(error => {
        console.error(error);
      });
    },
    // Methode om het bewerken van het profiel mogelijk te maken
    enableEditing() {
      this.isEditing = true;
    },
    // Methode om het bewerken van het profiel te annuleren
    cancelEditing() {
      this.isEditing = false;
      this.fetchProfile();
    },
    // Methode om het profiel bij te werken
    updateProfile() {
      axios.put('http://localhost:5089/user/profile', {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      }).then(response => {
        console.log(response.data);
        this.isEditing = false;
        this.fetchProfile();  // Vernieuw de profielinformatie
      }).catch(error => {
        console.error(error);
      });
    }
  },
  // Lifecycle hook om profielinformatie op te halen wanneer de component wordt gemonteerd
  mounted() {
    this.fetchProfile();
  }
};
</script>

<style>
/* Styling voor de container van de profielpagina */
.profile-container {
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

/* Styling voor de titel van de profielpagina */
.profile-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

/* Styling voor de profielinformatie */
.profile-info {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Styling voor de paragrafen in de profielinformatie */
.profile-info p {
  color: #333;
  font-size: 1.1em;
  margin: 10px 0;
}

/* Styling voor de invoervelden in de profielinformatie */
.profile-info input {
  padding: 10px;
  border: none;
  background: #f0f4f8;
  border-radius: 8px;
  font-size: 1em;
  margin-top: 5px;
}

/* Styling voor de invoergroep */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Styling voor de groep knoppen */
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
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

/* Extra styling voor de annuleerknop */
.cancel-button {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
}

/* Styling voor hover state van de annuleerknop */
.cancel-button:hover {
  background: linear-gradient(135deg, #eb6841, #f47c3c);
}
</style>
