import axios from 'axios';
import firebase from './firebase';

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

export async function getAllSites() {
  const snapshot = await firestore
    .collection('links')
    .get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites }; 
}

export async function createLink(payload, submissionLink) {
  var submissionLink = `${submissionLink}`;
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
    const data = {
      shortLink: response.data.shortLink,
      previewLink: response.data.previewLink, 
      data: response.data,
    }
    return data; 
  })
  .catch(error => {
    console.log('Error...' + error.message);
    return error;
  });

  return responseData; 
};

export const getUserLinks = async (userId) => {
  var links = []; 
  const uid = firebase.auth().currentUser.uid; 

  const data = await firebase.database().child('user-links').child(uid).get().then(function(snapshot) {
    if(snapshot.exists()) {
      console.log(snapshot.val());
      var tempLinks = []; 
      
      snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key; 
          const data = childSnapshot.val();
          
          const newEntry = { id: data.suffix, ...sanitizeData(key, data)};
          tempLinks.push(newEntry);
      });
    
      links = tempLinks.reverse();
    } 
    else {
        console.log("Snapshot doesn't exist");
        return links;
    }
  }).catch(function(error) {
      console.error(error);
  });

  return { links, data };
}