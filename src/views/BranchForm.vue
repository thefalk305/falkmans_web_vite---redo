<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import db from '@/fb';

const route = useRoute();
const router = useRouter();

const formData = ref({
  id: null,
  groupId: null,
  memberIndex: null,
  name: '',
  born_died: '',
  father: '',
  mother: '',
  famSrchLink: '',
  pic: '',
  bio: '',
});

const isAuthenticated = ref(false);
const authCheckComplete = ref(false);
const errorMessage = ref('');

onBeforeMount(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
      // User is signed in, allow access to form
    } else {
      // User is signed out, redirect to login
      errorMessage.value = 'You must be logged in to add or edit people.';
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
    authCheckComplete.value = true;
  });
});

onMounted(() => {
  if (isAuthenticated.value) {
    formData.value.id = Number(route.query.id);
    formData.value.groupId = Number(route.query.groupId);
    formData.value.memberIndex = Number(route.query.memberIndex);

    // Set default picture based on the ID
    // ID 9998 is for adding father, ID 9999 is for adding mother
    if (formData.value.id === 9998) {
      // Add father - default to face2.png
      formData.value.pic = 'face2.png';
    } else if (formData.value.id === 9999) {
      // Add mother - default to face1.png
      formData.value.pic = 'face1.png';
    }

    console.log('BranchForm mounted. Test message.'); // Added test log
  }
});

async function submitForm() {
  try {
    // Check if this is a placeholder ID (9998 or 9999) that needs to be replaced with a new ID
    // or if we have a regular ID that should be updated
    let targetId = formData.value.id;
    let isUpdateOperation = targetId && targetId < 9998; // IDs less than 9998 are real person IDs

    // If we have a placeholder ID (9998 or 9999) or no ID, we need to generate a new ID
    if (!targetId || targetId >= 9998) {
      // For new records, find the highest existing ID (less than 9998) and increment it
      // This maintains consistency with the existing ID system
      const { getDocs, query, orderBy, where } = await import('firebase/firestore');
      const peopleRef = collection(db, 'people');
      // Query only for documents with ID < 9998 (real person IDs, not placeholders)
      const q = query(peopleRef, where('id', '<', 9998), orderBy('id', 'desc'));
      const snapshot = await getDocs(q);

      targetId = 1; // Default to 1 if no documents exist
      if (!snapshot.empty) {
        const highestIdDoc = snapshot.docs[0];
        const highestId = highestIdDoc.data().id;
        targetId = highestId + 1;
      }

      isUpdateOperation = false; // This will be a new record with the generated ID
    }

    if (isUpdateOperation) {
      // Update existing document
      await setDoc(doc(db, 'people', targetId.toString()), {
        ...formData.value,
        id: targetId  // Ensure ID is included
      });
    } else {
      // Add new document with the calculated targetId
      await setDoc(doc(db, 'people', targetId.toString()), {
        ...formData.value,
        id: targetId  // Add the calculated ID to the document
      });
    }

    console.log('Data saved successfully to Firestore with ID:', targetId);
    window.close();
  } catch (error) {
    console.error("Error submitting form to Firestore:", error);
  }
}

function cancel() {
  window.close();
}
</script>

<template>
  <div>
    <div v-if="!authCheckComplete">
      <p>Checking authentication status...</p>
    </div>
    <div v-else-if="!isAuthenticated">
      <p class="error-message">{{ errorMessage }}</p>
      <p>Redirecting to login...</p>
    </div>
    <div v-else>
      <h3>Add New Person</h3>
      <form @submit.prevent="submitForm">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="formData.name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Born/Died</label>
          <div class="control">
            <input class="input" type="text" v-model="formData.born_died" />
          </div>
        </div>
        <div class="field">
          <label class="label">Father</label>
          <div class="control">
            <input class="input" type="text" v-model="formData.father" />
          </div>
        </div>
        <div class="field">
          <label class="label">Mother</label>
          <div class="control">
            <input class="input" type="text" v-model="formData.mother" />
          </div>
        </div>
        <div class="field">
          <label class="label">FamilySearch Link</label>
          <div class="control">
            <input class="input" type="text" v-model="formData.famSrchLink" />
          </div>
        </div>
        <div class="field">
          <label class="label">Picture</label>
          <div class="control">
            <input class="input" type="text" v-model="formData.pic" />
          </div>
        </div>
        <div class="field">
          <label class="label">Bio</label>
          <div class="control">
            <textarea class="textarea" v-model="formData.bio"></textarea>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary" type="submit">Submit</button>
          <button class="button is-light" @click="cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
.button {
  margin-right: 0.5rem;
}
.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>