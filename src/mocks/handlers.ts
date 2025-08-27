import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.mock.com/login", () => {
    return HttpResponse.json({
      token: "fake-token",
    });
  }),
];
