// Migration and sync utility script
// This script provides tools for migrating and synchronizing data between local JSON and Firebase

import { migrateInfoTableToFirebase, syncFirebaseToLocal, getFirebaseRecordCount } from './utils/migrateToFirebase';

async function runMigration() {
  console.log('Starting migration to Firebase...');

  const result = await migrateInfoTableToFirebase();

  if (result.success) {
    console.log(`Migration completed successfully! Migrated ${result.count} records.`);
  } else {
    console.log(`Migration result: ${result.message || 'Failed'}`);
  }

  const count = await getFirebaseRecordCount();
  console.log(`Current record count in Firebase: ${count}`);
}

async function runSyncBack() {
  console.log('Sync from Firebase to local is available via the exportFirebase.js Node.js script');
  console.log('Please run: node exportFirebase.js from the project root');
}

// Create buttons to run operations manually if needed
function createSyncButtons() {
  // Migration button (JSON to Firebase)
  const migrationBtn = document.createElement('button');
  migrationBtn.textContent = 'Sync JSON to Firebase';
  migrationBtn.style.position = 'fixed';
  migrationBtn.style.top = '10px';
  migrationBtn.style.right = '10px';
  migrationBtn.style.zIndex = '9999';
  migrationBtn.style.padding = '10px';
  migrationBtn.style.backgroundColor = '#4CAF50';
  migrationBtn.style.color = 'white';
  migrationBtn.style.border = 'none';
  migrationBtn.style.borderRadius = '4px';
  migrationBtn.style.cursor = 'pointer';
  migrationBtn.style.marginBottom = '5px';

  migrationBtn.addEventListener('click', async () => {
    migrationBtn.textContent = 'Syncing...';
    migrationBtn.disabled = true;
    await runMigration();
    migrationBtn.textContent = 'Sync Complete!';
  });

  // Info button
  const infoBtn = document.createElement('button');
  infoBtn.textContent = 'Check Firebase Records';
  infoBtn.style.position = 'fixed';
  infoBtn.style.top = '60px';
  infoBtn.style.right = '10px';
  infoBtn.style.zIndex = '9999';
  infoBtn.style.padding = '10px';
  infoBtn.style.backgroundColor = '#2196F3';
  infoBtn.style.color = 'white';
  infoBtn.style.border = 'none';
  infoBtn.style.borderRadius = '4px';
  infoBtn.style.cursor = 'pointer';

  infoBtn.addEventListener('click', async () => {
    const count = await getFirebaseRecordCount();
    infoBtn.textContent = `Records: ${count}`;
    setTimeout(() => {
      infoBtn.textContent = 'Check Firebase Records';
    }, 2000);
  });

  // Sync back button (Firebase to JSON)
  const syncBackBtn = document.createElement('button');
  syncBackBtn.textContent = 'Sync Firebase to Local';
  syncBackBtn.style.position = 'fixed';
  syncBackBtn.style.top = '110px';
  syncBackBtn.style.right = '10px';
  syncBackBtn.style.zIndex = '9999';
  syncBackBtn.style.padding = '10px';
  syncBackBtn.style.backgroundColor = '#FF9800';
  syncBackBtn.style.color = 'white';
  syncBackBtn.style.border = 'none';
  syncBackBtn.style.borderRadius = '4px';
  syncBackBtn.style.cursor = 'pointer';

  syncBackBtn.addEventListener('click', () => {
    // Show instructions to run the export script
    alert('To sync Firebase back to local JSON:\n\n1. Open a terminal/command prompt\n2. Navigate to the project root directory\n3. Run the command: node exportFirebase.js');

    // Copy the command to clipboard for convenience
    navigator.clipboard.writeText('node exportFirebase.js').then(() => {
      console.log('Command "node exportFirebase.js" copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy command: ', err);
    });
  });

  document.body.appendChild(migrationBtn);
  document.body.appendChild(infoBtn);
  document.body.appendChild(syncBackBtn);
}

// Add the sync buttons to the page
createSyncButtons();

export { runMigration, runSyncBack };