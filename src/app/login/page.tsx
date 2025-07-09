'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <span className="font-medium text-blue-600">
              use as credenciais de teste
            </span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Credenciais de Teste:</h3>
            <p className="text-sm text-blue-700">
              <strong>Username:</strong> johnd<br />
              <strong>Password:</strong> m38rmF$
            </p>
          </div>

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

            <div className="mt-6">
              <Button
                type="submit"
                loading={loginMutation.isPending}
                fullWidth
                size="lg"
                variant="primary"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
