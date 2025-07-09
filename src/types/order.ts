import { CartItem } from "@/types";

export interface OrderFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  formData: OrderFormData;
  date: string;
  status: string;
}
