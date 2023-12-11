<script setup>
import { Field } from 'vee-validate'
import IconCheck from "@/components/icons/IconCheck.vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <label for="agreement" class="agreement">
    <Field name="agreement" rules="checked" as="" :modelValue="modelValue" v-slot="{field, errors}">
      <input v-bind="field" type="checkbox" id="agreement" name="agreement" @change="$emit('update:modelValue', $event.target.checked)" >
      <span class="agreement-fake" :class="{'is-error': errors.length}"><IconCheck/></span>
      <span class="agreement-text body_14_reg">
      <a class="body_14_reg" href="/public">Подтверждаю,</a> что клиент дал согласие на обработку персональных данных
    </span>
    </Field>
  </label>
</template>

<style scoped lang="scss">
  .agreement {
    display: flex;
    align-items: flex-start;
    &-text, a {
      transition: 0.3s;
      color: var(--light-main-gray-500);
      a {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: var(--light-main-gray-500);
          bottom: 1px;
          left: 0;
        }
      }
    }
    &-fake {
      width: 24px;
      height: 24px;
      display: flex;
      margin-top: 2px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 6px;
      border: 1px solid var(--light-main-gray-400, #C5C5C5);
      background: var(--white);
      margin-right: 12px;
      transition: 0.3s;
      padding: 3px;
      overflow: hidden;
      &.is-error {
        border-color: var(--light-status-rejection-200);
      }

    }

    input {
      width: 0;
      height: 0;
      &:checked {
        & ~ span.agreement-fake {
          background-color: var(--light-main-gray-700);
        }
        & ~ span.agreement-text {
          a {
            color: var(--light-main-gray-700);
          }
          color: var(--light-main-gray-700);
        }
      }
    }

  }
</style>