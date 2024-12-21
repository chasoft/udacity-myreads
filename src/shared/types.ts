export type IndustryIdentifier = {
	type: string;
	identifier: string;
};

export type ReadingModes = {
	text: boolean;
	image: boolean;
};

export type PanelizationSummary = {
	containsEpubBubbles: boolean;
	containsImageBubbles: boolean;
};

export type ImageLinks = {
	smallThumbnail: string;
	thumbnail: string;
};

export type Book = {
	title: string;
	subtitle?: string;
	authors?: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	industryIdentifiers: IndustryIdentifier[];
	readingModes: ReadingModes;
	pageCount: number;
	printType: string;
	categories?: string[];
	averageRating: number;
	ratingsCount: number;
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary: PanelizationSummary;
	imageLinks?: ImageLinks;
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
	id: string;
	shelf: string;
};
