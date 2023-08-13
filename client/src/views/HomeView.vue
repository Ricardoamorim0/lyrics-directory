<template>
   <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <p v-if="userLoggedIn">User logged in!</p>
  </header>
</template>

<script setup lang="ts">
import StorageService from '@/services/StorageService';
import { computed } from 'vue';


const userLoggedIn = computed(() => StorageService.getUserLoggedIn());

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
