<script setup>

import IconLogo from "@/components/icons/IconLogo.vue";
import Agreement from "@/components/Agreement.vue";
import {Form} from "vee-validate";
import ButtonDefault from "@/components/ButtonDefault.vue";
import Input from "@/components/Input.vue";
import {ref} from "vue";
import IconBgLogo from "@/components/icons/IconBgLogo.vue";
import {useAgentStore} from "@/stores/storeAgent";

const formDataRef = ref(null)
const store = useAgentStore()

const formData = ref({
  first_name: '',
  last_name: '',
  phone: '',
  legal_entity: '',
  agency_name: ''
})
const submitForm = async () => {
  const isValid = await formDataRef.value?.validate()

  if (!isValid.valid) {
    return false
  }

  await store.createAgent(formData)

}
</script>

<template>
  <section class="auth">
    <div class="container">
      <div class="content">
        <div class="auth__bg">
          <svg xmlns="http://www.w3.org/2000/svg" width="174" height="168" viewBox="0 0 174 168" fill="none">
            <g opacity="0.02">
              <path d="M174 168L71 83.5648L174 0V168ZM103.297 83.5648L153.924 124.477V42.6529L103.297 83.5648Z" fill="white"/>
              <path d="M0 168V0L103 83.5648L0 168ZM20.0763 42.6529V125.347L70.7034 84.4352L20.0763 42.6529Z" fill="white"/>
            </g>
          </svg>
        </div>
        <div class="auth-head">
          <IconLogo/>
          <div class="auth-head__title h1">Авторизация</div>
        </div>
        <div class="auth-form panel">
          <Form v-slot="{ errors }" as="" ref="formDataRef">
            <form @submit.prevent="submitForm">
              <Input v-model="formData.first_name" placeholder="Иван" label="Имя" name="name" rules="required"/>
              <Input v-model="formData.last_name" placeholder="Иванов" label="Фамилия" name="surname" rules="required"/>
              <Input v-model="formData.phone" placeholder="+7" label="Контактный номер" rules="required" name="phone" type="tel" data-mask="+7 ### ### ## ##"/>
              <Input v-model="formData.legal_entity" placeholder="" label="Юр. лицо" name="legal_face" rules="required"/>
              <Input v-model="formData.agency_name" placeholder="" label="Наименование агентства" name="name_agent" rules="required"/>
              <ButtonDefault text="Оставить заявку" :disabled="errors && errors.name"/>
            </form>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
    .auth {
      &__bg {
        position: absolute;
        right: 0;
        top: 0;
      }
      &-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-self: center;
        margin-bottom: 30px;
        &__title {
          color: var(--white);
          margin-top: 36px;
        }
      }
      &-form {
        padding: 30px 24px 40px 24px;

        max-height: 697px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0;
        }
        form {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 20px;
        }
        .btn-default {
          margin-top: 20px;
        }
      }
    }
</style>