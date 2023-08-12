<template>
  <div class="form-authentication-holder">
    <div class="form-authentication">
      <h1>Enter in your account!</h1>
      <hr />
      <form>
        <AlertHolder v-if="alert" :text="alertText" class="alert-holder-form"/>
        <LabelledInput ref="emailInput" type="email" input-name="Email" label="Email" :required="true" autocomplete="email" v-model="email"/>
        <LabelledInput ref="passwordInput" type="password" input-name="Password" :need-length="true" :max-length="passwordMaxLength" label="Password" :required="true" autocomplete="new-password" v-model="password"/>
        
        <input type="submit" name="submit" id="login_submit" value="Login" @click.stop.prevent="login"/>
      </form>
      <p>If you don't have an account, <a href="/register">try to register!</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertHolder from '@/components/AlertHolder.vue';
import LabelledInput from '@/components/LabelledInput.vue';
import AuthenticationService from '@/services/AuthenticationService';

import { ref } from 'vue';

const email = ref('');
const password = ref('');

const alert = ref(false);
const alertText = ref('');

const passwordMaxLength = 50;

const emailInput = ref<InstanceType<typeof LabelledInput> | null>(null);
const passwordInput = ref<InstanceType<typeof LabelledInput> | null>(null);
  
async function login() {
  if (email.value.length === 0 || password.value.length === 0) {
    emailInput.value?.focus();
  } else if (password.value.length > passwordMaxLength) {
    passwordInput.value?.focus();
  } else {
    const response = await AuthenticationService.login({ email: email.value, password: password.value });
    if (response.data.success !== undefined) {
      if (response.data.success) {
        alertText.value = response.data.message;
        alert.value = true;
      } else {
        location.pathname = '';
      }
    }
  }
}

</script>