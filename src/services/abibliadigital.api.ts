import axios from "axios";

const api = axios.create({
  baseURL: "https://www.abibliadigital.com.br",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBOb3YgMjkgMjAyMyAyMTowNDoxNiBHTVQrMDAwMC5yYWZhZWxtZWxsb0B1bmlzYW50b3MuYnIiLCJpYXQiOjE3MDEyOTE4NTZ9.oLRQV8-dGcZ21CYkbFp8_lAiDummCl_RNDJfpKhk4EM",
  },
});

type GetVerseResponse = {
    book: {
        name: string;
    }
    chapter: number;
    number: number;
    text: string;
};

export async function getRandomVerse() {
  const response = await api.get<GetVerseResponse>("/api/verses/acf/random");

  return response.data;
}
