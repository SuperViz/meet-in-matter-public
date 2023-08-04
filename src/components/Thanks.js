import Router from '../router/Router.js';

const NAME = 'thanks';
class Thanks {
   constructor() {
      this.thanksSection = document.getElementById('thanks-section');

      this.thanksSection.querySelector('.feedback').addEventListener('click', function () {
         window.open('https://docs.google.com/forms/d/e/1FAIpQLSfi1_F38row2CsxasyMkSGsWcpnM6v8APHL7Z2Hy8ICjn1uRA/viewform');
      });

      this.thanksSection.querySelector('.meeting').addEventListener('click', function () {
         window.location = '/';
      });

      PubSub.subscribe(Router.ROUTE_CHANGED, this.onRouteChanged.bind(this));
   }

   onRouteChanged(e, payload) {
      if (payload.page === NAME) this.thanksSection.classList.add('visible');
   }

   static get NAME() {
      return NAME;
   }
}
export default Thanks;
