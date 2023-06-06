import React, { useEffect, useState } from "react";
import {
  Dimensions,
  EmitterSubscription,
  StatusBar as RCStatusBar,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { fetchFollowingUpVideos } from "../service/video";
import { isTablet, isLandscape } from "../utils/uiUtils";
import VideoPlayer from "../components/VideoPlayer";
import VideoPlayerTablet from "../components/VideoPlayerTablet";
import VideoListResponse from "../models/VideoListResponse";
import VideoItem from "../models/VideoItem";

interface Props {
  route: RouteProp<
    {
      params: {
        videoId: string;
        title: string;
        channelId: string;
        channelTitle: string;
      };
    },
    "params"
  >;
  navigation: any;
}

const PlayerScreen: React.FC<Props> = (props) => {
  const isBigScreen = isTablet(Dimensions);
  const videoId = props.route.params.videoId;
  const title = props.route.params.title;
  const channelId = props.route.params.channelId;
  const channelTitle = props.route.params.channelTitle;
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [isDeviceLandscape, setOnLandscape] = useState(isLandscape(Dimensions));
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    setIsPlaying(true);
    (async () => {
      await loadVideos();
    })();
  }, [videoId]);

  useEffect(() => {
    const updateScreenDimensions = () => {
      const isCurrentLandscape = isLandscape(Dimensions);
      setOnLandscape(isCurrentLandscape);
      RCStatusBar.setHidden(isCurrentLandscape && !isBigScreen);
    };

    const subscription: EmitterSubscription = Dimensions.addEventListener(
      "change",
      updateScreenDimensions
    );
    return () => {
      subscription.remove();
      RCStatusBar.setHidden(false);
    };
  }, []);

  const loadVideos = async () => {
    try {
      const relatedVideos: VideoListResponse = await fetchFollowingUpVideos(
        videoId,
        channelId
      );
      setVideos(relatedVideos.items);
    } catch (error) {
      if (__DEV__) {
        console.error(error);
      }
      setErrorOccurred(true);
    }
  };

  const onVideoEnd = () => {
    setIsPlaying(false);
  };

  const replayVideo = () => {
    setIsPlaying(true);
  };

  const retryLoadVideos = () => {
    setErrorOccurred(false);
    (async () => {
      await loadVideos();
    })();
  };

  if (isBigScreen) {
    return (
      <VideoPlayerTablet
        videoId={videoId}
        title={title}
        channelTitle={channelTitle}
        videos={videos}
        screenHeight={Dimensions.get("window").height}
        screenWidth={Dimensions.get("window").width}
        isWideView={isDeviceLandscape}
        isPlaying={isPlaying}
        errorOccurred={errorOccurred}
        onErrorRetryClick={retryLoadVideos}
        onVideoEnd={onVideoEnd}
        onRefresh={replayVideo}
      />
    );
  }
  return (
    <VideoPlayer
      videoId={videoId}
      title={title}
      channelTitle={channelTitle}
      videos={videos}
      isFullScreen={isDeviceLandscape}
      isPlaying={isPlaying}
      errorOccurred={errorOccurred}
      onErrorRetryClick={retryLoadVideos}
      onVideoEnd={onVideoEnd}
      onRefresh={replayVideo}
    />
  );
};

export default PlayerScreen;
