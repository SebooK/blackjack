import './public/style.css'
import './public/card.png'
import App from "./components/app";

const app = new App('div', 'game', 'game');
try {
   app.init();
} catch (e) {
    throw new Error(e)
}







