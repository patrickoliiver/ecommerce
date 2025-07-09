'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/layout';

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Mostrar notificação de sucesso
    toast.success('Pedido realizado com sucesso!');
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Pedido Realizado!
              </h1>
              
              <p className="text-gray-600 mb-8">
                Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => router.push('/')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continuar Comprando
                </Button>
                
                <Button
                  onClick={() => router.push('/orders')}
                  variant="outline"
                  className="w-full"
                >
                  Ver Meus Pedidos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
