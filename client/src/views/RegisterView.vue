<template>
  <div class="form-authentication-holder">
    <div class="form-authentication">
      <h1>Create your account!</h1>
      <hr />
      <form>
        <AlertHolder v-if="alert" :text="alertText" class="alert-holder-form"/>
        <LabelledInput ref="nameInput" type="text" input-name="Name" :need-length="true" :min-length="nameMinLength" :max-length="nameMaxLength" label="name" :required="true" autocomplete="name" v-model="name"/>
        <LabelledInput ref="emailInput" type="email" input-name="Email" label="Email" :required="true" :need-length="true" :min-length="emailMinLength" :max-length="emailMaxLength" autocomplete="email" v-model="email"/>
        <LabelledInput ref="passwordInput" type="password" input-name="Password" :need-length="true" :min-length="passwordMinLength" :max-length="passwordMaxLength" label="Password" :required="true" autocomplete="new-password" v-model="password"/>
        
        <input type="submit" name="submit" id="register_submit" value="Register" @click.stop.prevent="register"/>
      </form>
      <p>If you already have an account, <a href="/login">try log in!</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertHolder from '@/components/AlertHolder.vue';
import LabelledInput from '@/components/LabelledInput.vue';
import AuthenticationService from '@/services/AuthenticationService';
import constants from '@/constants/constants.js';

import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

const alert = ref(false);
const alertText = ref('');

const nameMinLength = constants.MIN_NAME_LENGTH;
const emailMinLength = constants.MIN_EMAIL_LENGTH;
const passwordMinLength = constants.MIN_PASSWORD_LENGTH;

const nameMaxLength = constants.MAX_NAME_LENGTH;
const emailMaxLength = constants.MAX_EMAIL_LENGTH;
const passwordMaxLength = constants.MAX_PASSWORD_LENGTH;

const nameInput = ref<InstanceType<typeof LabelledInput> | null>(null);
const passwordInput = ref<InstanceType<typeof LabelledInput> | null>(null);
  
async function register() {
  if (name.value.length === 0 || email.value.length === 0 || password.value.length === 0 || name.value.length > nameMaxLength || name.value.length < nameMinLength) {
    nameInput.value?.focus();
  } else if (password.value.length > passwordMaxLength || password.value.length < passwordMinLength) {
    passwordInput.value?.focus();
  } else {
    const response = await AuthenticationService.register({ name: name.value, email: email.value, password: password.value });
    if (response.data.success !== undefined) {
      if (response.data.success) {
        alertText.value = response.data.message;
        alert.value = true;
      } else {
        location.pathname = 'login';
      }
    }
  }
}

</script>