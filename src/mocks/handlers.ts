import { Reward } from "@/domain/entities/reward";
import { http, HttpResponse } from "msw";
import { v7 as uuid } from "uuid";
import { fakerPT_BR as faker } from "@faker-js/faker";

export const handlers = [
  http.post("https://api.mock.com/login", async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json({
      token: "fake-token",
      data,
    });
  }),
  http.get("https://api.mock.com/rewards", async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json(
      new Array(10).fill(null).map((_, index) => {
        return Reward.fromJSON({
          id: uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          imageUrl: `https://picsum.photos/200?random=${index}`,
          points: faker.helpers.rangeToNumber({ min: 100, max: 5000 }),
        });
      })
    );
  }),
];
