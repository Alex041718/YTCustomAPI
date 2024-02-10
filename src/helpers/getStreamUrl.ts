import ytdl from "ytdl-core";


export const getStreamUrl = async(id:string) => {

    // make request http://localhost:6000/apiYTDL/:id
    let url = `http://localhost:6000/apiYTDL/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}