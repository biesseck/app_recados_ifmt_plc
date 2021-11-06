import 'dotenv/config';

export default {
  expo: {
    name: "app_recados_ifmt_plc",
    slug: "app_recados_ifmt_plc",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash_ifLogo.png",
      resizeMode: "contain",
      backgroundColor: "#2F9E41"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiKey: "AIzaSyDYIesmw4FstEKJzwIHmMcY-tKGiLe-qcw",
      authDomain: "teste-app-recados-ifmt.firebaseapp.com",
      projectId: "teste-app-recados-ifmt",
      storageBucket: "teste-app-recados-ifmt.appspot.com",
      messagingSenderId: "512511721451",
      appId: "1:512511721451:web:5ec7ca36fde597f1ec63ae"
    }
  }
}
