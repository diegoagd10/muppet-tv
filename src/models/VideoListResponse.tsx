import PageInfo from "./PageInfo";
import VideoItem from "./VideoItem";

export default interface VideoListResponse {
  kind?: string;
  etag?: string;
  items: VideoItem[];
  pageInfo?: PageInfo;
}
