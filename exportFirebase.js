// Export script to sync Firebase data back to local JSON file
import { readFileSync, writeFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR1DWfsLhPI3lMrtRWi2YL-GnHG303NnE",
  authDomain: "falkmansweb.firebaseapp.com",
  projectId: "falkmansweb",
  storageBucket: "falkmansweb.appspot.com",
  messagingSenderId: "593867354054",
  appId: "1:593867354054:web:ec4be455d670437d480cc7",
  measurementId: "G-76Y1306ZK7"
};

async function exportFromFirebase() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    // Get all records from the 'people' collection
    const peopleCollection = collection(db, 'people');
    const snapshot = await getDocs(peopleCollection);
    
    const infoTable = [];
    snapshot.forEach(doc => {
      infoTable.push({
        id: parseInt(doc.id), // Convert string ID back to number
        ...doc.data()
      });
    });
    
    // Sort by ID to maintain consistent order
    infoTable.sort((a, b) => a.id - b.id);
    
    // Write to the local JSON file
    const outputPath = './src/assets/infotable.json';
    writeFileSync(outputPath, JSON.stringify(infoTable, null, 2));
    
    console.log(`Successfully exported ${infoTable.length} records from Firebase to ${outputPath}`);
  } catch (error) {
    console.error('Error exporting from Firebase:', error);
  }
}

// Run the export
exportFromFirebase();