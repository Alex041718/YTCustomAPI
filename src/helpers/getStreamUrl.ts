import ytdl from "ytdl-core";


export const getStreamUrl = async(id:string) => {

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