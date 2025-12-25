<script>
  import axios from "axios";
  import { reactive, ref, inject } from "vue";
  import databaseIo from "@/assets/js/databaseIo.js";

  // const { getProductById, updateProduct } = databaseIo;
  // const usejson = ref([]);
  // const infoTable = ref([]);
  // infoTable.value = inject("infoTable");
  // usejson.value = inject("usejson");

const dbData = {};
export default {
  data() {
    return {
      recordArray: ref([]),
    };
  },
  created: function () {
    this.getProductById();
  },
  methods: {
    // getProductById(this.recordInfo),
    //get product by id
    async getProductById() {
      try {
        const response = await axios.get(
          `http://localhost:5001/products/${this.$route.params.id}`
        );
        this.recordInfo = response.data;
        // build new Array of Objects (with key/value pairs)
        for (const [key, value] of Object.entries(this.recordInfo)) {
          this.recordArray.push({ key, value });
          // console.log({ key, value });
        }
        this.recordArray.shift(); // remove 'id' field
        console.log(this.recordArray);
      } catch (err) {
        console.log(err);
      }
    },
// updateProduct(this.recordArray),

    async updateProduct() {
      for (var i = 0; i < this.recordArray.length; i++) {
        dbData[this.recordArray[i].key] = this.recordArray[i].value;
      }
      console.log(dbData);
      try {
        await axios.put(
          `http://localhost:5001/products/${this.$route.params.id}`,
          dbData
        );
        this.$router.push("/InfoTable");
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      this.$router.push("/InfoTable");
    },
  },
};
</script>

<template>
  <div v-for="(value, key) in recordArray" :key="key">
    <div class="field" v-if="value.key != 'password' && value.key != 'username'">
      <label class="label">{{ value.key }}</label>
      <div class="control">
        <input class="input" type="text" placeholder="---" v-model="value.value" />
      </div>
    </div>
  </div>
  <div class="control">
    <button class="button is-info is-small" @click="updateProduct" disabled>UPDATE</button>
    <button class="button is-danger is-small" @click="cancel">CANCEL</button>
  </div>
</template>

<style>
  .button {
    margin: 10px;
  }
</style>
