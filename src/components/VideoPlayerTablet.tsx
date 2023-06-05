import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import VideoItem from "../models/VideoItem";
import VideoList from "./VideoList";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  videoId: string;
  title: string;
  channelTitle: string;
  videos: VideoItem[];
  screenHeight: number;
  screenWidth: number;
  isWideView: boolean;
  isPlaying: boolean;
  onVideoEnd: () => void;
  onRefresh: () => void;
}

const VideoPlayerTablet: React.FC<Props> = ({
  videoId,
  title,
  channelTitle,
  videos,
  screenHeight,
  screenWidth,
  isWideView,
  isPlaying,
  onVideoEnd,
  onRefresh,
}) => {
  const wideWidth = screenWidth * 0.7;
  const wideHeight = screenHeight * 0.65;
  const playerHeight: number = isWideView ? wideHeight : 450;
  const playerWidth: number | undefined = isWideView ? wideWidth : undefined;
  const containerStyle = isWideView
    ? styles.containerWideView
    : styles.container;
  const playerStyle = { marginTop: 0, height: playerHeight };

  const onVideoChangeState = (event: string) => {
    if (event === "ended") {
      onVideoEnd();
    }
  };

  const renderVideoDone = () => {
    const style = {
      ...styles.videoDone,
      minHeight: playerHeight,
      minWidth: playerWidth,
    };
    return (
      <View style={style}>
        <TouchableWithoutFeedback onPress={onRefresh}>
          <Icon name="sync" color="#fff" size={100} />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderVideoPlayer = () => (
    <YoutubePlayer
      height={playerHeight}
      width={playerWidth}
      play={isPlaying}
      videoId={videoId}
      allowWebViewZoom={false}
      onChangeState={onVideoChangeState}
      initialPlayerParams={{ controls: false, rel: false }}
    />
  );

  return (
    <SafeAreaView style={containerStyle}>
      <View>
        <View style={playerStyle}>
          {isPlaying ? renderVideoPlayer() : renderVideoDone()}
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.channelTitle}>{channelTitle}</Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        <VideoList
          idPrefix="player"
          videos={videos}
          isWideView={isWideView ? false : true}
          shouldLoadMore={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  videoDone: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
  },
  containerWideView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 0,
  },
  details: {
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  channelTitle: {
    fontSize: 14,
    color: "#666666",
  },
});

export default VideoPlayerTablet;
