import {Request, response, Response} from "express";
import {apiOptions, apiEndPoints} from "../helpers/ApiEndPoints";
import {fetchHelper} from "../helpers/fetchHelper";
import {IMusicData} from "../interfaces/IMusicData";
import {getStreamUrl} from "../helpers/getStreamUrl";
import {IPlaylistData} from "../interfaces/IPlaylistData";


const getMusic = async (req: Request, res: Response) => {

    console.log("getMusic en cours");
    // how to get token from request
    // how to get token from request
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({error: "Unauthorized"});
        return;
    }
    console.log("token: ", token);


    // how to get musicId from request
    const musicId = req.params.musicId;

    // Fetch music of user
    const rawMusicUrl = apiOptions(apiEndPoints.getDataMusic, {id: musicId});
    const rawMusic = await fetchHelper(rawMusicUrl, token);

    //if rawMusic is null return error
    if (!rawMusic) {
        console.log("Error with request to Youtube API");
        res.status(401).send({error: "Unauthorized"});
        return;
    }

    // Get the stream url
    const streamUrlData = await getStreamUrl(musicId);

    const cleanMusicData: IMusicData = {
        id: rawMusic.items[0].id,
        name: rawMusic.items[0].snippet.title,
        description: rawMusic.items[0].snippet.description,
        thumbnail: rawMusic.items[0].snippet.thumbnails.high.url,
        publishedAt: rawMusic.items[0].snippet.publishedAt,
        videoOwnerChannelTitle: rawMusic.items[0].snippet.videoOwnerChannelTitle,
        videoOwnerChannelId: rawMusic.items[0].snippet.videoOwnerChannelId,
        streamUrl: streamUrlData.audioURL
    }

    const response = cleanMusicData;

    res.status(200).send(response);
}

const musicController = {
    getMusic
}

export default musicController;