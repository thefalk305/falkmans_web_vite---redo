<script setup>
// We need to import the Vue Functions we need:
import { ref, onMounted } from "vue";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

const router = useRouter();

const snackbar = ref(true);
var text = ref("");
const userid = ref("");

const errMsg = ref(); // ERROR MESSAGE
const dialog = ref(false);
const email = ref("thefalk305@hotmail.com");
const password = ref("MyFirebase305");
const form = ref();
const loading = ref(false);
const showPassword = ref(false);
const inputRules = [(v) => v.length >= 3 || "Minimun length is 3 characters"];

// Authentication state
const isAuthenticated = ref(false);

// Check authentication state on component mount
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
      userid.value = user.uid;
      console.log("User is signed in. UID: ", user.uid);
    } else {
      isAuthenticated.value = false;
      userid.value = "";
      console.log("User is not signed in.");
    }
  });
});

function checkForm() {
  if (password.value.length < 3 || email.value.length < 3) {
    alert("Minimun length is 3 characters");
    return false;
  } else {
    return true;
  }
}

const login = async () => {
  // we also renamed this method
  if (checkForm) {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      (text.value = "Successfully logged in!"),
        (snackbar.value = true),
        console.log(userCredential);
      console.log("Successfully logged in!");
      loading.value = false;
      dialog.value = false;

      // Get the user UID after successful login
      const user = userCredential.user;
      userid.value = user.uid;
      isAuthenticated.value = true;
      console.log("uid = ", user.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
      alert(errMsg.value);
    }
  }
};

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    isAuthenticated.value = false;
    userid.value = "";
    text.value = "Successfully logged out!";
    snackbar.value = true;
    console.log("User signed out successfully");
    // Optionally redirect or notify parent components of logout
  } catch (error) {
    console.error("Error signing out:", error);
    text.value = "Error logging out: " + error.message;
    snackbar.value = true;
  }
};
// fill the form from the firestorm document
async function openDialog() {
  dialog.value = true;
}
</script>

<template>
  <div>
    <!-- Show Logout button if authenticated -->
    <v-btn v-if="isAuthenticated" @click="logout" color="red" class="logout-btn">
      <slot name="logout-header">Logout</slot>
    </v-btn>

    <!-- Show Login button if not authenticated -->
    <div v-else>
      <v-btn @click="openDialog" color="green" class="success">
        <slot name="header"></slot>
      </v-btn>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <h2>
              <slot name="header"></slot>
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form" @submit.prevent>
              <v-text-field
                clearable
                v-model="email"
                label="Email"
                prepend-icon="mdi-email"
              >
              </v-text-field>
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                clearable
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              >
              </v-text-field>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn flat @click="login" :loading="loading"
                >Sign In
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>

  <div class="text-center">
    <v-snackbar v-model="snackbar" multi-line
      >{{ text }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style>
.logout-btn {
  margin-left: 10px;
}
</style>
