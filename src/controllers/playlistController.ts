import {Request, Response} from "express";
import {apiOptions, apiEndPoints} from "../helpers/ApiEndPoints";
import {fetchHelper} from "../helpers/fetchHelper";
import {IMusicData} from "../interfaces/IMusicData";
import {getStreamUrl} from "../helpers/getStreamUrl";
import {IPlaylistData} from "../interfaces/IPlaylistData";


const getPlaylist = async (req: Request, res: Response) => {

    console.log("getPlaylist en cours");
    // how to get token from request
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({error: "Unauthorized"});
        return;
    }
    console.log("token: ", token);

    // how to get playlistId from request
    const playlistId = req.params.playlistId;





    // Fetch playlist of user
    const rawPlaylistUrl = apiOptions(apiEndPoints.getDataPlaylistItems, {id: playlistId});
    const rawPlaylist = await fetchHelper(rawPlaylistUrl, token);

    //if rawPlaylist is null return error
    if (!rawPlaylist) {
        res.status(401).send({error: "Unauthorized"});
        return;
    }

    // and data detail of the playlist
    const playlistDetai = apiOptions(apiEndPoints.getDataPlaylist, {id: playlistId});
    const playlistDetail = await fetchHelper(playlistDetai, token);

    //if playlistDetail is null return error
    if (!playlistDetail) {
        console.log("Error with request to Youtube API");
        res.status(401).send({error: "Unauthorized"});
        return;
    }


    let data:IMusicData[] = [];
    let count = 0;
    for (const music of rawPlaylist.items) {
        // Get the stream url
        //const streamUrlData = await getStreamUrl(music.snippet.resourceId.videoId);

        const cleanMusicData: IMusicData = {
            id: music.snippet.resourceId.videoId,
            name: music.snippet.title,
            description: music.snippet.description,
            thumbnail: music.snippet.thumbnails.high.url,
            publishedAt: music.snippet.publishedAt,
            videoOwnerChannelTitle: music.snippet.videoOwnerChannelTitle,
            videoOwnerChannelId: music.snippet.videoOwnerChannelId,
            //streamUrl: streamUrlData.audioURL // Utiliser le résultat de getStreamUrl
        }

        data.push(cleanMusicData);
        count++;
        console.log("count: ", count);
    }

    const response:IPlaylistData = {
        id: playlistDetail.items[0].id,
        name: playlistDetail.items[0].snippet.title,
        description: playlistDetail.items[0].snippet.description,
        thumbnail: playlistDetail.items[0].snippet.thumbnails.high.url,
        publishedAt: playlistDetail.items[0].snippet.publishedAt,
        numberOfTracks: playlistDetail.items[0].contentDetails.itemCount,
        channelId: playlistDetail.items[0].snippet.channelId,
        content: data
    }

    res.status(200).send(response);
};

const playlistController = {
    getPlaylist
};

export default playlistController;
