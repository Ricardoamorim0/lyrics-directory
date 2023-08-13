<template>
  <div></div>
</template>

<script setup lang="ts">
import StorageService from '@/services/StorageService';

StorageService.removeUserData();
location.pathname = '';
</script>