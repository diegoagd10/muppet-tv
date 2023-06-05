import { FirebaseApp, initializeApp } from "firebase/app";
import {
  DocumentData,
  Firestore,
  QuerySnapshot,
  collection,
  getDocs,
  getFirestore,
  query,
  limit,
  doc,
  updateDoc,
  increment,
  where,
  documentId,
  DocumentReference,
  orderBy,
} from "firebase/firestore";
import Config from "../utils/config";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Config.firebase.apiKey,
  authDomain: Config.firebase.authDomain,
  projectId: Config.firebase.projectId,
  storageBucket: Config.firebase.storageBucket,
  messagingSenderId: Config.firebase.messagingSenderId,
  appId: Config.firebase.appId,
};

const firebase: FirebaseApp = initializeApp(firebaseConfig);
const database: Firestore = getFirestore(firebase);

interface VideoData {
  docId: string;
  videoId: string;
  channelId: string;
}

const cache: string[] = [];

const getVideosIdsApi = async (
  limit: number,
  skip: number
): Promise<VideoData[]> => {
  try {
    if (skip == 0) {
      cache.length = 0;
      const videosIds: string[] = await fetchVideosDocIds();
      cache.push(...videosIds);
    }
    const newSkip: number = skip + limit;
    const sliceEnd: number = newSkip >= cache.length ? cache.length : newSkip;
    const docIds: string[] = cache.slice(skip, sliceEnd);
    return docIds.length > 0 ? await fetchVideosIds(docIds) : [];
  } catch (error) {
    const typedError = error as Error;
    throw new Error("Failed to fetch ids: " + typedError.message);
  }
};

const fetchVideosDocIds = async (): Promise<string[]> => {
  const result: QuerySnapshot<DocumentData> = await getDocs(
    query(collection(database, "videos"), orderBy("views", "asc"), limit(30))
  );
  const docIds: string[] = [];
  result.forEach((document: DocumentData) => {
    docIds.push(document.id);
  });
  return docIds;
};

const fetchVideosIds = async (docIds: string[]): Promise<VideoData[]> => {
  const result: QuerySnapshot<DocumentData> = await getDocs(
    query(collection(database, "videos"), where(documentId(), "in", docIds))
  );
  return mapQuerySnapshotToVideoData(result);
};

const getUnseenVideosIdsApi = async (
  maxLimit: number
): Promise<VideoData[]> => {
  const result: QuerySnapshot<DocumentData> = await getDocs(
    query(
      collection(database, "videos"),
      orderBy("views", "asc"),
      limit(maxLimit)
    )
  );
  return mapQuerySnapshotToVideoData(result);
};

const getUnseenVideosIdsByChannelIdApi = async (
  channelId: string,
  maxLimit: number
): Promise<VideoData[]> => {
  try {
    const result: QuerySnapshot<DocumentData> = await getDocs(
      query(
        collection(database, "videos"),
        where("channelId", "==", channelId),
        orderBy("views", "asc"),
        limit(maxLimit)
      )
    );
    return mapQuerySnapshotToVideoData(result);
  } catch (error) {
    const typedError = error as Error;
    throw new Error("Failed to fetch ids: " + typedError.message);
  }
};

const mapQuerySnapshotToVideoData = (
  result: QuerySnapshot<DocumentData>
): VideoData[] => {
  const videos: VideoData[] = [];
  result.forEach((document: DocumentData) => {
    const videoData = document.data();
    videos.push({
      docId: document.id,
      videoId: videoData.videoId,
      channelId: videoData.channelId,
    });
  });
  return videos;
};

const incrementViews = async (videoId: string): Promise<void> => {
  try {
    const result: QuerySnapshot<DocumentData> = await getDocs(
      query(collection(database, "videos"), where("videoId", "==", videoId))
    );
    Promise.all(
      result.docs.map(async (document: DocumentData) => {
        const videoRef: DocumentReference<DocumentData> = doc(
          database,
          "videos",
          document.id
        );
        return await updateDoc(videoRef, {
          views: increment(1),
        });
      })
    );
  } catch (error) {
    const typedError = error as Error;
    throw new Error("Failed to fetch ids: " + typedError.message);
  }
};

export {
  getVideosIdsApi,
  getUnseenVideosIdsApi,
  getUnseenVideosIdsByChannelIdApi,
  incrementViews,
  VideoData,
};
