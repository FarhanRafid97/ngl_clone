import { useAllUserQuery } from '../generated/graphql';

export const DataUser = () => {
  const { data } = useAllUserQuery();
  return data?.allUser;
};
