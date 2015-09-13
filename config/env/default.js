'use strict';

module.exports = {
  app: {
    title: 'Vidly.io',
    description: 'Host and share your videos!',
    keywords: 'vidly, video hosting, videos, video sharing',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 61337,
  templateEngine: 'swig',
  // Session details
  // session expiration is set by default to 24 hours
  sessionExpiration: 24 * (60 * 60 * 1000),
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: 'MEAN',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  logo: 'modules/core/client/img/brand/logo.png',
  favicon: 'modules/core/client/img/brand/favicon.ico',
  image: 'modules/core/client/img/brand/logo.png'
};
