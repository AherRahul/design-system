import Vue from 'vue';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Cuida from "@sysvale/cuida";

createApp(App)
    .use(Cuida) // there
    .mount('#app')