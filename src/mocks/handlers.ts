import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.mock.com/login", async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json({
      token: "fake-token",
      data,
    });
  }),
];
