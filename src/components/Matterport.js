import { SuperViz } from './SuperViz.js';
import { MATTERPORT_KEY } from '../../env.js';

export const MATTERPORT_LOADED = 'matterport_loaded';
export const MATTERPORT_DESTROYED = 'matterport_destroyed';
export const MATTERPORT_TAG_HOVERED = 'matterport_tag_open';
export const MATTERPORT_TAG_CLOSE = 'matterport_tag_close';
export const MATTERPORT_TAG_DOCK = 'matterport_tag_dock';

let model = null;
let showcase = null;
let sdk = null;
let loadListener = null;
let mpSDK = null;

class Matterport {
   constructor() {
      this.contentSection = document.getElementById('world-section');

      // Pubsub - listen for event: When I joined ::
      PubSub.subscribe(SuperViz.MY_PARTICIPANT_JOINED, this.onMyParticipantJoined.bind(this));
   }

   onMyParticipantJoined(e, payload) {
      this.createElement(new URL(document.URL).hash.split('/')[3]);
   }

   createElement(content) {
      showcase = document.createElement('iframe');
      model = content;

      showcase.setAttribute('id', 'showcase');
      showcase.setAttribute('allow', 'xr-spatial-tracking');
      showcase.style.border = 'none';

      this.contentSection.appendChild(showcase);
      showcase.setAttribute('src', this.buildUrl(content));

      loadListener = this.onShowcaseLoad.bind(this);

      showcase.addEventListener('load', loadListener);
   }

   buildUrl(content) {
      const url = new URL(`${window.location.origin}/modules/matterport/matterport_bundle/showcase.html`);

      url.searchParams.set('applicationKey', MATTERPORT_KEY);
      url.searchParams.set('m', content);
      url.searchParams.set('play', 1);
      url.searchParams.set('qs', 1);
      url.searchParams.set('kb', 0);
      url.searchParams.set('brand', 0);
      url.searchParams.set('gt', 0);
      url.searchParams.set('hr', 0);
      url.searchParams.set('mls', 0);
      url.searchParams.set('vr', 0);
      url.searchParams.set('help', 0);
      url.searchParams.set('hl', 2);
      url.searchParams.set('log', 0);
      url.searchParams.set('newtags', 1);
      url.searchParams.set('search', 0);
      url.searchParams.set('title', 0);

      return url.toString();
   }

   async onShowcaseLoad() {
      const iframe = document.getElementById('showcase');
      const MP_SDK = iframe.contentWindow.MP_SDK;

      try {
         sdk = await MP_SDK.connect(iframe, MATTERPORT_KEY, '').then(this.onShowcaseConnect).catch(console.error);
      } catch (e) {
         console.error(e);
         return;
      }
   }

   async onShowcaseConnect(e) {
      PubSub.publish(MATTERPORT_LOADED, { sdk: e, model: model });

      mpSDK = e;
   }

   static get MATTERPORT_LOADED() {
      return MATTERPORT_LOADED;
   }
   static get MATTERPORT_DESTROYED() {
      return MATTERPORT_DESTROYED;
   }
}
export default Matterport;
