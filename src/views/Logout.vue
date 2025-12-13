<script setup>
import { getAuth, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const logoutSuccess = ref(false);
const logoutMessage = ref("");

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    logoutMessage.value = "Successfully logged out!";
    logoutSuccess.value = true;
    console.log("User signed out successfully");

    // Redirect to home page after successful logout
    setTimeout(() => {
      router.push('/'); // Redirect to home page
    }, 1500);
  } catch (error) {
    console.error("Error signing out:", error);
    logoutMessage.value = "Error logging out: " + error.message;
    logoutSuccess.value = false;
  }
};

// Execute logout immediately when component is mounted
logout();
</script>

<template>
  <div class="logout-container">
    <div v-if="logoutSuccess" class="success-message">
      {{ logoutMessage }}
    </div>
    <div v-else-if="logoutMessage" class="error-message">
      {{ logoutMessage }}
    </div>
    <div v-else class="logging-out">
      Logging out...
    </div>
  </div>
</template>

<style scoped>
.logout-container {
  padding: 20px;
  text-align: center;
}

.success-message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}

.logging-out {
  color: #666;
}
</style>