import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { findChapels } from "../../src/services/diocesedesantos.api";

const mock = new MockAdapter(axios);

describe("findChapels", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches successfully data from the API", async () => {
    const mockParams = {
      latitude: 123.45,
      longitude: 67.89,
      city: 123,
      schedules: [1, 2, 3],
    };

    const mockResponse = {
      features: [
        {
          id: 1,
          geometry: {
            coordinates: [12.34, 56.78],
          },
          properties: {
            name: "Chapel 1",
            fulladdress: "123 Chapel Street",
            icon: "chapel-icon",
            distance: "5 miles",
          },
        },
        // Add more mock data as needed
      ],
    };

    mock.onPost("/horarios-das-missas").reply(200, mockResponse);
  });

  it("handles API errors", async () => {
    const mockParams = {
      latitude: 123.45,
      longitude: 67.89,
      city: 123,
      schedules: [1, 2, 3],
    };

    mock
      .onPost("/horarios-das-missas")
      .reply(500, { error: "Internal Server Error" });
  });
});
