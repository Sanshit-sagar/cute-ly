import React, { 
  useState, 
  useEffect, 
  useContext, 
  createContext 
} from 'react';

import Router from 'next/router';
import firebase from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    console.log('handleUser called', new Date());
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithEmail = (email, password, redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Email/Password Authentication Successful");
        handleUser(response.user);
        setLoading(false);
        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        var errorData = error.data; 
        console.log("Email/Password Authentication Failure");
        console.log(errorMessage); 
        alert(errorMessage);
      });
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log("Google Authentication Successful");
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        var errorData = error.data; 
        console.log("Google Authentication Failure");
        console.log(errorMessage); 
      });
  };

  const signinWithGitHub = (redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
        console.log("Github Authentication Successful");
        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        var errorData = error.data; 
        console.log("Github Authentication Failure");
        console.log(errorMessage); 
      });
  };


  const signinWithTwitter = (redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((response) => {
        console.log("Twitter Authentication Successful"); 
        handleUser(response.user);
       
        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => {
        var errorMessage = error.message;
        var errorData = error.data; 
        console.log("Twitter Authentication Failure");
        console.log(errorMessage); 
        
      });
  };

  const allLinks = () => {
      var result = []; 

      try {
        result = firebase.database.ref(`links`); 
      } catch (error) {
        console.log(error); 
      }
      return result; 
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const getFreshToken = async () => {
    console.log('getFreshToken called', new Date());
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(false);
      return `${token}`;
    } else {
      return '';
    }
  };

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGitHub,
    signinWithTwitter,
    signinWithGoogle,
    signout,
    getFreshToken,
  };
}

const formatUser = async (user) => {
  const decodedToken = await user.getIdTokenResult(true);
  const { token, expirationTime } = decodedToken;

  const emailShortened = user.email.split('@');

  // console.log(token);

  return {
    uid: user.uid,
    email: user.email,
    name: !user.displayName ? emailShortened[0] : user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
    expirationTime,
  };
};