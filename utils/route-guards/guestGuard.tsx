import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface guardProps {
  children: React.ReactNode;
}
export default function GuestGuard({ children }: guardProps) {
  const router = useRouter();
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);

  return <>{children}</>;
}
