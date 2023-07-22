export interface Member {
    username: string;
    displayName: string;
    photoUrl: string;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    bio: string;
    native: string;
    learn: string;
    level: string;
    interests: string;
    city: string;
    country: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}
