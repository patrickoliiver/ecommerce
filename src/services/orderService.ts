import { Order } from "@/types/order";

/**
 * Serviços relacionados a pedidos
 */
export class OrderService {
  private static readonly STORAGE_KEY = "orders";

  /**
   * Salva um pedido no localStorage
   */
  static saveOrder(order: Order): void {
    try {
      const existingOrders = this.getOrders();
      existingOrders.push(order);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingOrders));
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      throw new Error("Falha ao salvar pedido");
    }
  }

  /**
   * Busca todos os pedidos do localStorage
   */
  static getOrders(): Order[] {
    try {
      if (typeof window === "undefined") return [];

      const ordersJson = localStorage.getItem(this.STORAGE_KEY);
      return ordersJson ? JSON.parse(ordersJson) : [];
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      return [];
    }
  }

  /**
   * Busca um pedido específico pelo ID
   */
  static getOrderById(id: number): Order | undefined {
    const orders = this.getOrders();
    return orders.find((order) => order.id === id);
  }

  /**
   * Limpa todos os pedidos (apenas para desenvolvimento)
   */
  static clearOrders(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /**
   * Gera um novo ID para pedido
   */
  static generateOrderId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}
