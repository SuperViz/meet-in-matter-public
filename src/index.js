import Router from './router/Router.js';
import Home from './components/Home.js';
import Matterport from './components/Matterport.js';
import Thanks from './components/Thanks.js';
import Ended from './components/Ended.js';
import App from './App.js';

const router = new Router();
const home = new Home();
const app = new App();
const matterport = new Matterport();
const thanks = new Thanks();
const ended = new Ended();
