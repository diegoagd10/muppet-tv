import Snippet from "./Snippet";

export default interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}
