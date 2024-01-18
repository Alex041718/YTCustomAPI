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
    return data as any;
}
