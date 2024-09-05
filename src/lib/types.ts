export interface HomeTranslation {
	home_id: number;
	id: number;
	languages_code: string;
	subtitle: string;
	welcome_message: string;
}

export interface Home {
	id: number;
	name: string;
	profile_image: Image;
    bg_image: Image;
    dark_bg_image: Image;
	images: Image[];
	projects: Project[];
	translations: HomeTranslation[];
}

export interface Profile {
    icon: string;
    link: string;
}

export interface Technology {
	id: number;
	name: string;
}

export interface AboutTranslation {
	about_id: number;
	id: number;
	languages_code: string;
	section_title: string;
	section_text: string;
	image_alt: string;
}

export interface About {
	id: number;
	section_icon: string;
	images: Image[];
	translations: AboutTranslation[];
}

export interface ProjectTranslation {
	id: number;
	projects_id: number;
	languages_code: string;
	title: string;
	description: string;
}

export interface Image {
	id: number;
	projects_id: number;
	directus_files_id: string;
}

export interface Project {
	id: number;
	start_date: string;
	end_date: string;
	translations: ProjectTranslation[];
	images: Image[];
	images_frame: 'mobile' | 'desktop';
    home_image: { id: string };
    link: 'string';
}
