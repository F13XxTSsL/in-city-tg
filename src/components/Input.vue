<script setup>
import { vMaska } from "maska"
import { Field } from 'vee-validate'
import {useAttrs} from "vue";

const attr = useAttrs()

defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  sublabel: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  rules: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  dataMask: {
    type: String,
    default: ''
  },
  classes: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <Field :name="name" as="" v-slot="{ field, errors }" :rules="rules" :modelValue="modelValue">
    <div class="input-control">
      <div class="input-control-label body_16_bold">{{ label }}</div>
      <div class="input-control-sublabel" v-if="sublabel">{{ sublabel }}</div>
      <input autocomplete="off"
             @input="$emit('update:modelValue', $event.target.value)"
             v-bind="{ field, attr }"

             :type="type"
             class="input-control-item"
             :class="[{'is-error': errors.length}, classes]"
             :placeholder="placeholder"
             v-maska
             :disabled="disabled"
             :data-maska="dataMask"
             :name="name"/>
    </div>
  </Field>
</template>

<style scoped lang="scss">
.input-control {
  width: 100%;

  &-label {
    color: var(--light-main-gray-700);
  }

  &-sublabel {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--light-main-gray-500);

  }

  &-item {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--white);
    outline: none;
    border: 1px solid var(--white);
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.16px;
    color: var(--light-main-gray-700);
    transition: 0.3s;
    margin-top: 10px;
    font-family: 'PT Sans Caption', sans-serif;



    &::placeholder {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.16px;
      color: var(--light-main-gray-400);
    }

    &:focus {
      background: var(--light-main-gray-300);
      border-color: var(--light-main-gray-300);
    }
    &:disabled {
      background: var(--light-main-gray-300);
      border-color: var(--light-main-gray-300);
    }

    &.is-error {
      border-color: var(--light-status-rejection-200);
    }
  }
}
</style>