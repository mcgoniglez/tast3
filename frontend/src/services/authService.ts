import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';

Amplify.configure(awsConfig);

export async function signIn(username: string, password: string) {
  return await Amplify.signIn(username, password);
}

export async function signUp(username: string, password: string, email: string) {
  return await Amplify.signUp({
    username,
    password,
    attributes: {
      email,
    },
  });
}

export async function signOut() {
  return await Amplify.signOut();
}
