function calculateDrift(trackers, policyText) {
   const trackerCount = trackers.length;
   
   if (policyText === "Policy not found") {
      return trackerCount > 0 ? 70 : 20;
   }

   const privacyKeywords = [
      "no tracking", "do not track", "no third party", "no cookies",
      "no data collection", "no analytics"
   ];
   
   const hasStrictClaims = privacyKeywords.some(keyword => policyText.includes(keyword));
   
   if (trackerCount === 0) {
      return 0;
   }
   
   if (hasStrictClaims && trackerCount > 0) {
      return Math.min(90, 60 + trackerCount * 5);
   }
   
   return Math.min(80, 20 + trackerCount * 3);
}

module.exports = calculateDrift;
