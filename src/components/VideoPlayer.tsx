import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import YoutubePlayer from "react-native-youtube-iframe";
import VideoList from "../components/VideoList";
import VideoItem from "../models/VideoItem";

interface Props {
  videoId: string;
  title: string;
  channelTitle: string;
  videos: VideoItem[];
  isPlaying: boolean;
  isFullScreen: boolean;
  onVideoEnd: () => void;
  onRefresh: () => void;
}

const VideoPlayer: React.FC<Props> = ({
  videoId,
  title,
  channelTitle,
  videos,
  isPlaying,
  isFullScreen,
  onVideoEnd,
  onRefresh,
}) => {
  const playerHeight = isFullScreen
    ? Dimensions.get("window").width * 0.5625
    : 240;
  const playerStyle = {
    marginTop: 0,
  };

  const onVideoChangeState = (event: string) => {
    if (event === "ended") {
      onVideoEnd();
    }
  };

  const renderVideoDone = () => {
    const style = {
      ...styles.videoDone,
      minHeight: playerHeight,
      width: "100%",
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
      play={isPlaying}
      videoId={videoId}
      allowWebViewZoom={false}
      onChangeState={onVideoChangeState}
      initialPlayerParams={{ controls: false, rel: false }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={playerStyle}>
          {isPlaying ? renderVideoPlayer() : renderVideoDone()}
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.channelTitle}>{channelTitle}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <VideoList
          idPrefix="player"
          videos={videos}
          isWideView={false}
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
  },
  videoDone: {
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
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

export default VideoPlayer;
