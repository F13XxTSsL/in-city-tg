<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import {computed} from "vue";
import Card from "@/components/Card.vue";
import IconProfile from "@/components/icons/IconProfile.vue";
import IconPeoples from "@/components/icons/IconPeoples.vue";
import IconBagage from "@/components/icons/IconBagage.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconBgLogo from "@/components/icons/IconBgLogo.vue";
import IconQuest from "@/components/icons/IconQuest.vue";
import {useAgentStore} from "@/stores/storeAgent";
import IconFixRed from "@/components/icons/IconFixRed.vue";
import IconFix from "@/components/icons/IconFix.vue";

const store = useAgentStore()


const menu = computed(() => [
  {path: '/my-clients', title: 'Мои клиенты', icon: IconPeoples},
  {path: '/my-profile', title: 'Профиль', icon: IconProfile},
  {path: '/select-curator', title: 'Выбор куратора', icon: IconBagage, classes: store.agent.status },
  {path: '/how-fixation', title: 'Как фиксировать клиента', icon: IconQuest}])


</script>

<template>
  <section class="home">
    <div class="container">
      <div class="content">
        <div class="home-logo">
          <IconLogo/>
        </div>
        <div class="home-menu panel">
          <div v-if="store.agent.status === 'AWAITING_CURATOR'" class="home-menu-banner">
            <div class="home-menu-banner__head">
              <div class="home-menu-banner__icon" :class="store.agent.status">
                <IconFixRed/>
              </div>
              <div class="home-menu-banner__head-content">
                <div class="home-menu-banner__head-title body_14_reg">Заблокировано</div>
                <div class="home-menu-banner__head-subtitle h3">Фиксация клиента</div>
              </div>

            </div>
            <div class="home-menu-banner__text body_14_reg">Выберите куратора для разблокировки фиксирования клиентов</div>
          </div>
          <router-link v-else class="home-menu-banner" to="/client-fixation">
            <IconBgLogo class="home-menu-banner__bg"/>
            <div class="home-menu-banner__icon">
              <IconFix />
            </div>
            <div class="home-menu-banner__title h2">Фиксация клиента
              <IconArrow/>
            </div>
          </router-link>
          <div class="home-menu__items">
            <Card v-for="item in menu" :item="item" :class="item.classes"/>
          </div>
          <router-link to="/objects" class="home-menu-objects body_16_bold">
            "Объекты ГК "ИНСИТИ"
            <IconArrow/>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  .card {
    min-height: 165px;

    &.AWAITING_CURATOR {
      border: 3px solid #F3052C;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  &-logo {
    padding-bottom: 168px;
    text-align: center;
    flex-grow: 1;
  }

  &-menu {
    padding: 89px 24px 80px 24px;
    position: relative;

    &__items {
      margin-top: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }

    .home-menu-banner {
      position: absolute;
      margin-left: 24px;
      margin-right: 24px;
      background: var(--light-main-gray-600);
      border-radius: 15px;
      box-shadow: 25px 20px 35px 0 rgba(27, 32, 55, 0.25);
      padding: 30px 24px;
      top: -123px;
      right: 0;
      left: 0;
      overflow: hidden;

      &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--white);
        width: 100%;
      }

      &__icon {
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: var(--white);
        flex-shrink: 0;
        margin-bottom: 35px;
        &.AWAITING_CURATOR {
          margin-bottom: 0;
          margin-right: 16px;
          background: var(--light-main-gray-700);
        }
      }

      &__bg {
        position: absolute;
        right: 0;
        top: 0;
      }

      &__head {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        &-title {
          color: var(--light-main-gray-300);
        }
        &-subtitle {
          color: var(--light-main-gray-500);
          padding-top: 2px;
        }
      }
      &__text {
        color: var(--light-main-gray-300);
      }
    }

    .home-menu-objects {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 24px;
      color: var(--white);
      background: var(--light-main-gray-600);
      box-shadow: 0 8px 30px 0 rgba(236, 237, 241, 0.80);
      border-radius: 10px;
      margin-top: 20px;
    }
  }

}
</style>