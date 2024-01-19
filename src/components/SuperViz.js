import { DEVELOPER_KEY } from '../../env.js';
import Matterport from './Matterport.js';

const SuperViz = (function () {
   // let ::
   let sdk = null;
   let room = null;
   let plugin = null;
   let video = null;
   let matterportPluginInstance = null;
   // Consts ::
   const MY_PARTICIPANT_JOINED_SDK = 'my_participant_joined';
   const CONTENT_CHANGED_SDK = 'content_changed';
   const PARTICIPANT_AMOUNT_UPDATE_SDK = 'participant_amount_update';
   const MEETING_HOST_CHANGE_SDK = 'host_change';
   const MEETING_TIME_SDK = 'meeting_time';
   const MY_PARTICIPANT_LEFT_SDK = 'participant_left';

   const initSDK = async function (userId, roomid, name, userType) {
      room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
         roomId: roomid,
         group: {
            id: '<GROUP-ID>',
            name: '<GROUP-NAME>',
         },
         participant: {
            id: userId,
            name: name,
         },
      });

      PubSub.subscribe(Matterport.MATTERPORT_LOADED, loadPluginSDK);

      room.subscribe(SuperVizRoom.ParticipantEvent.LOCAL_JOINED, onParticipantLocalJoin);
   };

   const onParticipantLocalJoin = function (participant) {
      video = new window.SuperVizRoom.VideoConference({
         participantType: 'host',
         defaultAvatars: true,
         enableFollow: true,
         enableGather: true,
         enableGoTo: true,
         collaborationMode: {
            enable: true,
            modalPosition: 'center',
         },
         offset: {
            top: 41,
            bottom: 0,
            left: 0,
            right: 0,
         },
      });

      video.subscribe(SuperVizRoom.MEETING_PARTICIPANT_AMOUNT_UPDATE, onParticipantAmountUpdate);
      video.subscribe('my-participant.joined', onMyParticipantJoined);

      video.subscribe('my-participant.left', onParticipantLeft);

      room.addComponent(video);
   };

   const onMyParticipantJoined = function (participant) {
      // publish that I've connected ::
      PubSub.publish(MY_PARTICIPANT_JOINED_SDK, { room: room, participant: participant });
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

      matterportPluginInstance = new Presence3D(payload.sdk, {
         isAvatarsEnabled: true,
         isLaserEnabled: true,
         isNameEnabled: true,
         avatarConfig: {},
      });

      room.addComponent(matterportPluginInstance);
   };

   // Public
   return {
      init: (userId, roomid, name, userType) => initSDK(userId, roomid, name, userType),
      MY_PARTICIPANT_JOINED: MY_PARTICIPANT_JOINED_SDK,
      CONTENT_CHANGED: CONTENT_CHANGED_SDK,
      PARTICIPANT_AMOUNT_UPDATE: PARTICIPANT_AMOUNT_UPDATE_SDK,
      MEETING_HOST_CHANGE: MEETING_HOST_CHANGE_SDK,
      MEETING_TIME: MEETING_TIME_SDK,
      MY_PARTICIPANT_LEFT: MY_PARTICIPANT_LEFT_SDK,
   };
})();

export { SuperViz };
