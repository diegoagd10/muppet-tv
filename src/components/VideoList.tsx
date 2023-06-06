import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Platform,
} from "react-native";
import VideoItem from "../models/VideoItem";
import VideoCard from "./VideoCard";
import Spinner from "./Spinner";

interface Props {
  idPrefix: string;
  videos: VideoItem[];
  isWideView: boolean;
  stopLoading?: boolean;
  loadVideos?: () => void;
}

const VideoList: React.FC<Props> = ({
  idPrefix,
  videos,
  isWideView,
  stopLoading = false,
  loadVideos,
}) => {
  const loadMore = () => {
    if (stopLoading) {
      return;
    }
    loadVideos && loadVideos();
  };

  const renderFooter = () => {
    return stopLoading ? null : <Spinner />;
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
