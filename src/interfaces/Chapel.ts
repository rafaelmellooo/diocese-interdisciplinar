export interface Chapel {
    name: string;

    city?: string;

    distance: string;

    geometry: {
        coordinates: number[];
    };

    info: {
        title?: string;
        text?: string;
    }

    address?: string;

    contact?: string;
}