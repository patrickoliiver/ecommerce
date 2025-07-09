'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { formatPrice } from '@/utils';
import { Header } from '@/components/layout';
import { Order } from '@/types/order';
import { OrderService } from '@/services/orderService';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Carregar pedidos usando OrderService
    const savedOrders = OrderService.getOrders();
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
            
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h2>
                <p className="text-gray-600">
                  Você ainda não fez nenhum pedido. Comece suas compras agora!
                </p>
              </div>
              
              <Button
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Começar a Comprar
              </Button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
          
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Pedido #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Itens:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.product.title}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Entrega:</h4>
                  <p className="text-sm text-gray-600">
                    {order.formData.firstName} {order.formData.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.formData.address}, {order.formData.city} - {order.formData.zipCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="mr-4"
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
