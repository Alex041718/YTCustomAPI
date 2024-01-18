export const apiOptions = (endpoint : string, parameters : object) => {

    Object.entries(parameters).forEach(([key,val]) => {
        endpoint = endpoint.replace('${' + key + '}', val);
    })

    return endpoint;

}

export enum apiEndPoints {
    getListPlaylistOfUser = 'https://www.googleapis.com/youtube/v3/playlists?mine=true&maxResults=50',
    getDataPlaylist = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&maxResults=200&id=${id}',
    getDataPlaylistItems = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50',
    getDataMusic = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}',
}