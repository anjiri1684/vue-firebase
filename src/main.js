import { createApp } from 'vue';
import router from './router.js';
import App from "./App.vue"
import store from './store/index.js';
import BaseCard from "./components/ui/BaseCard.vue"
import BaseButton from "./components/ui/BaseButton.vue"
import BaseBudge from './components/ui/BaseBudge.vue'
import BaseSpinner from "./components/ui/BaseSpinner.vue"
import BaseDialog from "./components/ui/BaseDialog.vue"

const app = createApp(App)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-budge', BaseBudge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.use(router)
app.use(store)

app.mount('#app');
