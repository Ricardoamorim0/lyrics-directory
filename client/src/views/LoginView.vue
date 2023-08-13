<template>
  <div class="form-authentication-holder">
    <div class="form-authentication">
      <h1>Enter in your account!</h1>
      <hr />
      <form>
        <AlertHolder v-if="alert" :title="alertTitle" :message="alertMessage" class="alert-holder-form"/>
        <LabelledInput ref="emailInput" type="email" input-name="Email" label="Email" :required="true" :need-length="true" :min-length="emailMinLength" :max-length="emailMaxLength" autocomplete="email" v-model="email"/>
        <LabelledInput ref="passwordInput" type="password" input-name="Password" :need-length="true" :min-length="passwordMinLength" :max-length="passwordMaxLength" label="Password" :required="true" autocomplete="new-password" v-model="password"/>
        
        <input type="submit" name="submit" id="login_submit" value="Login" @click.stop.prevent="login"/>
      </form>
      <p>If you don't have an account, <a href="/register">try to register!</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertHolder from '@/components/AlertHolder.vue';
import LabelledInput from '@/components/LabelledInput.vue';
import constants from '@/constants/constants';
import AuthenticationService from '@/services/AuthenticationService';
import StorageService from '@/services/StorageService';

import { ref } from 'vue';

const email = ref('');
const password = ref('');

const alert = ref(false);
const alertTitle = ref('');
const alertMessage = ref('');

const emailMinLength = constants.MIN_EMAIL_LENGTH;
const passwordMinLength = constants.MIN_PASSWORD_LENGTH;

const emailMaxLength = constants.MAX_EMAIL_LENGTH;
const passwordMaxLength = constants.MAX_PASSWORD_LENGTH;

const emailInput = ref<InstanceType<typeof LabelledInput> | null>(null);
const passwordInput = ref<InstanceType<typeof LabelledInput> | null>(null);
  
async function login() {
  if (email.value.length === 0 || email.value.length > emailMaxLength || email.value.length < emailMinLength) {
    emailInput.value?.focus();
  } else if (password.value.length === 0 || password.value.length > passwordMaxLength || password.value.length < passwordMinLength) {
    passwordInput.value?.focus();
  } else {
    try {
      const response = await AuthenticationService.login({ email: email.value, password: password.value });

      StorageService.setUser(`{ id: ${response.data.user.id}, name: ${response.data.user.name}, email: ${response.data.user.email} }`);
      StorageService.setToken(response.data.token);
      StorageService.setUserLoggedIn(true);
      
      location.pathname = '';
    } catch (error: any) {
      alertTitle.value = error.response.data.title;
      alertMessage.value = error.response.data.message;
      alert.value = true;
    }
  }
}

</script>