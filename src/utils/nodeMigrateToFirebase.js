// Node.js compatible migration script for Firebase
// This script should run with the proper environment setup

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, query, getDocs, doc, setDoc } = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR1DWfsLhPI3lMrtRWi2YL-GnHG303NnE",
  authDomain: "falkmansweb.firebaseapp.com",
  projectId: "falkmansweb",
  storageBucket: "falkmansweb.appspot.com",
  messagingSenderId: "593867354054",
  appId: "1:593867354054:web:ec4be455d670437d480cc7",
  measurementId: "G-76Y1306ZK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load the infoTable data
const infoTable = require('../assets/infotable.json');

/**
 * Migrates the local infotable.json data to Firebase Firestore
 */
async function migrateInfoTableToFirebase() {
  try {
    console.log('Starting migration of infoTable to Firebase...');
    
    // Create a reference to the 'people' collection
    const peopleCollection = collection(db, 'people');
    
    // First, check if data already exists to avoid duplication
    const existingDataQuery = query(peopleCollection);
    const existingSnapshot = await getDocs(existingDataQuery);
    
    if (!existingSnapshot.empty) {
      console.log(`Found ${existingSnapshot.size} existing records in Firestore. Migration skipped to avoid duplicates.`);
      return { success: false, message: 'Data already exists in Firestore' };
    }
    
    // Add each person from the infoTable to Firestore
    let count = 0;
    for (const person of infoTable) {
      // Create a document with the person's ID as the document ID
      await setDoc(doc(db, 'people', person.id.toString()), person);
      count++;
      
      if (count % 10 === 0) {
        console.log(`Migrated ${count}/${infoTable.length} records...`);
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
async function fetchInfoTableFromFirebase() {
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

// Run the migration if this script is executed directly
if (require.main === module) {
  migrateInfoTableToFirebase()
    .then(result => {
      console.log('Migration completed:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = {
  migrateInfoTableToFirebase,
  fetchInfoTableFromFirebase
};