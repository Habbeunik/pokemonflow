export interface PokemonTask {
	title: string;
	pokemonType: string;
	location: string;
	levelRange: [number, number];
	specialMove: string;
	catchRate: string;
	extra?: string;
	timeOfDay: string;
	isLastTask: boolean;
}

export enum CustomNodeTypes {
	Display = 'nodeDisplay',
	Entry = 'nodeEntry',
}
