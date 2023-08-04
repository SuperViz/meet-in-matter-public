import Router from '../router/Router.js';

const NAME = 'ended';
class Ended {
   constructor() {
      this.endedSection = document.getElementById('ended-section');

      this.endedSection.querySelector('.feedback').addEventListener('click', function () {
         window.open('https://docs.google.com/forms/d/e/1FAIpQLSfi1_F38row2CsxasyMkSGsWcpnM6v8APHL7Z2Hy8ICjn1uRA/viewform');
      });

      this.endedSection.querySelector('.meeting').addEventListener('click', function () {
         window.location = '/';
      });

      PubSub.subscribe(Router.ROUTE_CHANGED, this.onRouteChanged.bind(this));
   }

   onRouteChanged(e, payload) {
      if (payload.page === NAME) this.endedSection.classList.add('visible');
   }

   static get NAME() {
      return NAME;
   }
}
export default Ended;
