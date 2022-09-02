import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const useFirestore = (col) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(projectFirestore, 'images'),
      (snapshot) => {
        let documents = [];
        snapshot.forEach((doc) =>
          documents.push({
            ...doc.data(),
            id: doc.id
          })
        );
        setDocs(documents);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [col]);

  return { docs };
};

export default useFirestore;
