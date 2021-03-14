
// import { compareDesc, compareAsc, parseISO } from 'date-fns';
// import axios from 'axios';
import firebase from './firebase'; 
const firestore = firebase.firestore();

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

// export async function createPreview(siteId, slug, data) {
//   await firestore
//     .collection('user_links')
//     .doc(siteId)
//     .collection('pages')
//     .doc(slug)
//     .set(data);
// }
