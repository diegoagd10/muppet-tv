import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
} from "react-native";
import VideoItem from "../models/VideoItem";
import VideoCardTablet from "./VideoCardTablet";

interface Props {
  idPrefix: string;
  videos: VideoItem[];
  shouldLoadMore: boolean;
  widthCard?: number;
  loadVideos?: () => void;
}

const VideoListGrid: React.FC<Props> = ({
  idPrefix,
  videos,
  shouldLoadMore = true,
  widthCard,
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
    <View style={styles.container}>
      <FlatList
        data={videos}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(video: VideoItem) =>
          `${idPrefix}_${video.id.toString()}`
        }
        renderItem={({ item }: ListRenderItemInfo<VideoItem>) => (
          <VideoCardTablet video={item} width={widthCard} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});

export default VideoListGrid;
