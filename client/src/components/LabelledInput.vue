<script setup lang="ts">
import { computed, ref, toRef } from 'vue';

const props = withDefaults(defineProps<{
  inputName: string,
  type: string,
  label: string,
  modelValue?: string,
  needLength?: boolean,
  maxLength?: number,
  required?: boolean,
  autocomplete?: string
}>(), {
  modelValue: '',
  needLength: false,
  maxLength: 50,
  required: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const value = toRef(props, 'modelValue');
const inputName = toRef(props, 'inputName');
const maxLength = toRef(props, 'maxLength');

const input = ref<HTMLInputElement | null>(null);

const currentLength = computed(() => {
  return value.value.length;
});

const haveText = computed(() => {
  return value.value.length > 0;
});

const overflow = computed(() => {
  return value.value.length > maxLength.value;
});

function focus(): void {
  input.value?.focus();
}

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

defineExpose({ focus });

</script>

<template>
  <div class="input-container">
    <input ref="input" :type="type" :maxlength="maxLength" :required="required" :aria-required="required" :aria-label="label" :autocomplete="autocomplete" @input="handleInput"/>
    <div class="input-container-details" :class="{'not-hide': haveText}">
      <span>{{ inputName }}</span>
      <span v-if="needLength">
        <span :class="{'overflow': overflow}">{{ currentLength + ' / ' + maxLength }}</span>
        <span v-if="overflow"> ⚠️</span>
      </span>
    </div>
  </div>
</template>

<style scoped>

  .input-container {
    margin-top: 1rem;
    height: 3rem;
  }

  .input-container > input {
    height: inherit;
    padding: 1rem 0.5rem 0 0.5rem;

    position: relative;

    width: 100%;
    
    background: transparent;
    color: var(--color-text);

    border: var(--card-form-border) 2px solid;
    border-radius: 0.25rem;

    z-index: 2;
  }

  .input-container > input:focus ~ .input-container-details,
  .input-container > input:not(:focus) ~ .input-container-details.not-hide {
    bottom: 2.9rem;
    font-size: 0.8em;
  }

  .input-container > input:not(:focus) ~ .input-container-details:not(.not-hide) :nth-child(2) {
    opacity: 0;
  }

  .input-container-details {
    display: flex;
    justify-content: space-between;

    margin: 0 0.5rem 0 0.5rem;

    position: relative;

    z-index: 1;

    transition: bottom ease-out 100ms;
    -o-transition: bottom ease-out 100ms;
    -moz-transition: bottom ease-out 100ms;
    -webkit-transition: bottom ease-out 100ms;

    bottom: 2.2rem;
  }

  .input-container-details > span {
    transition: opacity ease-out 100ms, font-size ease-out 100ms;
    -o-transition: opacity ease-out 100ms, font-size ease-out 100ms;
    -moz-transition: opacity ease-out 100ms, font-size ease-out 100ms;
    -webkit-transition: opacity ease-out 100ms, font-size ease-out 100ms;

    vertical-align: middle;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

</style>