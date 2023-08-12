<template>
  <div id="register">
    <div class="form_authentication">
      <h1>Create your account!</h1>
      <hr />
      <form>
        <AlertHolder v-if="alert" :text="alertText" class="alert-holder-form"/>
        <LabelledInput ref="nameInput" type="text" input-name="Name" :need-length="true" :max-length="nameMaxLength" label="name" :required="true" autocomplete="name" v-model="name"/>
        <LabelledInput ref="emailInput" type="email" input-name="Email" label="Email" :required="true" autocomplete="email" v-model="email"/>
        <LabelledInput ref="passwordInput" type="password" input-name="Password" :need-length="true" :max-length="passwordMaxLength" label="Password" :required="true" autocomplete="new-password" v-model="password"/>
        
        <input type="submit" name="submit" id="register_submit" value="Register" @click.stop.prevent="register"/>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertHolder from '@/components/AlertHolder.vue';
import LabelledInput from '@/components/LabelledInput.vue';
import AuthenticationService from '@/services/AuthenticationService';

import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

const alert = ref(false);
const alertText = ref('');

const nameMaxLength = 50;
const passwordMaxLength = 50;

const nameInput = ref<InstanceType<typeof LabelledInput> | null>(null);
const passwordInput = ref<InstanceType<typeof LabelledInput> | null>(null);
  
async function register() {
  if (name.value.length === 0 || email.value.length === 0 || password.value.length === 0 || name.value.length > nameMaxLength) {
    nameInput.value?.focus();
  } else if (password.value.length > passwordMaxLength) {
    passwordInput.value?.focus();
  } else {
    const response = await AuthenticationService.register({name: name.value, email: email.value, password: password.value});
    if (response.data.success !== undefined && response.data.success === false) {
      alertText.value = response.data.message;
      alert.value = true;
    }
  }
}

</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;

    justify-content: center;
  }

  form label {
    margin-top: 1rem;
  }

  form input[type='submit'] {
    height: 2.5rem;
    margin-top: 1.5rem;
  }

  #register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .form_authentication {
    background-color: var(--card-form-background);

    border-radius: 1rem;
    border: var(--card-form-border) 2px solid;

    box-shadow: 10px 10px 15px var(--card-form-shadow);

    padding: 2rem;

    max-width: 25rem;
    width: 100%;
  }

  .form_authentication hr {
    margin-top: 1rem;
  }

  .alert-holder-form {
    margin: 1rem 0 0 0;
  }

</style>