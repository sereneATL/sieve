export interface UserProfile {
    email: string;
    gender: 'MALE' | 'FEMALE' | 'ALL';
    age: number;
    personalityType: 'INTROVERT' | 'EXTROVERT' | 'AMBIVERT';
    sportsScore: number;
    artsEntertainmentScore: number;
    outdoorActivitiesScore: number;
    technologyGamingScore: number;
    culinaryArtsScore: number;
    wellnessFitnessScore: number;
    otherHobbies: number;
    genderPreference: 'MALE' | 'FEMALE' | 'ALL';
    samePersonalityPreference: boolean;
    sameMusicTypePreference: number;
    minAgePreference: number
    maxAgePreference: number
}

export interface MusicPreferences {
    topGenres: string[];
    topArtists: string[];
    topTracksString: string[];
    topTracksId: string[];
}

export interface SpotifyAudioFeatures {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
};

export interface SpotifyTracksArtistItem {
    id?: string;
    name: string;
    genres?: string;
}

export interface SpotifyTracksArtistResponse {
    items: Array<SpotifyTracksArtistItem>; 
}