import Router from '../router/Router.js';

const NAME = 'home';

let input = null;
let submitButton = null;
let head = null;
let formId = null;
let pattern1 = /^(https:\/\/(my\.matterport\.com\/show\/\?m=|matterport\.com\/discover\/space\/)).+$/i;
var pattern2 = /^([A-Za-z0-9]{11})$/i;
let error =
   'URL is invalid! Use the formats [ModelID] or "https://matterport.com/discover/space/[ModelID]" or "https://my.matterport.com/show/?m=[MODELID]"';
let meetingUrl = '/#/meet/';
let meetingGenerated = false;
let meetingID = null;
let model = null;
let schedule = null;
let animation;

class Home {
   constructor() {
      this.homeSection = document.getElementById('home');
      input = document.getElementById('urlInput');
      submitButton = document.getElementById('submit');
      head = document.getElementById('head');
      formId = document.getElementById('formId');
      schedule = document.getElementById('schedule');

      animation = this.generateMeetingLink.bind(this);

      formId.addEventListener('animationend', animation);

      input.addEventListener('focus', function () {
         if (this.value === 'Tour link') {
            this.value = '';
            this.classList.remove('default');
         }
      });

      input.addEventListener('blur', function () {
         if (this.value === '') {
            this.value = 'Tour link';
            this.classList.add('default');
         }
      });

      document.getElementById('submit').addEventListener('click', this.submit.bind(this));

      PubSub.subscribe(Router.ROUTE_CHANGED, this.onRouteChanged.bind(this));
   }

   onRouteChanged(e, payload) {
      if (payload.page === 'home') {
         this.homeSection.classList.add('visible');
      } else {
         if (this.homeSection) this.homeSection.remove();
      }
   }

   onSchedule(e) {
      e.preventDefault();

      alert('Copy the link to invite others to join you.');
   }

   endAnimation() {
      this.generateMeetingLink();
   }

   submit(e) {
      e.preventDefault();

      if (!meetingGenerated) {
         if (pattern1.test(input.value) || pattern2.test(input.value)) {
            formId.classList.add('fade-out');
            return true;
         } else {
            alert(error);
            return false;
         }
      } else {
         window.location = input.value;
      }
   }

   generateMeetingLink() {
      formId.removeEventListener('animationend', animation);

      if (input.value.indexOf('https://my.matterport.com/show') > -1) {
         model = input.value.split('/')[4].split('=')[1];
      } else if (input.value.indexOf('https://matterport.com/discover/space/') > -1) {
         model = input.value.split('/')[5];
      } else {
         model = input.value;
      }

      input.value = location.protocol + '//' + location.host + meetingUrl + this.generateUnique() + '/' + model;

      schedule.classList.add('visible');
      submitButton.innerHTML = 'START';
      head.innerHTML = 'Meeting ready! Copy the link to invite others to join you.';
      formId.classList.remove('fade-out');
      formId.classList.add('fade-in');
      schedule.addEventListener('click', this.onSchedule.bind(this));
      meetingGenerated = true;
   }

   generateUnique() {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

      for (let i = 0; i < 6; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
   }
}
export default Home;
