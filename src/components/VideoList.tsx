import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import VideoItem from "../models/VideoItem";
import VideoCard from "./VideoCard";

interface Props {
  idPrefix: string;
  videos: VideoItem[];
  isWideView: boolean;
  shouldLoadMore: boolean;
  loadVideos?: () => void;
}

const VideoList: React.FC<Props> = ({
  idPrefix,
  videos,
  isWideView,
  shouldLoadMore = true,
  loadVideos,
}) => {
  const loadMore = () => {
    if (loadVideos && shouldLoadMore) {
      loadVideos();
    }
  };

  const renderFooter = () => {
    if (!shouldLoadMore) {
      return null;
    }
    return (
      <ActivityIndicator size="large" color="#AEAEAE" style={styles.spinner} />
    );
  };

  return (
    <FlatList
      data={videos}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(video: VideoItem) => `${idPrefix}_${video.id.toString()}`}
      renderItem={({ item }: ListRenderItemInfo<VideoItem>) => (
        <VideoCard video={item} isWideView={isWideView} />
      )}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {},
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});

export default VideoList;
