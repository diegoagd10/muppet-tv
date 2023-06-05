import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import VideoItem from "../models/VideoItem";

interface Props {
  video: VideoItem;
}

const VideoCardContentTallView: React.FC<Props> = ({ video }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: video.snippet.thumbnails.high.url }}
      style={styles.thumbnail}
    />
    <View style={styles.details}>
      <Text style={styles.title}>{video.snippet.title}</Text>
      <Text style={styles.channelTitle}>{video.snippet.channelTitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  thumbnail: {
    height: 180,
    width: "100%",
    marginRight: 10,
  },
  details: {
    flex: 1,
    padding: 5,
    minHeight: 50,
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

export default VideoCardContentTallView;
