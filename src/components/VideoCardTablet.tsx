import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import VideoItem from "../models/VideoItem";
import { incrementViews } from "../api/ids";

interface Props {
  video: VideoItem;
  width?: number;
}

const VideoCardTablet: React.FC<Props> = ({ video, width }) => {
  const navigation = useNavigation();
  const goToPlayerScreen = async () => {
    await incrementViews(video.id);
    navigation.navigate("Player", {
      videoId: video.id,
      title: video.snippet.title,
      channelId: video.snippet.channelId,
      channelTitle: video.snippet.channelTitle,
    });
  };

  const cardStyle = width ? { ...styles.card, maxWidth: width } : styles.card;

  return (
    <TouchableWithoutFeedback onPress={goToPlayerScreen}>
      <View style={cardStyle}>
        <Image
          source={{ uri: video.snippet.thumbnails.high.url }}
          style={styles.thumbnail}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{video.snippet.title}</Text>
          <Text style={styles.channelTitle}>{video.snippet.channelTitle}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  thumbnail: {
    height: 120,
    width: 180,
    marginRight: 10,
    borderRadius: 10,
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

export default VideoCardTablet;
