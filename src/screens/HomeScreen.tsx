import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  EmitterSubscription,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { VideoData } from "../api/ids";
import { fetchHomeVideos, fetchVideosByVideoData } from "../service/video";
import VideoItem from "../models/VideoItem";
import RetryWrapper from "../components/RetryWrapper";
import VideoList from "../components/VideoList";
import VideoListGrid from "../components/VideoListGrid";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getOrientation, isTablet } from "../utils/uiUtils";
import Orientation from "../models/Orientation";

const HomeScreen: React.FC = () => {
  const isBigScreen = isTablet(Dimensions);
  const limit = isBigScreen ? 20 : 10;
  const [skip, setSkip] = useState<number>(0);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [stopLoading, setStopLoading] = useState<boolean>(false);
  const [widthCard, setWidthCard] = useState<number>(
    Dimensions.get("window").width / 2
  );
  const [orientation, setOrientation] = useState<Orientation>(
    getOrientation(Dimensions)
  );

  useEffect(() => {
    const onDimensionsChanged = () => {
      setOrientation(getOrientation(Dimensions));
      setWidthCard(Dimensions.get("window").width / 2);
    };

    const subscription: EmitterSubscription = Dimensions.addEventListener(
      "change",
      onDimensionsChanged
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const refreshVideos = () => {
    setSkip(0);
    setVideos([]);
    setStopLoading(false);
    setErrorOccurred(false);
  };

  const loadVideos = async () => {
    try {
      const videoData: VideoData[] = await fetchHomeVideos(limit, skip);
      if (videoData.length === 0) {
        setStopLoading(true);
        return;
      }
      const videosResponse = await fetchVideosByVideoData(videoData);
      const finalVideos = [...videos, ...videosResponse.items];
      setSkip(skip + limit);
      setVideos(finalVideos);
    } catch (error) {
      if (__DEV__) {
        console.error(error);
      }
      setErrorOccurred(true);
    }
  };

  const renderVideoList = () => {
    if (isBigScreen) {
      return (
        <VideoListGrid
          videos={videos}
          idPrefix="home"
          loadVideos={loadVideos}
          widthCard={widthCard}
          stopLoading={stopLoading}
        />
      );
    }
    return (
      <VideoList
        videos={videos}
        idPrefix="home"
        loadVideos={loadVideos}
        isWideView={orientation === Orientation.Landscape}
        stopLoading={stopLoading}
      />
    );
  };

  const headerStyle = { ...styles.header, marginTop: 0 };

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyle}>
        <TouchableWithoutFeedback onPress={refreshVideos}>
          <Text style={{ fontSize: 20, color: "#000" }}>
            <Icon name="play" color="#000" size={20} /> Kids TV
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <RetryWrapper showError={errorOccurred} onRetryClick={refreshVideos}>
        {renderVideoList()}
      </RetryWrapper>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 1,
    minHeight: 60,
    maxHeight: 60,
    backgroundColor: "#4baa3e",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
