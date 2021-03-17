import axios from 'axios';
import firebase from './firebase';

const firestore = firebase.firestore();

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function createLink(payload) {
  var submissionLink = `${payload.url}`;
  var suffixOption = `${payload.mode}`; 

  console.log(suffixOption); 
  
  const link = await axios({
    method: 'post',
    url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAidKEz9DskFNGp9XjfkMbZTYdnBIbpN0c',
    headers: {
      'Content-Type' : 'application/json',
    },
    data: {
        dynamicLinkInfo: {
            domainUriPrefix: 'https://sanshitsagar.page.link',
            link: submissionLink,
        },
        suffix: {
          option: suffixOption,
        },
      }
  })
  .then(response => {
    const tinyURL = response.data.shortLink; 
    console.log("Response: " + tinyURL);

    storeLink(payload, tinyURL); 

    alert("Your tiny URL is: " + tinyURL); 
  })
  .catch(error => {
    console.log('Error...'); 
    console.log(error);
  });
  console.log("DONE-EXITED");
};

const storeLink = (payload, updatedUrl) => {
  const user = firebase.auth().currentUser; 
  const userData = {
    email: user.email, 
    uid: user.uid, 
  }

  const linksRef = firebase.database().ref("/links"); 

  const transformedPayload = {
    ...payload, 
    responseData: {
      message: "SUCCESS", 
      timestamp: new Date().toUTCString(),
    }, 
    snackbar: {
      messageInfo: 'none'
    },
    updatedUrl: updatedUrl,
    suffix: updatedUrl.substring(31), 
    uid: user.uid, 
    userData: userData,
  };

  linksRef.push(transformedPayload); 
  console.log("DONE"); 

  return linksRef; 
};