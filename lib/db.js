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

  // console.log(JSON.stringify(responseData)); 
  return responseData; 
};

function storeLink(payload, updatedUrl) {
  const user = firebase.auth().currentUser; 

  const userData = {
    email: user.email, 
    uid: user.uid
  };

  const linksRef = firebase.database().ref("/links"); 

  // console.log(payload); 

  const nonNulls = getNonNulls(payload.utm, payload.ios, payload.android, payload.meta, payload.counts);

  const transformedPayload = {
      title: payload.nickname,
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
      analyticsData: nonNulls, 
      timestamp: new Date().toUTCString()
  };

  var newLinksRef = linksRef.push(transformedPayload); 
  
  var newpl = {
    ...transformedPayload,
    newRefId: newLinksRef.key
  };

  return newpl; 
};

const getNonNulls = (utmData, iosData, androidData, metaData, counts) => {
  let collatedList = []; 

  if(counts['utm'] > 0) {
    collatedList = getNonNullsFromGroup('utm', utmData, collatedList); 
  }
  if(counts['ios'] > 0) {
    collatedList = getNonNullsFromGroup('ios', iosData, collatedList);
  }
  if(counts['android'] > 0) {
    collatedList = getNonNullsFromGroup('android', androidData, collatedList);
  }
  if(counts['meta'] > 0) {
    collatedList = getNonNullsFromGroup('meta', metaData, collatedList);
  }
  
  return collatedList; 
}

const getNonNullsFromGroup = (analyticsGroup, data, collatedList) => {
  Object.entries(data).forEach(([key, value]) => {
    if(value.length > 0) {
      collatedList.push({ 
        group: analyticsGroup,
        key: key,
        value: value,
      }); 
    }
  });
  return collatedList; 
}