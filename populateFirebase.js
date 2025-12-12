// Migration script to populate Firebase with data
import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, query, getDocs } from 'firebase/firestore';

// Read the JSON file
const infoTableContent = readFileSync('./src/assets/infotable.json', 'utf8');
const infoTable = JSON.parse(infoTableContent);

const firebaseConfig = {
  apiKey: "AIzaSyBR1DWfsLhPI3lMrtRWi2YL-GnHG303NnE",
  authDomain: "falkmansweb.firebaseapp.com",
  projectId: "falkmansweb",
  storageBucket: "falkmansweb.appspot.com",
  messagingSenderId: "593867354054",
  appId: "1:593867354054:web:ec4be455d670437d480cc7",
  measurementId: "G-76Y1306ZK7"
};

async function runMigration() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Starting migration of infotable.json to Firebase Firestore...');

  try {
    // Check if data already exists
    const peopleCollection = collection(db, 'people');
    const existingSnapshot = await getDocs(query(peopleCollection));

    if (!existingSnapshot.empty) {
      console.log(`Found ${existingSnapshot.size} existing records. Migration skipped to prevent duplicates.`);
      return;
    }

    // Add each person to Firestore
    let count = 0;
    for (const person of infoTable) {
      await setDoc(doc(db, 'people', person.id.toString()), person);
      count++;

      if (count % 10 === 0) {
        console.log(`Migrated ${count}/${infoTable.length} records...`);
      }
    }

    console.log(`Successfully migrated ${count} records to Firestore!`);
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
runMigration();