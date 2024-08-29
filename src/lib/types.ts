export interface Translation {
    home_id: number;
    id: number;
    languages_code: string;
    subtitle: string;
    welcome_message: string;
}

export interface Home {
    id: number;
    name: string;
    profile_image: string;
    bg_image: string;
    linkedin: string;
    github: string;
    translations: Translation[]
}

export interface Technology {
    id: number;
    name: string;
}