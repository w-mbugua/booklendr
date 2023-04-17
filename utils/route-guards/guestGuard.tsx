import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface guardProps {
  children: React.ReactNode;
}
export default function GuestGuard({ children }: guardProps) {
  const router = useRouter();
  const [_, isLoggedIn] = useAuth();

  useEffect(() => {
    console.log('NOT', isLoggedIn);
    if (!isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
}
