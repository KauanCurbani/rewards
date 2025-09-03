import { Reward } from "@/domain/entities/reward";
import { http, HttpResponse } from "msw";
import { v7 as uuid } from "uuid";
import { fakerPT_BR as faker } from "@faker-js/faker";

export const MOCKED_REWARDS = [
  {
    id: "01990c6a-10df-758d-92d4-33a9fadd705b",
    name: "Sem marca Madeira Teclado",
    description:
      "Introducing the Marianas Setentrionais-inspired Salsicha, blending retangular style with local craftsmanship",
    imageUrl: "https://picsum.photos/200?random=0",
    points: 3736,
    category: "eletronicos",
  },
  {
    id: "01990c6a-10e0-76fe-915b-573f51273caf",
    name: "Lindo Plástico Chapéu",
    description: "Professional-grade Luvas perfect for largo training and recreational use",
    imageUrl: "https://picsum.photos/200?random=1",
    points: 2027,
    category: "roupas",
  },
  {
    id: "01990c6a-10e0-76fe-915b-5a01f09817d0",
    name: "Impressionante Concreto Salada",
    description: "Our sour-inspired Camiseta brings a taste of luxury to your educado lifestyle",
    imageUrl: "https://picsum.photos/200?random=2",
    points: 2097,
    category: "alimentacao",
  },
  {
    id: "01990c6a-10e0-76fe-915b-5fec505204c4",
    name: "Rústico Aço Bicicleta",
    description:
      "Featuring Tungsten-enhanced technology, our Pizza offers unparalleled relaxado performance",
    imageUrl: "https://picsum.photos/200?random=3",
    points: 3296,
    category: "saude",
  },
  {
    id: "01990c6a-10e0-76fe-915b-6204c1665fb9",
    name: "Feito à mão Granito Frango",
    description: "Ergonomic Toalhas made with Plástico for all-day largo support",
    imageUrl: "https://picsum.photos/200?random=4",
    points: 4652,
    category: "casa",
  },
  {
    id: "01990c6a-10e0-76fe-915b-64b2b12cdbed",
    name: "Lustroso Fresco Bola",
    description: "Experience the prata brilliance of our Queijo, perfect for difícil environments",
    imageUrl: "https://picsum.photos/200?random=5",
    points: 730,
    category: "esportes",
  },
  {
    id: "01990c6a-10e0-76fe-915b-69bddd08a052",
    name: "Rústico Aço Chapéu",
    description:
      "Oliveira, Batista e Moreira's most advanced Cadeira technology increases engraçado capabilities",
    imageUrl: "https://picsum.photos/200?random=6",
    points: 2543,
    category: "viagem",
  },
  {
    id: "01990c6a-10e0-76fe-915b-6c4e7c22f489",
    name: "Fantástico Metal Salada",
    description: "Ergonomic Calças made with Madeira for all-day terrestre support",
    imageUrl: "https://picsum.photos/200?random=7",
    points: 2919,
    category: "eletronicos",
  },
  {
    id: "01990c6a-10e0-76fe-915b-70e47a2c3fd7",
    name: "Lustroso Concreto Salada",
    description: "Silva, Franco e Melo's most advanced Mesa technology increases belo capabilities",
    imageUrl: "https://picsum.photos/200?random=8",
    points: 1718,
    category: "casa",
  },
  {
    id: "01990c6a-10e0-76fe-915b-748260785231",
    name: "Gostoso Granito Mouse",
    description: "Refinado Cadeira designed with Algodão for rico performance",
    imageUrl: "https://picsum.photos/200?random=9",
    points: 3305,
    category: "entretenimento",
  },
];

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
    return HttpResponse.json(MOCKED_REWARDS);
  }),

  // GET single reward
  http.get("https://api.mock.com/rewards/:id", async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { id } = params;
    const reward = MOCKED_REWARDS.find((r) => r.id === id);

    if (!reward) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(reward);
  }),

  // POST new reward
  http.post("https://api.mock.com/rewards", async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const body = (await request.json()) as any;

    const newReward = {
      id: uuid(),
      name: body.name,
      description: body.description || `Descrição gerada para ${body.name}`,
      imageUrl: body.imageUrl || `https://picsum.photos/200?random=${Date.now()}`,
      points: body.pointsRequired,
      category: body.category,
    };

    MOCKED_REWARDS.push(newReward);
    return HttpResponse.json(newReward, { status: 201 });
  }),

  // PUT update reward
  http.put("https://api.mock.com/rewards/:id", async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { id } = params;
    const body = (await request.json()) as any;

    const rewardIndex = MOCKED_REWARDS.findIndex((r) => r.id === id);

    if (rewardIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedReward = {
      ...MOCKED_REWARDS[rewardIndex],
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
      points: body.pointsRequired,
      category: body.category,
    };

    MOCKED_REWARDS[rewardIndex] = updatedReward;
    return HttpResponse.json(updatedReward);
  }),

  // DELETE reward
  http.delete("https://api.mock.com/rewards/:id", async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { id } = params;

    const rewardIndex = MOCKED_REWARDS.findIndex((r) => r.id === id);

    if (rewardIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    MOCKED_REWARDS.splice(rewardIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
