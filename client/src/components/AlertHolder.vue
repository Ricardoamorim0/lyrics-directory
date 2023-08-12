<template>
  <div class="alert-holder">
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  text: string
}>();

</script>