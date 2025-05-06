import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - Online Book Manager',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-dark-100">Login to Your Account</h1>
      <div className="bg-dark-800 p-8 rounded-lg shadow-md border border-dark-700">
        <LoginForm />
      </div>
    </div>
  );
} 