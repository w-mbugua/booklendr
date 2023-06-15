import { LogoutDocument } from '@/generated/gql/graphql';
import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function useLogout() {
  const [logout, { error, data }] = useMutation(LogoutDocument);
  const apollo = useApolloClient();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    if (!error) {
      await apollo.clearStore();
    }
    router.push('/login');
  };
  return { logout: handleLogout };
}
