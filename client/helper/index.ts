import { useUserQuery } from '../generated/graphql';

export const fetchUsername = (userId: number) => {
  const [{ data }] = useUserQuery({
    variables: { userId },
  });

  return data?.user?.name.toString() || 'John Doe';
};
