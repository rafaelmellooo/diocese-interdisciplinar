export interface Chapel {
    name: string;

    city?: string;

    distance: string;

    geometry: {
        coordinates: number[];
    };

    info: string;

    address: string;
}