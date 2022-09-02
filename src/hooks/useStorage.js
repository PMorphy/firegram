import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore } from '../firebase/config';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = serverTimestamp();
        const newDoc = { url, createdAt };

        try {
          const collectionRef = collection(projectFirestore, 'images');
          const { id } = await addDoc(collectionRef, newDoc);
          console.log('Document written with ID: ', id);
        } catch (error) {
          console.error('Error adding document: ', error);
        }

        setUrl(url);
      }
    );

    return () => {
      uploadTask.cancel();
    };
  }, [file]);

  return { progress, error, url };
}
