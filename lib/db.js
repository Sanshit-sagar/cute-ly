import axios from 'axios';
import firebase from './firebase';
import { useAuth } from '../lib/auth'; 

const firestore = firebase.firestore();

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function createLinkFirestore(data) {
  const site = firestore.collection('links').doc(); 
  await site.set(data); 
  return site;
}

export async function updateLinkFirestore(siteId, data) {
  const site = firestore.collection('ghost_sites').doc(siteId);
  await site.set(data, { merge: true });
  return site;
}

export async function getSite(siteId) {
  const doc = await firestore.collection('ghost_sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return site;
}

export async function getAllSites() {
  const snapshot = await firestore
    .collection('links')
    .get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return sites; 
}

export async function createLink(payload) {
  var submissionLink = `${payload.url}`;
  var suffixOption = `${payload.mode}`; 
  
  const responseData = await axios({
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
    var newpl = storeLink(payload, tinyURL);
    
    var firestoreResponse = createLinkFirestore(newpl);
    console.log(firestoreResponse);

    return newpl; 
  })
  .catch(error => {
    console.log('Error...' + error.message);
    return error;
  });

  console.log(JSON.stringify(responseData)); 
  return responseData; 
};

function storeLink(payload, updatedUrl) {
  const user = firebase.auth().currentUser; 

  const userData = {
    email: user.email, 
    uid: user.uid
  };

  const linksRef = firebase.database().ref("/links"); 

  const transformedPayload = {
      url: payload.url,
      updatedUrl: updatedUrl,
      suffix: updatedUrl.substring(31), 
      uid: user.uid, 
      userData: userData,
      socials: payload.socials, 
      meta: payload.meta, 
      utm: payload.utm, 
      android: payload.android,
      ios: payload.ios, 
      mode: payload.mode,
      timestamp: new Date().toUTCString()
  };

  var newLinksRef = linksRef.push(transformedPayload); 
  
  var newpl = {
    ...transformedPayload,
    newRefId: newLinksRef.key
  };

  return newpl; 
};