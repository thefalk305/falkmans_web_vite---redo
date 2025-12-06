<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

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

onMounted(() => {
  formData.value.id = Number(route.query.id);
  formData.value.groupId = Number(route.query.groupId);
  formData.value.memberIndex = Number(route.query.memberIndex);
  console.log('BranchForm mounted. Test message.'); // Added test log
});

async function submitForm() {
  try {
    const response = await axios.post('http://localhost:3001/api/infotable', formData.value);
    console.log('Server logs:', response.data.logs);
    window.close();
  } catch (error) {
    console.error("Error submitting form:", error);
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
  }
}

function cancel() {
  window.close();
}
</script>

<template>
  <div>
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
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
.button {
  margin-right: 0.5rem;
}
</style>