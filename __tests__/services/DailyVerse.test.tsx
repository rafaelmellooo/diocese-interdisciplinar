import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRandomVerse } from "../../src/services/abibliadigital.api";

const mock = new MockAdapter(axios);

describe("getRandomVerse", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches successfully data from the API", async () => {
    const mockResponse = {
      book: {
        abbrev: { en: "2kgs", pt: "2rs" },
        author: "Jeremias",
        group: "Históricos",
        name: "2º Reis",
        version: "acf",
      },
      chapter: 4,
      number: 19,
      text: "E disse a seu pai: Ai, a minha cabeça! Ai, a minha cabeça! Então disse a um moço: Leva-o à sua mãe.",
    };

    mock.onGet("/api/verses/acf/random").reply(200, mockResponse);
  });
});
