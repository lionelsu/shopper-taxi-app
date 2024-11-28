import Joi, { custom } from "joi";

export const estimateRideSchema = Joi.object({
  origin: Joi.string().trim().required().messages({
      "string.empty": "O endereço de origem não pode estar em branco.",
      "any.required": "O endereço de origem é obrigatório."
  }),
  destination: Joi.string().trim().required().messages({
      "string.empty": "O endereço de destino não pode estar em branco.",
      "any.required": "O endereço de destino é obrigatório."
  }),
  userId: Joi.string().trim().required().messages({
      "string.empty": "O ID do usuário não pode estar em branco.",
      "any.required": "O ID do usuário é obrigatório."
  })}).custom((value, helpers) => {
    if (value.origin === value.destination) {
      return helpers.message({ custom: "Os endereços de origem e destino não podem ser iguais." });
    }
    return value;
});

export const validateConfirmRideSchema = Joi.object({
  customer_id: Joi.string().trim().required().messages({
    "string.base": "Os dados fornecidos no corpo da requisição são inválidos",
    "string.empty": "O ID do usuário não pode estar em branco.",
    "any.required": "O ID do usuário é obrigatório."
  }),
  origin: Joi.string().trim().required().messages({
    "string.base": "Os dados fornecidos no corpo da requisição são inválidos",
    "string.empty": "O endereço de origem não pode estar em branco.",
    "any.required": "O endereço de origem é obrigatório."
  }),
  destination: Joi.string().trim().required().messages({
    "string.base": "Os dados fornecidos no corpo da requisição são inválidos",
    "string.empty": "O endereço de destino não pode estar em branco.",
    "any.required": "O endereço de destino é obrigatório."
  }),
  distance: Joi.number().strict().positive().required().messages({
    "number.base": "A distância deve ser um número.",
    "number.positive": "A distância deve ser maior que zero.",
    "any.required": "A distância é obrigatória."
  }),
  duration: Joi.string().trim().required().messages({
    "string.base": "Os dados fornecidos no corpo da requisição são inválidos",
    "string.empty": "A duração não pode estar em branco.",
    "any.required": "A duração é obrigatória."
  }),
  driver: Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "O ID do motorista deve ser um número.",
      "any.required": "O ID do motorista é obrigatório."
    }),
    name: Joi.string().trim().required().messages({
      "string.base": "Os dados fornecidos no corpo da requisição são inválidos",
      "string.empty": "O nome do motorista não pode estar em branco.",
      "any.required": "O nome do motorista é obrigatório."
    })
  }).required().messages({
    "object.base": "Os dados do motorista são obrigatórios."
  }),
  value: Joi.number().strict().positive().required().messages({
    "number.base": "O valor deve ser um número.",
    "number.positive": "O valor deve ser maior que zero.",
    "any.required": "O valor é obrigatório."
  })}).custom((value, helpers) => {
    if (value.origin === value.destination) {
      return helpers.message({ custom: "Os endereços de origem e destino não podem ser iguais." });
    }
    return value;
});

export const validateGetRidesSchema = Joi.object({
  customer_id: Joi.string().trim().required().messages({
    "string.empty": "O ID do usuário não pode estar em branco.",
    "any.required": "O ID do usuário é obrigatório."
  }),
  driver_id: Joi.number().integer().optional().messages({
    "number.base": "O ID do motorista deve ser um número inteiro."
  })
});
