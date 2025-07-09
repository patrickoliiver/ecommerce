'use client';

import { useState, useEffect } from 'react';
import { useCartContext } from '@/contexts/CartContext';
import { Button, Input } from '@/components/ui';
import { formatPrice, fetchAddressByCEP } from '@/utils';
import { formatCEP, formatPhone, formatCreditCard, formatCardExpiry, formatCVC } from '@/utils';
import { checkoutSchema, type CheckoutForm } from '@/schemas/checkout';
import { OrderService } from '@/services/orderService';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function CheckoutPage() {
  const { cart, clearCart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const router = useRouter();

  // Aguardar o carregamento do carrinho do localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (formData: CheckoutForm) => {
    setIsProcessing(true);
    
    try {
      // Simular processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Salvar o pedido usando OrderService
      const orderData = {
        id: OrderService.generateOrderId(),
        items: cart.items,
        total: cart.total,
        formData,
        date: new Date().toISOString(),
        status: 'Processado'
      };
      
      OrderService.saveOrder(orderData);
      
      // Simular sucesso - limpar carrinho apenas após salvar
      clearCart();
      toast.success('Pedido realizado com sucesso!');
      router.push('/order-success');
    } catch (err) {
      console.error('Erro ao processar pedido:', err);
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value);
    e.target.value = formattedCEP;
    
    const cleanCEP = formattedCEP.replace(/\D/g, '');
    
    // Buscar endereço quando CEP estiver completo
    if (cleanCEP.length === 8) {
      setIsFetchingAddress(true);
      
      try {
        const addressData = await fetchAddressByCEP(cleanCEP);
        
        if (addressData && !addressData.erro) {
          // Preencher os campos automaticamente
          setValue('address', addressData.logradouro || '');
          setValue('city', addressData.localidade || '');
          setValue('neighborhood', addressData.bairro || '');
          setValue('state', addressData.uf || '');
          
          toast.success('Endereço encontrado!');
        } else {
          toast.error('CEP não encontrado. Verifique o número digitado.');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        toast.error('Erro ao buscar endereço. Tente novamente.');
      } finally {
        setIsFetchingAddress(false);
      }
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Carregando...</h1>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (cart.items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="bg-gray-100 rounded-lg p-12">
              <p className="text-gray-600 text-lg mb-6">Seu carrinho está vazio</p>
              <Button 
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Voltar às Compras
              </Button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de checkout */}
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Dados pessoais */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('firstName')}
                      placeholder="Nome"
                      error={errors.firstName?.message}
                    />
                  </div>
                  <div>
                    <Input
                      {...register('lastName')}
                      placeholder="Sobrenome"
                      error={errors.lastName?.message}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    error={errors.email?.message}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    {...register('phone')}
                    placeholder="Telefone"
                    error={errors.phone?.message}
                    maxLength={15}
                    onChange={(e) => {
                      e.target.value = formatPhone(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* Endereço */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
                <div className="space-y-4">
                  {/* CEP em primeiro lugar */}
                  <div className="relative">
                    <Input
                      {...register('zipCode')}
                      placeholder="CEP"
                      error={errors.zipCode?.message}
                      maxLength={9}
                      onChange={handleCEPChange}
                      disabled={isFetchingAddress}
                    />
                    {isFetchingAddress && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Endereço */}
                  <Input
                    {...register('address')}
                    placeholder="Rua, Avenida, etc."
                    error={errors.address?.message}
                    disabled={isFetchingAddress}
                  />
                  
                  {/* Bairro e Cidade */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      {...register('neighborhood')}
                      placeholder="Bairro"
                      error={errors.neighborhood?.message}
                      disabled={isFetchingAddress}
                    />
                    <Input
                      {...register('city')}
                      placeholder="Cidade"
                      error={errors.city?.message}
                      disabled={isFetchingAddress}
                    />
                  </div>
                  
                  {/* Estado */}
                  <Input
                    {...register('state')}
                    placeholder="Estado (UF)"
                    error={errors.state?.message}
                    maxLength={2}
                    disabled={isFetchingAddress}
                  />
                </div>
              </div>

              {/* Método de pagamento */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="credit-card"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Cartão de Crédito</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="debit-card"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Cartão de Débito</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="pix"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>PIX</span>
                  </label>
                </div>

                {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                  <div className="mt-4 space-y-4">
                    <Input
                      {...register('cardNumber', { required: true })}
                      placeholder="Número do cartão"
                      error={errors.cardNumber?.message}
                      maxLength={19}
                      onChange={(e) => {
                        e.target.value = formatCreditCard(e.target.value);
                      }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        {...register('cardExpiry', { required: true })}
                        placeholder="MM/AA"
                        error={errors.cardExpiry?.message}
                        maxLength={5}
                        onChange={(e) => {
                          e.target.value = formatCardExpiry(e.target.value);
                        }}
                      />
                      <Input
                        {...register('cardCvc', { required: true })}
                        placeholder="CVC"
                        error={errors.cardCvc?.message}
                        maxLength={4}
                        onChange={(e) => {
                          e.target.value = formatCVC(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
              </Button>
            </form>
          </div>

          {/* Resumo do pedido */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.product.title}</h3>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete:</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
