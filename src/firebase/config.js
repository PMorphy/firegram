import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA-T_YmxP31TfMNfvvkc9TKmR1fp_LpRgc',
  authDomain: 'firegram-5a909.firebaseapp.com',
  projectId: 'firegram-5a909',
  storageBucket: 'firegram-5a909.appspot.com',
  messagingSenderId: '366443528203',
  appId: '1:366443528203:web:aea6107d73d070f480070e'
};

const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore };
