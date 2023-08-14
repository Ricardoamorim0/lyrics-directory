<template>
  <div>
    <nav class="navigation-bar">
      <a href="/">LyricsDirectory</a>
      <div v-if="!userLoggedIn">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
      <div v-else>
        <a href="/profile">{{ user.name }}</a>
        <a href="/logout">Logout</a>
      </div>
    </nav>
    <hr />
  </div>
</template>

<script setup lang="ts">
import StorageService from '@/services/StorageService';
import { computed } from 'vue';


const userLoggedIn = computed(() => StorageService.getUserLoggedIn());
const user = computed(() => StorageService.getUser());

</script>
