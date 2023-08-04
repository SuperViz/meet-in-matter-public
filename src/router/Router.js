let routes = {};
let templates = {};
let meetingID = null;

export const ROUTE_CHANGED = 'route_changed';

class Router {
   constructor() {
      this.template('home', this.home.bind(this));
      this.template('meet', this.meeting.bind(this));
      this.template('thanks', this.thanks.bind(this));
      this.template('ended', this.ended.bind(this));

      this.route('/', 'home');
      this.route('/meet', 'meet');
      this.route('/thanks', 'thanks');
      this.route('/ended', 'ended');

      window.addEventListener('load', this.router.bind(this));
      window.addEventListener('hashchange', this.router.bind(this));
   }

   init() {}

   home() {
      PubSub.publish(ROUTE_CHANGED, { page: 'home', id: meetingID });
   }

   meeting() {
      PubSub.publish(ROUTE_CHANGED, { page: 'meet', id: meetingID });
   }

   thanks() {
      PubSub.publish(ROUTE_CHANGED, { page: 'thanks', id: meetingID });
   }

   ended() {
      PubSub.publish(ROUTE_CHANGED, { page: 'ended', id: meetingID });
   }

   route(path, template) {
      if (typeof template === 'function') {
         return (routes[path] = template);
      } else if (typeof template === 'string') {
         return (routes[path] = templates[template]);
      } else {
         return;
      }
   }

   template(name, templateFunction) {
      return (templates[name] = templateFunction);
   }

   resolveRoute(route) {
      try {
         return routes[route];
      } catch (e) {
         throw new Error(`Route ${route} not found`);
      }
   }

   router(evt) {
      let url = window.location.hash.slice(1) || '/';

      let parts = window.location.hash.split('/');

      if (parts[1] == undefined) parts[1] = '';

      if (parts[1] != '' && parts[1] == 'meet') {
         meetingID = parts[2];
      }

      let route = this.resolveRoute('/' + parts[1]);

      route();
   }

   static get ROUTE_CHANGED() {
      return ROUTE_CHANGED;
   }
}
export default Router;
