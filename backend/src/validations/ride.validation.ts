import Joi from "joi";

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
      return helpers.error("any.custom", { message: "Os endereços de origem e destino não podem ser iguais." });
  }
  return value;
});