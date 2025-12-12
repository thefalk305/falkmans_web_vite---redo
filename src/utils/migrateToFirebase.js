import db from '@/fb';
import { collection, addDoc, query, getDocs, doc, setDoc, deleteDoc, where } from 'firebase/firestore';
import infoTable from '@/assets/infotable.json';

/**
 * Migrates the local infotable.json data to Firebase Firestore (one-way sync)
 */
export async function migrateInfoTableToFirebase() {
  try {
    console.log('Starting migration of infoTable to Firebase...');

    // Create a reference to the 'people' collection
    const peopleCollection = collection(db, 'people');

    // Get current data from Firestore
    const currentSnapshot = await getDocs(peopleCollection);
    const currentData = new Map();

    currentSnapshot.forEach(doc => {
      currentData.set(doc.id, doc.data());
    });

    // Add or update each person from the infoTable to Firestore
    let count = 0;
    for (const person of infoTable) {
      if (person.id < 9998) { // Only sync real person records, not placeholders
        // Create a document with the person's ID as the document ID
        await setDoc(doc(db, 'people', person.id.toString()), person);
        count++;

        if (count % 10 === 0) {
          console.log(`Migrated ${count}/${infoTable.length} records...`);
        }
      }
    }

    console.log(`Successfully migrated ${count} records to Firestore!`);
    return { success: true, count };
  } catch (error) {
    console.error('Error during migration:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches the family tree data from Firebase Firestore
 */
export async function fetchInfoTableFromFirebase() {
  try {
    const peopleCollection = collection(db, 'people');
    const querySnapshot = await getDocs(peopleCollection);

    const infoTable = [];
    querySnapshot.forEach((doc) => {
      infoTable.push({
        id: parseInt(doc.id), // Convert string ID back to number
        ...doc.data()
      });
    });

    // Sort by ID to maintain consistent order
    infoTable.sort((a, b) => a.id - b.id);

    return infoTable;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    throw error;
  }
}

/**
 * Synchronizes Firebase data back to the local infotable.json file
 */
export async function syncFirebaseToLocal() {
  try {
    console.log('Starting sync of Firebase data back to local infotable.json...');

    // Fetch data from Firestore
    const firebaseData = await fetchInfoTableFromFirebase();

    // Only keep records with IDs less than 9998 (real people, not placeholders)
    const filteredData = firebaseData.filter(person => person.id < 9998);

    // Sort by ID to maintain consistent order
    filteredData.sort((a, b) => a.id - b.id);

    // For this function to work in a browser environment, we'll return the data
    // The actual file writing would happen in a Node.js script
    return filteredData;
  } catch (error) {
    console.error('Error during sync back to local:', error);
    throw error;
  }
}

/**
 * Gets a count of records in Firebase
 */
export async function getFirebaseRecordCount() {
  try {
    const peopleCollection = collection(db, 'people');
    const querySnapshot = await getDocs(peopleCollection);

    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting record count:', error);
    return 0;
  }
}