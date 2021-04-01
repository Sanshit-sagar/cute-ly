// import { firestore } from './firebase-admin';

// export async function createUser(uid, data) {
//   return await firestore
//     .collection('users')
//     .doc(uid)
//     .set({ uid, ...data }, { merge: true });
// }

// export async function createLinkFirestore(data) {
//   const site = firestore.collection('links').doc(); 
//   await site.set(data); 
//   return site;
// }

// export async function getAllSites() {
//   const snapshot = await firestore
//     .collection('links')
//     .get();

//   const sites = [];

//   snapshot.forEach((doc) => {
//     sites.push({ id: doc.id, ...doc.data() });
//   });

//   return { sites }; 
// }