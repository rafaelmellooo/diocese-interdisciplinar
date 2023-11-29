import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.abibliadigital.com.br'
});

type GetVerseResponse = {
    book: {
        name: string;
    }
    chapter: number;
    number: number;
    text: string;
}

export async function getRandomVerse() {
    const response = await api.get<GetVerseResponse>('/api/verses/acf/random');

    return response.data;
}