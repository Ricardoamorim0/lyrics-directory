<template>
  <div class="input-container">
    <input ref="input" :type="type" :maxlength="maxLength" :required="required" :aria-required="required" :aria-label="label" :autocomplete="autocomplete" @input="handleInput"/>
    <div class="input-container-details" :class="{'not-hide': haveText}">
      <span>{{ inputName }}</span>
      <span v-if="needLength">
        <span :class="{'overflow': (overflow || underflow)}">{{ currentLength + ' / ' + maxLength }}</span>
        <span v-if="(overflow || underflow)"> ⚠️</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue';

const props = withDefaults(defineProps<{
  inputName: string,
  type: string,
  label: string,
  modelValue?: string,
  needLength?: boolean,
  minLength?: number,
  maxLength?: number,
  required?: boolean,
  autocomplete?: string
}>(), {
  modelValue: '',
  needLength: false,
  minLength: 0,
  maxLength: 50,
  required: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const value = toRef(props, 'modelValue');
const inputName = toRef(props, 'inputName');
const minLength = toRef(props, 'minLength');
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

const underflow = computed(() => {
  return value.value.length < minLength.value;
});

function focus(): void {
  input.value?.focus();
}

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

onMounted(() => {
  setTimeout(() => {
    emit('update:modelValue', input.value?.value || '');
  }, 1);
});

defineExpose({ focus });

</script>