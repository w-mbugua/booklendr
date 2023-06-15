import { CurrentUserDocument, CurrentUserQuery } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [currentUser, setCurrentUser] =
    useState<CurrentUserQuery['currentUser']>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data } = useQuery(CurrentUserDocument);

  useEffect(() => {
    if (data?.currentUser) {
      setIsLoggedIn(true);
      setCurrentUser(data.currentUser);
    }
  }, [data]);

  return { currentUser, isLoggedIn };
}
