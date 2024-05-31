import Vue from 'vue';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import RDS from "@sysvale/cuida";

createApp(App)
    .use(RDS) // there
    .mount('#app')