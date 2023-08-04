import { DEVELOPER_KEY } from '../../env.js';
import Matterport from './Matterport.js';

const SuperViz = (function () {
   // let ::
   let sdk = null;
   let plugin = null;
   let matterportPluginInstance = null;
   // Consts ::
   const MY_PARTICIPANT_JOINED_SDK = 'my_participant_joined';
   const CONTENT_CHANGED_SDK = 'content_changed';
   const PARTICIPANT_AMOUNT_UPDATE_SDK = 'participant_amount_update';
   const MEETING_HOST_CHANGE_SDK = 'host_change';
   const MEETING_TIME_SDK = 'meeting_time';
   const MY_PARTICIPANT_LEFT_SDK = 'participant_left';

   const initSDK = async function (userId, roomid, name, userType) {
      sdk = await SuperVizSdk.init(DEVELOPER_KEY, {
         group: {
            id: '<GROUP-ID>',
            name: '<GROUP-NAME>',
         },
         participant: {
            id: userId,
            name: name,
            type: 'host',
         },
         roomId: roomid,
         defaultAvatars: true,
         enableFollow: true,
         enableGoTo: true,
         enableGather: true,
         camsOff: false,
         layoutPosition: 'center',
         camerasPosition: 'right',
         offset: {
            top: 41,
            bottom: 0,
            left: 0,
            right: 0,
         },
      });

      // Pubsub - listen for event: Matterport loaded & unloaded ::
      PubSub.subscribe(Matterport.MATTERPORT_LOADED, loadPluginSDK);
      PubSub.subscribe(Matterport.MATTERPORT_DESTROYED, unloadPluginSDK);

      sdk.subscribe(SuperVizSdk.MeetingEvent.MEETING_PARTICIPANT_AMOUNT_UPDATE, onParticipantAmountUpdate);
      sdk.subscribe(SuperVizSdk.MeetingEvent.MY_PARTICIPANT_JOINED, onMyParticipantJoined);

      sdk.subscribe(SuperVizSdk.MeetingEvent.MY_PARTICIPANT_LEFT, onParticipantLeft);
      sdk.subscribe(SuperVizSdk.MeetingEvent.MEETING_HOST_CHANGE, onMeetingHostDidChange);
   };

   const onMeetingHostDidChange = function (participant) {
      // host changed ::
   };

   const onMyParticipantJoined = function (participant) {
      // publish that I've connected ::
      PubSub.publish(MY_PARTICIPANT_JOINED_SDK, { sdk: sdk, participant: participant });
   };

   const onParticipantLeft = function (participant) {
      // publish that I've left ::
      PubSub.publish(MY_PARTICIPANT_LEFT_SDK);
   };

   const onParticipantAmountUpdate = function (count) {
      PubSub.publish(PARTICIPANT_AMOUNT_UPDATE_SDK, count);
   };

   const loadPluginSDK = function (e, payload) {
      // App is ready and I'm connected to the SDK. Now init the Plugin ::
      plugin = new window.MatterportPlugin(payload.sdk);

      matterportPluginInstance = sdk.loadPlugin(plugin, {
         avatarConfig: {},
         isAvatarsEnabled: true,
         isLaserEnabled: true,
         isNameEnabled: true,
      });
   };

   const unloadPluginSDK = function () {
      sdk.unloadPlugin();
   };

   // Public
   return {
      init: (userId, roomid, name, userType) => initSDK(userId, roomid, name, userType),
      unloadPlugin: () => unloadPluginSDK(),
      MY_PARTICIPANT_JOINED: MY_PARTICIPANT_JOINED_SDK,
      CONTENT_CHANGED: CONTENT_CHANGED_SDK,
      PARTICIPANT_AMOUNT_UPDATE: PARTICIPANT_AMOUNT_UPDATE_SDK,
      MEETING_HOST_CHANGE: MEETING_HOST_CHANGE_SDK,
      MEETING_TIME: MEETING_TIME_SDK,
      MY_PARTICIPANT_LEFT: MY_PARTICIPANT_LEFT_SDK,
   };
})();

export { SuperViz };
