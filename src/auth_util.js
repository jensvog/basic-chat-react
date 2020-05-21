import { Auth } from 'aws-amplify';

export async function getUserName() {
    const session = await Auth.currentSession();
    return session.getIdToken().decodePayload()['cognito:username'];
}

export async function signOut() {
    Auth.signOut();
}

export async function getHeaderConfig() {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}