import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  YOUTUBE_API_KEY,
  YOUTUBE_API_PREFIX_URL,
} from "@env";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface YoutubeApiConfig {
  apiKey: string;
  apiPrefixUrl: string;
}

interface Config {
  firebase: FirebaseConfig;
  youtubeApi: YoutubeApiConfig;
}

const config: Config = {
  firebase: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
  },
  youtubeApi: {
    apiKey: YOUTUBE_API_KEY,
    apiPrefixUrl: YOUTUBE_API_PREFIX_URL,
  },
};

export default config as Config;
