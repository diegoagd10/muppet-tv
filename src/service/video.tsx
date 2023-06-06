import {
  VideoData,
  getVideosIdsApi,
  getUnseenVideosIdsApi,
  getUnseenVideosIdsByChannelIdApi,
} from "../api/ids";
import { getVideosApi } from "../api/video";
import VideoListResponse from "../models/VideoListResponse";

const FOLLOWING_UP_VIDEOS_LIMIT: number = 6;
const RELEATED_VIDEOS_LIMIT: number = 10;

export const fetchHomeVideos = async (
  limit: number,
  skip: number
): Promise<VideoData[]> => {
  return await getVideosIdsApi(limit, skip);
};

export const fetchFollowingUpVideos = async (
  videoId: string,
  channelId: string
): Promise<VideoListResponse> => {
  const relatedVideos: VideoData[] = await getUnseenVideosIdsByChannelIdApi(
    channelId,
    FOLLOWING_UP_VIDEOS_LIMIT
  );
  const relatedVideoIdsSet = new Set(relatedVideos.map((video) => video.docId));
  const videoLimit = relatedVideos.length + RELEATED_VIDEOS_LIMIT;
  const unseenVideos: VideoData[] = (
    await getUnseenVideosIdsApi(videoLimit)
  ).filter((video) => !relatedVideoIdsSet.has(video.docId));
  const mergedVideos: VideoData[] = mergeVideos(relatedVideos, unseenVideos)
    .filter((video) => video.videoId !== videoId)
    .slice(0, RELEATED_VIDEOS_LIMIT);
  return fetchVideosByVideoData(mergedVideos);
};

export const fetchVideosByVideoData = async (videoData: VideoData[]) => {
  const videoIds = videoData.map((video: VideoData) => video.videoId);
  return await getVideosApi(videoIds);
};

const mergeVideos = (
  relatedVideos: VideoData[],
  unseenVideos: VideoData[]
): VideoData[] => {
  const videos: VideoData[] = [];
  while (relatedVideos.length > 0 && unseenVideos.length > 0) {
    if (videos.length % 2 === 0) {
      videos.push(relatedVideos.pop()!);
      continue;
    }
    videos.push(relatedVideos.pop()!);
  }
  while (relatedVideos.length > 0) videos.push(relatedVideos.pop()!);
  while (unseenVideos.length > 0) videos.push(unseenVideos.pop()!);
  return videos;
};
