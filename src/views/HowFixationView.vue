<script setup>
import ButtonBack from "@/components/ButtonBack.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import IconQuest from "@/components/icons/IconQuest.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconDocument from "@/components/icons/IconDocument.vue";
import Card from "@/components/Card.vue";

const router = useRouter()
const questions = ref([
  {
    path: '',
    icon: IconQuest,
    title: 'Как зафиксировать клиента?'
  },
  {
    path: '',
    icon: IconCheck,
    title: 'Соглашение об использовании'
  },
  {
    path: '',
    icon: IconDocument,
    title: 'Политика конфиденциальности'
  }
])
</script>

<template>
  <section class="how-fixation">
    <div class="container">
      <div class="content">
        <div class="how-fixation-head">
          <ButtonBack @eventClick="router.go(-1)"/>
          <div class="how-fixation-head__title h1">Документация</div>
          <div class="how-fixation-head__subtitle body_16_reg">Выберите раздел и получить файл с описанием в чат</div>
        </div>
        <div class="how-fixation-content panel">
          <Card v-for="item in questions" :item="item" link></Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.how-fixation {
  .card {
    height: 144px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &-head {
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 30px;
    &__title {
      margin-top: 30px;
      color: var(--white);
    }
    &__subtitle {
      color: var(--light-main-gray-500);
      margin-top: 10px;
    }
  }
  &-content {
    padding: 20px 24px 40px 24px;
  }
}

</style>