import { Reward } from "@/domain/entities/reward";
import { http, HttpResponse } from "msw";
import { v7 as uuid } from "uuid";
import { fakerPT_BR as faker } from "@faker-js/faker";

export const MOCKED_REWARDS = [
  {
    id: "01990c6a-10df-758d-92d4-33a9fadd705b",
    name: "iPhone 15 Pro 128GB",
    description:
      "O mais avançado iPhone com chip A17 Pro, câmera de 48MP e design em titânio. Inclui carregador USB-C.",
    imageUrl: "https://placehold.co/200x100/1f2937/ffffff?text=iPhone+15",
    points: 15000,
    category: "eletronicos",
    expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
  {
    id: "01990c6a-10e0-76fe-915b-573f51273caf",
    name: "Tênis Nike Air Max 270",
    description:
      "Tênis esportivo com tecnologia Air Max, ideal para corrida e uso casual. Disponível em várias cores.",
    imageUrl: "https://placehold.co/200x100/ef4444/ffffff?text=Nike+Air",
    points: 800,
    category: "roupas",
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
  },
  {
    id: "01990c6a-10e0-76fe-915b-5a01f09817d0",
    name: "Voucher Restaurante 100 Reais",
    description:
      "Vale-refeição de R$ 100 para usar em restaurantes parceiros. Válido por 12 meses.",
    imageUrl: "https://placehold.co/200x100/10b981/ffffff?text=Voucher",
    points: 500,
    category: "alimentacao",
  },
  {
    id: "01990c6a-10e0-76fe-915b-5fec505204c4",
    name: "Bicicleta Trek FX 3",
    description:
      "Bicicleta híbrida de alta qualidade, perfeita para cidade e trilhas leves. Quadro de alumínio leve.",
    imageUrl: "https://placehold.co/200x100/3b82f6/ffffff?text=Trek+FX3",
    points: 4500,
    category: "esportes",
  },
  {
    id: "01990c6a-10e0-76fe-915b-6204c1665fb9",
    name: "Aspirador de Pó Dyson V15",
    description:
      "Aspirador sem fio com tecnologia de detecção de partículas e bateria de longa duração.",
    imageUrl: "https://placehold.co/200x100/8b5cf6/ffffff?text=Dyson+V15",
    points: 3200,
    category: "casa",
  },
  {
    id: "01990c6a-10e0-76fe-915b-64b2b12cdbed",
    name: "Bola de Futebol Nike Ordem V",
    description:
      "Bola oficial de futebol profissional com tecnologia Nike Aerowtrac para melhor precisão nos passes.",
    imageUrl: "https://placehold.co/200x100/f59e0b/ffffff?text=Nike+Ball",
    points: 300,
    category: "esportes",
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  },
  {
    id: "01990c6a-10e0-76fe-915b-69bddd08a052",
    name: "Mala de Viagem Samsonite",
    description:
      "Mala rígida de 28 polegadas com 4 rodas e cadeado TSA. Ideal para viagens internacionais.",
    imageUrl: "https://placehold.co/200x100/06b6d4/ffffff?text=Samsonite",
    points: 1800,
    category: "viagem",
  },
  {
    id: "01990c6a-10e0-76fe-915b-6c4e7c22f489",
    name: "MacBook Air M2 256GB",
    description:
      'Notebook ultra fino com chip Apple M2, tela Liquid Retina de 13.6" e bateria de até 18 horas.',
    imageUrl: "https://placehold.co/200x100/6b7280/ffffff?text=MacBook+Air",
    points: 12000,
    category: "eletronicos",
  },
  {
    id: "01990c6a-10e0-76fe-915b-70e47a2c3fd7",
    name: "Cafeteira Nespresso Vertuo",
    description:
      "Cafeteira automática com sistema de cápsulas Vertuo. Prepara espresso e café longo com crema natural.",
    imageUrl: "https://placehold.co/200x100/dc2626/ffffff?text=Nespresso",
    points: 1200,
    category: "casa",
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
  },
  {
    id: "01990c6a-10e0-76fe-915b-748260785231",
    name: "PlayStation 5 Digital",
    description:
      "Console de videogame de última geração com SSD ultra-rápido e controle DualSense com feedback tátil.",
    imageUrl: "https://placehold.co/200x100/1e293b/ffffff?text=PS5+Digital",
    points: 8500,
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
      imageUrl:
        body.imageUrl ||
        `https://placehold.co/200x100/6b7280/ffffff?text=${encodeURIComponent(
          body.name.substring(0, 20)
        )}`,
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
