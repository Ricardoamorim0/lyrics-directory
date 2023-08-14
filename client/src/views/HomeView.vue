<template>
  <div>
    <div class="form-authentication-holder">
      <div class="form-authentication">
        <h1>Search your lyrics!</h1>
        <hr />
        <form>
          <LabelledInput 
          ref="seacrhInput" 
          type="text" 
          input-name="Write a song name" 
          label="Search" 
          :required="false" 
          :need-length="false" 
          autocomplete="search" 
          :search-button="true"
          v-model="searchValue"
          @submit="console.log(searchValue)"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LabelledInput from '@/components/LabelledInput.vue';
import { ref } from 'vue';

const searchValue = ref('');

</script>

<style scoped>



</style>
