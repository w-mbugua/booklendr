import { CurrentUserDocument } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data } = useQuery(CurrentUserDocument);

  useEffect(() => {
    if (data && Object.values(data.currentUser).length) {
      setIsLoggedIn(true);
      setCurrentUser(data.currentUser);
    }
  }, [data]);

  return [currentUser, isLoggedIn];
}
