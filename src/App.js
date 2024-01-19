import Matterport, { MATTERPORT_TAG_HOVERED } from './components/Matterport.js';
import { SuperViz } from './components/SuperViz.js';
import Router from './router/Router.js';

const url = new URL(document.URL);
let limit = 60;

let userType;
let userId = Date.now().toPrecision(20);
let superviz_sdk;
let currentContent;
let timeEntered;
let timer;
let timeIsUp = false;

class App {
   constructor() {
      this.contentSection = document.getElementById('world-section');
      this.loaderSection = document.getElementById('loader-section');
      this.headerSection = document.getElementById('header');
      this.meetingtime = document.getElementById('meetingtime');
      this.headerSection.addEventListener('click', this.clickInvite.bind(this));

      PubSub.subscribe(Router.ROUTE_CHANGED, this.changePage.bind(this));
   }

   clickInvite() {
      alert('Copy and send the link in the URL to invite others to join you.');
   }

   changePage(e, payload) {
      switch (payload.page) {
         case 'meet':
            this.loaderSection.classList.add('visible');
            this.headerSection.classList.add('visible');

            this.init(payload.id);
            break;
         case 'home':
            if (!document.getElementById('home')) location.reload();
            break;
         case 'thanks':
            clearInterval(timer);
            if (this.contentSection) this.contentSection.remove();
            if (this.headerSection) this.headerSection.remove();

            break;
         case 'ended':
            clearInterval(timer);
            if (this.contentSection) this.contentSection.remove();
            if (this.headerSection) this.headerSection.remove();

            break;
         default:
            console.log(`Sorry, we are out of.`);
      }
   }

   init(id) {
      // Initilize the SDK ::
      SuperViz.init(userId, id, ' ');

      // Pubsub - listen for event: When I joined ::
      PubSub.subscribe(SuperViz.MY_PARTICIPANT_JOINED, this.onMyParticipantJoined.bind(this));
      PubSub.subscribe(SuperViz.MY_PARTICIPANT_LEFT, this.onMyParticipantLeft.bind(this));
      PubSub.subscribe(SuperViz.MEETING_HOST_CHANGE, this.onMeetingHostChange.bind(this));
   }

   onMeetingHostChange(e, payload) {
      if (payload[0].participantId == userId) {
         this.isHost = true;
      } else {
         this.isHost = false;
      }
   }

   onMyParticipantLeft(e) {
      window.location = '/#/thanks';
      superviz_sdk.destroy();
   }

   onMyParticipantJoined(e, payload) {
      superviz_sdk = payload.room;

      // show content ::
      this.loaderSection.classList.add('hide');
      this.contentSection.classList.remove('hide');

      this.headerSection.classList.add('joined');
   }

   updateCounter() {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = now - timeEntered;

      // Time calculations for days, hours, minutes and seconds
      let hours = Math.floor((distance % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished, write some text
      if (hours > 0) {
         clearInterval(timer);
         superviz_sdk.destroy();
         window.location = '/#/ended';
      }

      if (minutes < 10) minutes = '0' + minutes;
      if (seconds < 10) seconds = '0' + seconds;

      meetingtime.innerHTML = minutes + ':' + seconds;
   }
}
export default App;
