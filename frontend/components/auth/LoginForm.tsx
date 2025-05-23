'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const verificationSchema = z.object({
  code: z.string().min(6, 'Please enter the 6-digit verification code'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type VerificationFormValues = z.infer<typeof verificationSchema>;

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [redirectPath, setRedirectPath] = useState('/');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, verifyEmail } = useAuth();

  // Get redirect path from URL if available
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectPath(`/${redirect}`);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const {
    register: registerVerification,
    handleSubmit: handleVerificationSubmit,
    formState: { errors: verificationErrors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setLoginError('');
      
      const result = await login(
        data.email,
        data.password,
        Boolean(data.rememberMe)
      );
      
      if (result.success) {
        router.push(redirectPath);
      } else if (result.needsVerification) {
        setNeedsVerification(true);
        if (result.email) {
          setUserEmail(result.email);
        } else {
          setUserEmail(data.email);
        }
      } else {
        setLoginError(result.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onVerificationSubmit = async (data: VerificationFormValues) => {
    try {
      setIsSubmitting(true);
      setLoginError('');
      
      const success = await verifyEmail(userEmail, data.code);
      
      if (success) {
        router.push(`/auth/login?redirect=${encodeURIComponent(redirectPath.slice(1))}`);
        setLoginError('Verification successful. Please log in again.');
      } else {
        setLoginError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setLoginError('An error occurred during verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerificationCode = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setLoginError('Verification code resent. Please check your email.');
      } else {
        setLoginError(data.message || 'Failed to resend verification code.');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setLoginError('An error occurred while resending the code.');
    } finally {
      setIsSubmitting(false);
    }
  }, [userEmail]);

  if (needsVerification) {
    return (
      <div className="space-y-4">
        <div className="text-center py-4">
          <h2 className="text-xl font-semibold mb-2 text-dark-100">Email Verification Required</h2>
          <p className="mb-4 text-dark-300">
            Your email ({userEmail}) needs to be verified before you can log in. Please enter the verification code sent to your email.
          </p>
        </div>

        {loginError && (
          <div className="bg-dark-800 border border-red-400 p-3 rounded text-red-300 text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleVerificationSubmit(onVerificationSubmit)} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-dark-200 font-medium mb-1">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              className="input-field"
              placeholder="Enter the 6-digit code"
              {...registerVerification('code')}
            />
            {verificationErrors.code && <p className="form-error">{verificationErrors.code.message}</p>}
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={resendVerificationCode}
              className="text-accent-400 hover:text-accent-300 text-sm font-medium"
              disabled={isSubmitting}
            >
              Didn't receive a code? Resend
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loginError && (
        <div className="bg-dark-800 border border-red-400 p-3 rounded text-red-300 text-sm">
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-dark-200 font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-dark-200 font-medium">
              Password
            </label>
            <button
              type="button"
              onClick={() => router.push('/auth/forgot-password')}
              className="text-sm text-accent-400 hover:text-accent-300"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>

        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 accent-accent-500 border-dark-700 rounded"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="ml-2 block text-dark-300">
            Remember me
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="text-center pt-4">
        <p className="text-dark-300">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/register')}
            className="text-accent-400 hover:text-accent-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
} 