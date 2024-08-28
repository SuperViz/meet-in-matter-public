let isAndroid;
let isIos;
let isOpera;
let isWindows;
let isSSR;
let isMobile;
let isDesktop;

const DetectDevice = (function () {
   const detect = function (userAgent) {
      console.log('IN');
      isAndroid = Boolean(userAgent.match(/Android/i));
      isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
      isOpera = Boolean(userAgent.match(/Opera Mini/i));
      isWindows = Boolean(userAgent.match(/IEMobile/i));
      isSSR = Boolean(userAgent.match(/SSR/i));
      isMobile = isAndroid || isIos || isOpera || isWindows;
      isDesktop = !isMobile && !isSSR;

      return {
         isAndroid,
         isIos,
         isOpera,
         isWindows,
         isSSR,
         isMobile,
         isDesktop,
      };
   };

   const newMobileDetector = () => {
      const cache = {};
      return {
         detect: (userAgent) => {
            if (cache[userAgent]) return cache[userAgent];
            const result = detect(userAgent);
            cache[userAgent] = result;
            return result;
         },
      };
   };
   const mobileDetector = newMobileDetector();

   const useMobileDetect = function () {
      const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
      return mobileDetector.detect(userAgent);
   };

   return {
      Detect: () => useMobileDetect(),
      detectIsMobile: isMobile,
   };
})();

export { DetectDevice };
