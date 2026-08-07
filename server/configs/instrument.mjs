import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://69c647368f2cc72f19c2f354385f359d@o4511869727932416.ingest.de.sentry.io/4511869849698384",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});