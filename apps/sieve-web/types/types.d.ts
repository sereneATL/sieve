export interface UserProfile {
    id: number;
    email: string;
    name?: string;
    gender: 'MALE' | 'FEMALE' | 'ALL';
    age: number;
    profilePicture?: string;
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
    musicPreferences?: MusicPreferences
}

export interface MusicPreferences {
    topGenres: string[];
    topArtists: string[];
    topTracksString: string[];
    topTracksId: string[];
}

export interface SpotifyAudioFeatures {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    speechiness: number;
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

export interface CardProps {
    data: CardData;
    active: boolean;
    removeCard: (id: number, action: 'accept' | 'reject') => void;
};
  
export interface CardData {
    id: number;
    name: string;
    profilePicture: string;
    age: number;
    gender: string;
    personalityType: string;
    matchScore: number;

    topGenres: string[];
    topArtists: string[];
    topTracksId: string[];
};
  
  