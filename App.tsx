import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  EmitterSubscription,
  ScaledSize,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

function verifyIfIsLandscape(): boolean {
  const screenDimensions: ScaledSize = Dimensions.get("window");
  return screenDimensions.height < screenDimensions.width;
}

export default function App() {
  const [isLandscape, setIsLandscape] = useState(verifyIfIsLandscape());

  useEffect(() => {
    const updateScreenDimensions = () => {
      setIsLandscape(verifyIfIsLandscape());
      StatusBar.setHidden(verifyIfIsLandscape());
    };

    const subscription: EmitterSubscription = Dimensions.addEventListener(
      "change",
      updateScreenDimensions
    );
    return () => {
      subscription.remove();
      StatusBar.setHidden(false);
    };
  }, []);

  const additionalStyles = isLandscape
    ? { marginTop: 0 }
    : { marginTop: StatusBar.currentHeight || 0 };

  return (
    <SafeAreaView style={[styles.container, additionalStyles]}>
      <YoutubePlayer
        height={600}
        play={true}
        videoId={"6dR-Kx9ZA3s"}
        webViewProps={{ allowsFullscreenVideo: true }}
        forceAndroidAutoplay={true}
        initialPlayerParams={{ controls: false, loop: true, rel: false }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
