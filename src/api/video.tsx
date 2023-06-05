import VideoListResponse from "../models/VideoListResponse";
import { YOUTUBE_API_KEY, YOUTUBE_API_PREFIX_URL } from "@env";

const API_KEY = YOUTUBE_API_KEY;
const API_PREFIX_URL = YOUTUBE_API_PREFIX_URL;

export const getVideosApi = async (
  videoIds: string[]
): Promise<VideoListResponse> => {
  try {
    const videoIdsParam: string = videoIds.reduce(
      (acc: String, videoId: String) => `${acc}&id=${videoId}`,
      ""
    );
    const url: string = `${API_PREFIX_URL}/videos?part=snippet${videoIdsParam}&key=${API_KEY}`;
    const headers = {
      Accept: "application/json",
    };
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch videos.");
    }
    return await response.json();
  } catch (error) {
    const typedError = error as Error;
    throw new Error("Failed to fetch videos: " + typedError.message);
  }
};
