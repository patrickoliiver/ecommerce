export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const formatCEP = (cep: string): string => {
  const cleanCEP = cep.replace(/\D/g, "");
  return cleanCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return phone;
};

export const formatCreditCard = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, "");
  return cleanNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatCardExpiry = (expiry: string): string => {
  const cleanExpiry = expiry.replace(/\D/g, "");
  return cleanExpiry.replace(/(\d{2})(\d{0,2})/, "$1/$2");
};

export const formatCVC = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 4);
};
