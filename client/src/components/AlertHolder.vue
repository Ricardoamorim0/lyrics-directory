<template>
  <div class="alert-holder">
    <p>{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  message: string
}>();

</script>