<!-- prettier-ignore-file -->
<script setup>
  import { reactive, ref, computed } from "vue";
  // import Bio from "text-loader!./thefalk.txt";
  import axios from "axios";

  const props = defineProps({
    recordData: Object,
  });
  const infopageURL = `http://localhost/new_falkmansweb/infopages/infopage.php?id=${props.recordData.id}`;
  const famSrchURL = `https://www.familysearch.org/en/tree/person/details/${props.recordData.famSrchLink}`;

//   const familySrchLink = computed(() =>
//   record.value && record.value.famSrchLink
//     ? `https://www.familysearch.org/en/tree/person/details/${record.value.famSrchLink}`
//     : `https://www.familysearch.org/tree/person/details/LL4N-B4F`
// );

</script>

<template>
  <div id="navbar">
    <a data-dismiss="modal" target="_blank" data-toggle="modal" href="http://falkmanfamily.com"
      >Falkman Family</a
    >
    <!-- <a :href="infopageURL" target="_blank" rel="noopener noreferrer">Info<br />Page</a> -->
    <a :href="famSrchURL" target="_blank" rel="noopener noreferrer">Family Search</a>
    <!-- <div class="dropdown">
      <button class="dropbtn">
        Dropdown
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="http://falkmanfamily.com" target="_blank" rel="noopener noreferrer"
          >Falkman<br />Family</a
        >
        <a href="#">Link 2</a>
        <a href="#" style="border-radius: 0px 0px 20px 20px">Link 3</a>
      </div>
    </div>
    <div class="dropdown">
      <button class="dropbtn">
        Dropdown
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a
          href="http://localhost/new_falkmansweb/index.php"
          rel="noopener noreferrer"
          target="_blank"
          >Falman's<br />Web</a
        >
        <a href="#">Link 4</a>
        <a href="#" style="border-radius: 0px 0px 20px 20px">Link 5</a>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
  @import "../../public/css/fontawesome.min.css";

  #navbar {
    overflow: visible;
    background-color: rgba(0, 102, 0, 0.2);
    margin: 0px 20px;
    /* border: 2px solid green; */
    box-shadow: 0px 0px 10px 2px rgb(0 102 0 / 40%);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.2em;
    /* font-weight: bold;
    color: #006600; */
    line-height: 100%;
    border: 1px solid green;
    /* padding: 10px; */
    height: 48px;
  }

  #navbar a {
    float: left;
    font-size: 16px;
    color: #006600;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 0.925em;
    font-weight: bold;
    color: #006600;
    line-height: 100%;
    padding-bottom: 5px;
  }

  .dropdown {
    float: left;
  }

  .dropdown .dropbtn {
    font-size: 14px;
    border: none;
    outline: none;
    color: #006600;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
    font-weight: bold;
    color: #006600;
    line-height: 100%;
    padding-bottom: 5px;
  }

  .navbar a:hover,
  .dropdown:hover .dropbtn {
    background-color: rgba(0, 102, 0, 0.3);
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: rgba(0, 102, 0, 0.3);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(00, 66, 00, 0.6);
    z-index: 1;
    border: 1px solid green;
    border-radius: 0px 0px 20px 20px;
  }

  .dropdown-content a {
    float: none;
    color: #006600;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    background-color: rgba(00, 66, 00, 0.4);
  }

  .dropdown-content a:hover {
    background-color: rgba(90, 102, 0, 0.6);
    opacity: 1;
    z-index: 3;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>
