import VideoListResponse from "../models/VideoListResponse";
import Config from "../utils/config";

export const getVideosApi = async (
  videoIds: string[]
): Promise<VideoListResponse> => {
  try {
    const videoIdsParam: string = videoIds.reduce(
      (acc: String, videoId: String) => `${acc}&id=${videoId}`,
      ""
    );
    const url: string = `${Config.youtubeApi.apiPrefixUrl}/videos?part=snippet${videoIdsParam}&key=${Config.youtubeApi.apiKey}`;
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
