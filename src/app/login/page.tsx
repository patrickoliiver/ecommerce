'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';
import { useLogin } from '@/hooks';
import { useAuthContext } from '@/contexts/AuthContext';

const loginSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  password: z.string().min(1, 'Password é obrigatório'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthContext();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      
      // Mock user data (FakeStore API doesn't return user data on login)
      const mockUser = {
        id: 1,
        email: 'john@gmail.com',
        username: data.username,
        password: data.password,
        name: {
          firstname: 'John',
          lastname: 'Doe',
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: '1-570-236-7033',
      };

      login(response.token, mockUser);
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch {
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-gray-100">
            <Image 
              src="https://lunacheckout.com/_next/static/media/logo-light.83a313fc.png"
              alt="LunaCheckout"
              width={80}
              height={80}
              className="w-20 h-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-600">
            Faça login para continuar suas compras
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">         
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              type="text"
              {...register('username')}
              error={errors.username?.message}
              fullWidth
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              fullWidth
            />

            <Button
              type="submit"
              loading={loginMutation.isPending}
              fullWidth
              size="lg"
              variant="primary"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              {loginMutation.isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            LunaCheckout © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
