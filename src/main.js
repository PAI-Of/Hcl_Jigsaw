import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Styles
import './styles/variables.css';
import './styles/main.css';
import './styles/layout.css';
import './styles/components.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
