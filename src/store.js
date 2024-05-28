import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // Definieer de state van de store
    state: {
        user: null, // Initialiseer de gebruiker als null
    },
    // Definieer de mutaties om de state te veranderen
    mutations: {
        setUser(state, user) {
            state.user = user; // Stel de gebruiker in
        },
    },
    // Definieer de acties om mutaties aan te roepen
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user); // Roep de setUser mutatie aan
        },
    },
    // Definieer de getters om toegang te krijgen tot de state
    getters: {
        getUser(state) {
            return state.user; // Haal de huidige gebruiker op
        },
        getUsername(state) {
            return state.user ? state.user.username : ''; // Haal de gebruikersnaam op als de gebruiker is ingelogd, anders een lege string
        }
    },
});
