import { z } from "zod";
import { VALIDATION_PATTERNS, PAYMENT_METHODS } from "@/constants";

export const checkoutSchema = z
  .object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    firstName: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(50, "Nome muito longo"),
    lastName: z
      .string()
      .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
      .max(50, "Sobrenome muito longo"),
    address: z
      .string()
      .min(10, "Endereço deve ter pelo menos 10 caracteres")
      .max(200, "Endereço muito longo"),
    city: z
      .string()
      .min(2, "Cidade deve ter pelo menos 2 caracteres")
      .max(50, "Cidade muito longa"),
    neighborhood: z
      .string()
      .min(2, "Bairro deve ter pelo menos 2 caracteres")
      .max(50, "Bairro muito longo"),
    state: z
      .string()
      .min(2, "Estado deve ter pelo menos 2 caracteres")
      .max(2, "Estado deve ter 2 caracteres"),
    zipCode: z
      .string()
      .regex(VALIDATION_PATTERNS.CEP, "CEP deve ter formato 00000-000"),
    phone: z
      .string()
      .regex(
        VALIDATION_PATTERNS.PHONE,
        "Telefone deve ter formato (00) 00000-0000"
      ),
    paymentMethod: z.enum(
      [
        PAYMENT_METHODS.CREDIT_CARD,
        PAYMENT_METHODS.DEBIT_CARD,
        PAYMENT_METHODS.PIX,
      ],
      {
        errorMap: () => ({ message: "Selecione um método de pagamento" }),
      }
    ),
    cardNumber: z
      .string()
      .optional()
      .refine((val) => !val || val.replace(/\s/g, "").length >= 16, {
        message: "Número do cartão deve ter pelo menos 16 dígitos",
      }),
    cardExpiry: z
      .string()
      .optional()
      .refine((val) => !val || VALIDATION_PATTERNS.CARD_EXPIRY.test(val), {
        message: "Data deve ter formato MM/AA",
      }),
    cardCvc: z
      .string()
      .optional()
      .refine((val) => !val || VALIDATION_PATTERNS.CVC.test(val), {
        message: "CVC deve ter 3 ou 4 dígitos",
      }),
  })
  .refine(
    (data) => {
      if (
        data.paymentMethod === PAYMENT_METHODS.CREDIT_CARD ||
        data.paymentMethod === PAYMENT_METHODS.DEBIT_CARD
      ) {
        return data.cardNumber && data.cardExpiry && data.cardCvc;
      }
      return true;
    },
    {
      message: "Dados do cartão são obrigatórios para pagamento com cartão",
      path: ["cardNumber"],
    }
  );

export type CheckoutForm = z.infer<typeof checkoutSchema>;
