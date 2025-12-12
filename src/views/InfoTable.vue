<script setup>
  //import axios
  // import axios from "axios";
  // import { onBeforeRouteLeave } from "vue-router";
  import { ref, inject, computed } from "vue";
  import { useInfoTableData } from "@/composables/useInfoTableData";
  import GoBack from "../components/GoBack.vue";
  import BackToTop from "../components/BackToTop.vue";

  var items = [];
  var keys = [];

  const { infoTable } = useInfoTableData();
  // export default {
  //   components: {
  //     BackToTop,
  //     GoBack,
  //   },
  //   data() {
  //     return {
  //       items: ref([]),
  //       keys: ref([]),
  //     };
  //   },

  //   created() {
  //     this.getProducts();
  //   },
  //   methods: {
  //     //get all products
  //     async getProducts() {
  //       try {
  //         const response = await axios.get("http://localhost:5001/products");
  //         this.items = response.data;
  //         this.keys = Object.keys(this.items[0]); // get first record to extract field names
  //         this.keys.shift(); // remove 'id' field
  //         this.keys.push("Actions"); // add 'Actions' row heading
  //         // for (const [key] of Object.entries(this.items[0])) {
  //         //   this.keysArray.push({ key });
  //         //   console.log({ key });
  //         // }
  //         // this.keysArray.shift(); // remove 'id' field
  //         // console.log(this.keysArray);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  //     //delete product
  //     async deleteProduct(id) {
  //       const answer = window.confirm("Are you sure you want to delete this product?");
  //       if (!answer) return;
  //       try {
  //         await axios.delete(`http://localhost:5001/products/${id}`);
  //         this.getProducts();
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  //   },
  // };

  items = computed(() => infoTable.value);
  keys = computed(() => {
    if (items.value && items.value.length > 0) {
      const keysArray = Object.keys(items.value[0]); // get first record to extract field names
      keysArray.shift(); // remove 'id' field
      keysArray.push("Actions"); // add 'Actions' row heading
      return keysArray;
    }
    return [];
  });
</script>
<template>
  <div id="infotable">
    <h2>Add/Edit are not functional when not using a database</h2>
    <router-link :to="'Create'" class="button is-success mt-5" :items="items"
      >Add New</router-link
    >
    <table class="table is-striped is-bordered mt-2">
      <thead class="tblHeading">
        <tr>
          <th>{{ keys[0] }}</th>
          <th>{{ keys[1] }}</th>
          <th class="has-text-centered">actions (disabled w/o database)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.birthplace }}</td>
          <td class="has-text-centered">

            <router-link
              :to="'Edit'" params: id: item.id
              class="button is-info is-small"
              :items="items"
              >Edit</router-link>


            <!-- <router-link
              :to="{ name: 'Edit', params: { id: Number(item.id) } }"
              class="button is-info is-small"
              :items="items"
              >Edit</router-link> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <BackToTop />
</template>

<style scoped>
  /*:-moz-any()
  @import "../../public/css/bulma.css";*/

  .tblHeading {
    text-align: left;
    font-weight: bolder;
    font-size: large;
    text-align: center;
  }
  /*
  #infotable {
    position: absolute;
    left: 200px;
    top: 240px;
  }
  */

  .button.is-success {
    background-color: #48c78e;
    border-color: transparent;
    color: #fff;
  }

  .table {
    margin: auto;
  }

  .table {
    background-color: white;
    color: #363636;
  }

  .table td,
  .table th {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
    padding: 0.5em 0.75em;
    vertical-align: top;
  }

  .table thead {
    background-color: transparent;
  }

  .table thead td,
  .table thead th {
    border-width: 0 0 2px;
    color: #363636;
  }

  .table tfoot {
    background-color: transparent;
  }

  .table tfoot td,
  .table tfoot th {
    border-width: 2px 0 0;
    color: #363636;
  }

  .table tbody {
    background-color: transparent;
  }

  .table tbody tr:last-child td,
  .table tbody tr:last-child th {
    border-bottom-width: 0;
  }

  .table.is-bordered td,
  .table.is-bordered th {
    border-width: 1px;
  }

  .table.is-bordered tr:last-child td,
  .table.is-bordered tr:last-child th {
    border-bottom-width: 1px;
  }
  .table.is-striped tbody tr:not(.is-selected):nth-child(even) {
    background-color: #fafafa;
  }

  .table-container {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    overflow-y: hidden;
    max-width: 100%;
  }
</style>
