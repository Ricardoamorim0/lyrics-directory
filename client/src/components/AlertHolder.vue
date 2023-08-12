<script setup lang="ts">

defineProps<{
  text: string
}>();

</script>

<template>
  <div class="alert-holder">
    <p>{{ text }}</p>
  </div>
</template>