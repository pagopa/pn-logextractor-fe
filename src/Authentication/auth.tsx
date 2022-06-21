import awsmobile from "./aws-exports"
import Amplify, { Auth } from 'aws-amplify';
import { setStorage, resetStorage, getStorage, deleteStorage } from "./storage";
import { CognitoUser } from "@aws-amplify/auth";

type Props = {
  /**
   * the username for logging
   */
  email: string,
  /**
   * the password for logging
   */
  password: string,
}

Amplify.configure(awsmobile);

/**
 * 
 * @param {Object} data login data
 * @returns 
 */
const login = ({ email, password }: Props): Promise<any> => {
    return Auth.signIn(email, password)
        .then(async (user) => {
            if(user.challengeName === "NEW_PASSWORD_REQUIRED"){
                return await setStorage("session", user.Session).then(() => user)
            }else{
                    const token = user.signInUserSession.accessToken.jwtToken;
                    const refreshToken = user.signInUserSession.refreshToken.token;
                    return await Promise.allSettled([
                        setStorage("token", token),
                        setStorage("refreshToken", refreshToken)
                    ]).then(() => user)
            }
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * logout the user
 * @returns 
 */
const logout = async(): Promise<any> => {
    return Auth.signOut()
        .then(async (res) => {
            await resetStorage().then(res => res)
        })
        .catch((error: any) => {
                throw error;
            })
}

const refreshToken = async () => {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        // This method will automatically refresh the accessToken and idToken if tokens are expired
        const currentSession = await Auth.currentSession(); 
        const refreshToken =  currentSession.getRefreshToken();         
            cognitoUser.refreshSession(refreshToken, (err: any, session: any) => {
                console.log('session', err, session);
            });
        } catch (e) {
            console.log('Unable to refresh Token', e);
        }
}


/**
 * for changing password adter the first login
 * @param user 
 * @param newPassword 
 * @returns 
 */
const changePassword = (user: any, newPassword: string): Promise<any> => {
    console.log(user)
    return Auth.completeNewPassword(user, newPassword)
        .then(async (user:any) => {
                console.log(user);
                const token = user.signInUserSession.accessToken.jwtToken;
                const refreshToken = user.signInUserSession.refreshToken.token;
                return await Promise.allSettled([
                    setStorage("token", token),
                    setStorage("refreshToken", refreshToken),
                    deleteStorage("session")
                ]).then(() => user)
        })
        .catch((error: any) => {
            throw error;
        })
}

export { login, logout, refreshToken, changePassword }