import {Request, Response} from "express";

import ytdl from "ytdl-core";


async function getStreamUrlByYTDL(id:string) {

    let url = `https://www.youtube.com/watch?v=${id}`;

    try {
        // Get the Video Info with ytdl-core
        const info = await ytdl.getInfo(url);

        // Choose the best audio format
        const audioFormat = ytdl.chooseFormat(info.formats, {
            filter: "audioonly",
            quality: "highestaudio"
        });

        if (!audioFormat) {
            throw new Error("Aucun format audio trouvé.");
        }

        return {
            audioInfo: info,
            audioURL: audioFormat.url
        };
    } catch (error) {
        throw error;
    }
}


const getStreamUrl = async (req: Request, res: Response) => {


    // how to get playlistId from request
    const id = req.params.id;

    const streamUrlData = await getStreamUrlByYTDL(id);
    if (!streamUrlData) {
        res.status(401).send({error: "Failed to get stream url"});
        return;

    }

    const response = {id: id, streamUrl: streamUrlData.audioURL};
    res.status(200).send(response);
};


const streamUrlController = {
    getStreamUrl
};

export default streamUrlController;