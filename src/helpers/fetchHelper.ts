interface ApiResponse {
    items: any[]; // Remplacer par une structure plus spécifique si possible
}
 export const fetchHelper = async (url: string, authToken: string): Promise<ApiResponse>  => {
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    const data = await response.json();
    // return error if response is not ok
    if (!response.ok) {
        // @ts-ignore
        //throw new Error(data.error.message);
        return null;
    }
    return data as any;
}
