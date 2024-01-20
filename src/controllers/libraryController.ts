import {Request, Response} from "express";
import {apiOptions, apiEndPoints} from "../helpers/ApiEndPoints";
import {fetchHelper} from "../helpers/fetchHelper";
import {IPlaylistData} from "../interfaces/IPlaylistData";
const getLibrary = async (req: Request, res: Response) => {

    // how to get token from request
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({error: "Unauthorized"});
        return;
    }
    console.log("token: ", token);





    // Fetch playlist of user
    const rawLibUrl = apiOptions(apiEndPoints.getListPlaylistOfUser, {});
    const rawLib = await fetchHelper(rawLibUrl, token);

    //if rawLib is null return error
    if (!rawLib) {
        console.log("Error with request to Youtube API");
        res.status(401).send({error: "Unauthorized"});
        return;
    }

    // Fetch data of each playlist
    // @ts-ignore
    const playlists = rawLib.items;
    const data = await Promise.all(playlists.map(async (playlist: any) => {
        const playlistId = playlist.id;
        const playlistUrl = apiOptions(apiEndPoints.getDataPlaylist, {id: playlistId});
        const playlistData = await fetchHelper(playlistUrl, token);

        //if playlistData is null return error
        if (!playlistData) {
            console.log("Error with request to Youtube API");
            res.status(401).send({error: "Unauthorized"});
            return;
        }

        const cleanPlaylistData: IPlaylistData = {
            id: playlistData.items[0].id,
            name: playlistData.items[0].snippet.title,
            description: playlistData.items[0].snippet.description,
            thumbnail: playlistData.items[0].snippet.thumbnails.high.url,
            publishedAt: playlistData.items[0].snippet.publishedAt,
            numberOfTracks: playlistData.items[0].contentDetails.itemCount,
            channelId: playlistData.items[0].snippet.channelId,
        }


        return cleanPlaylistData;
    }));


    const response = data;
    res.status(200).send(response);
};

const libraryController = {
    getLibrary
};

export default libraryController; // Correction ici
