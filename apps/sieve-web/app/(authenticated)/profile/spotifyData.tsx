import { SpotifyAudioFeatures, SpotifyTracksArtistResponse } from "./types"

const spotifyBaseUrl = "https://api.spotify.com/v1"

const getSpotifyData = async (params: {
    path: string, token: string
}): Promise<SpotifyTracksArtistResponse> => {
    const res = await fetch(
        `${spotifyBaseUrl}${params.path}`, { 
            headers: {
                'Authorization': `Bearer ${params.token}`,
                'Content-Type': 'application/json'
            },
            cache: 'force-cache' 
        },
    )
    return await res.json();
}

const getAudioFeatures = async (trackId: string[], token: string) => {
    return await getSpotifyData({path: `/audio-features/${trackId}`, token});
}

export const aggregateAudioFeatures = async () => {

}


export const compileSpotifyTracksData = async (token: string): Promise<{trackNames: string[], id: string[]}> => {
    const data = await getSpotifyData({path: "/me/top/tracks?limit=49", token})
    
    const { id, trackNames } = data.items.reduce(
        (accumulator, { name, id }) => {
            accumulator.id.push(id as string);

            accumulator.trackNames.push(name);
            return accumulator;
        },
        { trackNames: [] as string[], id: [] as string[] }
    );

    return { trackNames, id };
}

export const compileSpotifyArtistsData = async (token: string): Promise<{names: string[], topGenres: string[]}> => {
    const data = await getSpotifyData({path: "/me/top/artists?limit=49", token})
    
    const { names, genres } = data.items.reduce(
        (accumulator, { name, genres }) => {
            accumulator.names.push(name);
            accumulator.genres.push(genres as string);
            return accumulator;
        },
        { names: [] as string[], genres: [] as string[] }
    );

    const uniqueGenres: Set<string> = new Set(genres.flat());
    
    return { names, topGenres: Array.from(uniqueGenres) };
}

export const sumNumericValues = (data: SpotifyAudioFeatures[]): Record<string, number> => {
    const result: Record<string, number> = {};

    data.forEach((item) => {
        Object.keys(item).forEach((key) => {
        const value = item[key as keyof SpotifyAudioFeatures] ;
        if (typeof value === 'number') {
            result[key] = (result[key] || 0) + value;
        }
        });
    });

    return result;
}

