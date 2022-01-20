import React from 'react';
import { useMutation } from 'urql';
import { Prompt } from '../components/Prompt';

interface loginProps {}

const LOGIN_MUT = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      errors {
        field
        message
      }
      user {
        id
        email
        name
      }
    }
  }
`;

export const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useMutation(LOGIN_MUT);

  return <Prompt fn={login} />;
};

export default Login;
