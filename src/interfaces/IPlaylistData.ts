import {IMusicData} from "./IMusicData";

export interface IPlaylistData {
    id: string;
    name: string;
    description: string;
    numberOfTracks: number;
    thumbnail: string;
    publishedAt: string;
    channelId: string;
    content?: IMusicData[];
}