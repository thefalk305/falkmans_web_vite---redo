<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const infoTable = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/infotable');
    infoTable.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div>
    <h1>Info Table Data</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Born/Died</th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in infoTable" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.born_died }}</td>
          <td>{{ item.father }}</td>
          <td>{{ item.mother }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
