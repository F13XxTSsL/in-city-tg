<script setup>
import ButtonBack from "@/components/ButtonBack.vue";
import IconLogo from "@/components/icons/IconLogo.vue";
import {useRouter} from "vue-router";
import ButtonDefault from "@/components/ButtonDefault.vue";

const router = useRouter()
</script>

<template>
  <section class="objects">
    <div class="container">
      <div class="content">
        <div class="objects-head">
          <ButtonBack @eventClick="router.push('/')"/>
          <IconLogo/>
        </div>
        <div class="objects-body">
          <div class="objects-body__text-white h2">Создаем качественную среду для жизни, работы и долголетия
            современного человека
          </div>
          <div class="objects-body__text-gray">Мы принципиально не экономим на качестве: строительные материалы и
            техника закупаются только у надёжных и проверенных поставщиков и перед началом работ в обязательном порядке
            тестируются на полигонах.
          </div>
          <div class="objects-body-card__items">
            <div class="objects-body-card__item">
              <div class="objects-body-card__item-title">587 246 м2</div>
              <div class="objects-body-card__item-text">квадратных метров построили</div>
            </div>
            <div class="objects-body-card__item">
              <div class="objects-body-card__item-title">15 000 +</div>
              <div class="objects-body-card__item-text">семей проживают
                в наших проектах
              </div>
            </div>
            <div class="objects-body-card__item">
              <div class="objects-body-card__item-title">33</div>
              <div class="objects-body-card__item-text">объекта сданы
                точно в срок
              </div>
            </div>
            <div class="objects-body-card__item">
              <div class="objects-body-card__item-title">11</div>
              <div class="objects-body-card__item-text">лет на рынке</div>
            </div>
          </div>
        </div>
        <div class="objects-footer panel">
          <div class="object-card">
            <div class="object-card__img">
              <img src="../../public/project-1.png" alt="">
            </div>
            <div class="object-card__info">
              <div class="object-card__title">мкр. «Любимово»</div>
              <div class="object-card__address body_14_reg">г. Краснодар ул. Виктора феськова д. 3</div>
              <div class="object-card__desc body_14_reg">Прежде всего, существующая теория говорит о возможностях экономической целесообразности принимаемых решений. Вот вам яркий пример </div>
              <div class="object-card__price h1">от 4,3 млн ₽</div>
              <ButtonDefault text="Получить презентацию"/>
            </div>
          </div>
          <div class="object-card">
            <div class="object-card__img">
              <img src="../../public/project-2.png" alt="">
            </div>
            <div class="object-card__info">
              <div class="object-card__title">мкр. «Новая Елизаветка»</div>
              <div class="object-card__address body_14_reg">г. Краснодар ул. Виктора феськова д. 3</div>
              <div class="object-card__desc body_14_reg">Прежде всего, существующая теория говорит о возможностях экономической целесообразности принимаемых решений. Вот вам яркий пример </div>
              <div class="object-card__price h1">от 4,3 млн ₽</div>
              <ButtonDefault text="Получить презентацию"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.objects {
  .content {
    padding-top: 110px;
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 24px 24px 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--light-main-gray-700);
    .btn-back {
      position: absolute;
      left: 24px;
      top: 15px;
    }
  }
  &-body {
    padding: 0 24px;

    &__text-white {
      color: var(--white);
      margin-bottom: 15px;
    }

    &__text-gray {
      color: var(--light-main-gray-500);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 40px;
    }

    &-card__items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
      margin-bottom: 35px;
    }
    &-card__item {
      border-radius: 20px;
      background: var(--white);
      padding: 15px 20px 20px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1 0 0;
      height: 130px;
      &-title {
        font-size: 22px;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 0.22px;
      }
      &-text {
        color: var(--light-main-gray-500);
        font-size: 13px;
        font-weight: 400;
        line-height: 18px;
        height: 36px;
      }
    }
  }
  &-footer {
    padding: 25px 24px 50px 24px;
  }

  .object-card {
    background-color: var(--white);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    &__info {
      padding: 0 24px 24px;
    }
    &__img {
      width: 100%;
      height: 260px;
      flex-shrink: 0;
      overflow: hidden;
      margin-bottom: 16px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__title {
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      letter-spacing: 0.2px;
      margin-bottom: 4px;
    }
    &__address {
      color: var(--light-main-gray-500);
      margin-bottom: 12px;
    }
    &__price {
      margin: 24px 0;
    }
    .btn-default {
      width: 100%;
    }
  }
}

</style>