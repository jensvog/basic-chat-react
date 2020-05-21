import { Auth } from 'aws-amplify';

export async function getUserName() {
    const session = await Auth.currentSession();
    return session.getIdToken().decodePayload()['cognito:username'];
}

export async function signOut() {
    Auth.signOut();
}