export interface CheckoutFormData {
  // Customer Info
  name: string;
  email: string;
  phone: string;
  cpf: string;

  // Shipping Address
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;

  // Payment
  paymentMethod: "credit" | "debit" | "pix";
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface AddressFormData {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}
