import axios from "axios";

const api = axios.create({
  baseURL: "https://www.diocesedesantos.com.br",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

type FindChapelsParams = {
  latitude: number;
  longitude: number;
  city?: number;
  schedules?: number[];
};

type FindChapelsResponse = {
    features: {
        id: number;
        geometry: {
            coordinates: number[];
        },
        properties: {
            name: string;
            fulladdress: string;
            icon: string;
            distance: string;
        };
    }[];
};

export async function findChapels(params: FindChapelsParams) {
  const response = await api.post<FindChapelsResponse>("/horarios-das-missas", {
    latitude: params.latitude,
    longitude: params.longitude,
    filter_catid: params.city,
    tags: params.schedules,

    format: "json",
    searchzip: "Sua Localização (Você)",
    component: "com_mymaplocations",
  });

    return response.data;
}

type GetEventsResponse = {
    data: {
        id: number;
        title: string;
        start: string;
    }[];
};

export async function getEvents() {
    const response = await api.get<GetEventsResponse>('/index.php?option=com_dpcalendar&view=events');

    return response.data;
}
