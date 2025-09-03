import { z } from "zod";

// Enum para categorias
export enum RewardCategory {
  ELETRONICOS = "eletronicos",
  ALIMENTACAO = "alimentacao",
  VIAGEM = "viagem",
  ENTRETENIMENTO = "entretenimento",
  ROUPAS = "roupas",
  LIVROS = "livros",
  ESPORTES = "esportes",
  SAUDE = "saude",
  BELEZA = "beleza",
  CASA = "casa",
  OUTROS = "outros",
}

export const REWARD_CATEGORIES = Object.values(RewardCategory);

// Schema de validação para formulários de reward
export const rewardFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(80, "Nome deve ter no máximo 80 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  imageUrl: z.string().url("URL da imagem deve ser válida").optional().or(z.literal("")),
  pointsRequired: z
    .number()
    .int("Pontos devem ser um número inteiro")
    .positive("Pontos devem ser maior que zero"),
  category: z.nativeEnum(RewardCategory, {
    message: "Selecione uma categoria válida",
  }),
  expiresAt: z.date().min(new Date(), "Data de expiração deve ser no futuro").nullable().optional(),
});

export type RewardFormData = z.infer<typeof rewardFormSchema>;

// Mapeamento de categorias para exibição
export const CATEGORY_LABELS: Record<RewardCategory, string> = {
  [RewardCategory.ELETRONICOS]: "Eletrônicos",
  [RewardCategory.ALIMENTACAO]: "Alimentação",
  [RewardCategory.VIAGEM]: "Viagem",
  [RewardCategory.ENTRETENIMENTO]: "Entretenimento",
  [RewardCategory.ROUPAS]: "Roupas",
  [RewardCategory.LIVROS]: "Livros",
  [RewardCategory.ESPORTES]: "Esportes",
  [RewardCategory.SAUDE]: "Saúde",
  [RewardCategory.BELEZA]: "Beleza",
  [RewardCategory.CASA]: "Casa",
  [RewardCategory.OUTROS]: "Outros",
};
