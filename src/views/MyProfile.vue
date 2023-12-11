<script setup>
import ButtonBack from "@/components/ButtonBack.vue";
import {useRouter} from "vue-router";
import Input from "@/components/Input.vue";
import {useAgentStore} from "@/stores/storeAgent";

const router = useRouter()
const store = useAgentStore()

</script>

<template>
  <section class="my-profile">
    <div class="container">
      <div class="content">
        <div class="my-profile-head">
          <ButtonBack @eventClick="router.push('/')"/>
          <div class="my-profile-head__title h1">Мой профиль</div>
        </div>
        <div class="my-profile-content panel">
          <Input v-model="store.agent.first_name" label="Имя*" disabled/>
          <Input v-model="store.agent.last_name" label="Фамилия*" disabled/>
          <Input v-model="store.agent.phone" label="Контактный номер*" disabled/>
          <Input v-model="store.agent.legal_entity" label="Юр.лицо" disabled/>
          <Input v-model="store.agent.agency_name" label="Наименование агентства" disabled/>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .my-profile {
    &-head {
      display: flex;
      align-items: center;
      padding: 0 24px;
      margin-bottom: 30px;
      &__title {
        color: var(--white);
        padding-left: 30px;
      }
    }
    &-content {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 20px;
      padding: 30px 24px 90px;
    }
  }
</style>