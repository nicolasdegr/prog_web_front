import Vue from 'vue';
import Router from 'vue-router';
import UserRegister from '../components/UserRegister.vue';
import UserLogin from '../components/UserLogin.vue';
import UserProfile from '../components/UserProfile.vue';
import CampgroundList from '../components/CampgroundList.vue';
import CampgroundBooking from '../components/CampgroundBooking.vue';
import CampgroundReview from '../components/CampgroundReview.vue';
import UserList from '../components/UserList.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import AddCampground from '../components/AddCampground.vue';
import AdminBookings from '../components/AdminBookings.vue';
import AdminReviews from '../components/AdminReviews.vue';
import CampgroundDetail from '../components/CampgroundDetail.vue';
import UpdateCampground from '../components/UpdateCampground.vue';
import MyBookings from '../components/MyBookings.vue';

Vue.use(Router); // Vue Router plugin registreren bij de Vue-instantie

export default new Router({
    routes: [
        { path: '/register', component: UserRegister }, // Route voor het registratieformulier
        { path: '/login', component: UserLogin }, // Route voor het loginformulier
        { path: '/user/home', component: CampgroundList }, // Route voor het tonen van de lijst met campings
        { path: '/user/profile', component: UserProfile }, // Route voor het gebruikersprofiel
        { path: '/user/bookings', component: MyBookings }, // Nieuwe route voor de boekingen van de gebruiker
        { path: '/user/book-campground', component: CampgroundBooking }, // Route voor het boeken van een camping
        { path: '/user/reviews', component: CampgroundReview }, // Route voor het schrijven van een review
        { path: '/admin/dashboard', component: AdminDashboard }, // Route voor het admin dashboard
        { path: '/admin/add-campground', component: AddCampground }, // Route voor het toevoegen van een nieuwe camping
        { path: '/admin/users', component: UserList }, // Route voor het bekijken van alle gebruikers
        { path: '/admin/search-users', component: UserList }, // Route voor het zoeken naar gebruikers
        { path: '/admin/bookings', component: AdminBookings }, // Route voor het beheren van boekingen door de admin
        { path: '/admin/reviews', component: AdminReviews }, // Route voor het beheren van reviews door de admin
        { path: '/campground/detail', component: CampgroundDetail }, // Route voor het bekijken van de details van een camping
        { path: '/admin/update-campground', component: UpdateCampground } // Route voor het updaten van een camping door de admin
    ]
});
