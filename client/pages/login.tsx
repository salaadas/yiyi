import React from 'react';
import { Prompt } from '../components/Prompt';
import { useLoginMutation } from '../generated/graphql';

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();

  return <Prompt fn={login} />;
};

export default Login;
