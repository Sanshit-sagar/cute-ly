import { auth } from './firebase-admin';

export function withAuth(handler) {
  console.log("Inside middleware.js"); 

  return async (req, res) => {
    return handler(req, res); 
  };
}