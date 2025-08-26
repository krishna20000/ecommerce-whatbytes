// src/utils/firestoreTest.js
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const testFirestoreConnection = async (userId) => {
  try {
    console.log('Testing Firestore connection...');
    
    // Test write
    const testRef = doc(db, 'test', userId);
    await setDoc(testRef, {
      test: true,
      timestamp: new Date().toISOString()
    });
    console.log('✅ Write test successful');
    
    // Test read
    const testDoc = await getDoc(testRef);
    if (testDoc.exists()) {
      console.log('✅ Read test successful:', testDoc.data());
    } else {
      console.log('❌ Read test failed - document not found');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Firestore test failed:', error);
    return false;
  }
}; 