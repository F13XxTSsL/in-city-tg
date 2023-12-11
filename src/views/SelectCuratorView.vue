<script setup>
import ButtonBack from "@/components/ButtonBack.vue";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import Input from "@/components/Input.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconBagage from "@/components/icons/IconBagage.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import {useAgentStore} from "@/stores/storeAgent";

const router = useRouter()
const searchValue = ref('')
const selectedCurator = ref({})
const showSelectedModal = ref(false)
const showCardCurator = ref(false)

const store = useAgentStore()

store.getCurators()

const filterCurators = computed(() => {
  if (searchValue.value) {
    return store.curators.filter(item => {
      return item.first_name.toLocaleLowerCase().indexOf(searchValue.value.toLocaleLowerCase()) > -1
    })
  } else {
    return store.curators
  }
})

const clickCurator = (curator) => {
  selectedCurator.value = curator
  showSelectedModal.value = true
}
const clickSelectedCuratorY = () => {
  showSelectedModal.value = false
  showCardCurator.value = true
}
const clickSelectedCuratorN = () => {
  showSelectedModal.value = false
  if (selectedCurator.value && !selectedCurator.value.first_name) {
    selectedCurator.value = {}
  }
}
</script>

<template>
  <section class="select-curator">
    <div class="container">
      <div class="content">
        <div class="select-curator-head" :class="{'is-card': showCardCurator}">
          <ButtonBack @eventClick="router.push('/')"/>
          <div class="select-curator-head__title h1"> {{ showCardCurator ? 'Мой куратор' : 'Выбор куратора' }}</div>
        </div>
        <div class="select-curator-content panel" :class="{'is-card': showCardCurator}">
          <div v-if="showCardCurator" class="card-curator" :class="{'is-show': showCardCurator}">
            <div class="card-curator__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M15 13.5V15C15 15.6 14.6 16 14 16C13.4 16 13 15.6 13 15V13.5H7V15C7 15.6 6.6 16 6 16C5.4 16 5 15.6 5 15V13.5H3C2.3 13.5 1.6 13.3 1 13V17C1 18.7 2.3 20 4 20H16C17.7 20 19 18.7 19 17V13C18.4 13.3 17.7 13.5 17 13.5H15ZM19 4H15V3C15 1.3 13.7 0 12 0H8C6.3 0 5 1.3 5 3V4H1C0.4 4 0 4.4 0 5V9C0 10.7 1.3 12 3 12H17C18.7 12 20 10.7 20 9V5C20 4.4 19.6 4 19 4ZM13 4H7V3C7 2.4 7.4 2 8 2H12C12.6 2 13 2.4 13 3V4Z"
                    fill="#27272C"/>
              </svg>
            </div>
            <div class="card-curator__info">
              <div class="card-curator__name h2">{{ selectedCurator.first_name }} {{ selectedCurator.last_name }}</div>
              <div class="card-curator__phone body_16_reg">{{ selectedCurator.phone }}</div>
            </div>
          </div>
          <div v-if="!showCardCurator" class="select-curator-content-filter">
            <Input v-model="searchValue" placeholder="Поиск"/>
            <div class="select-curator-content-filter__icon">
              <IconSearch/>
            </div>
          </div>
          <TransitionGroup v-if="!showCardCurator" name="list" class="select-curator-content-items" tag="div"
                           :class="{'is-card': showCardCurator}">
            <div class="select-curator-content-item" v-for="item in filterCurators" :key="item.first_name"
                 @click="clickCurator(item)">
              <div class="select-curator-content-item__name h3">{{ item.first_name }} {{ item.last_name }}</div>
              <div class="select-curator-content-item__phone body_16_reg">{{ item.phone }}</div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <div class="select-curator-modal" :class="{'is-show': showSelectedModal}" @click="showSelectedModal = false">
      <div class="select-curator-modal__content" :class="{'is-show': showSelectedModal}">
        <div class="select-curator-modal__title h1">Подтвердите выбор<br> куратора:</div>
        <div class="select-curator-modal__info h2">
          <div class="select-curator-modal__icon">
            <IconBagage/>
          </div>
          {{ selectedCurator.first_name }} {{ selectedCurator.last_name }}
        </div>
        <ButtonDefault text="Да" @click="clickSelectedCuratorY"/>
        <ButtonDefault text="Нет" @click="clickSelectedCuratorN" :class="'button-no'"/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.select-curator {
  &-head {
    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-bottom: 35px;
    transition: 0.3s;


    &.is-card {
      margin-bottom: 35px;
    }

    &__title {
      color: var(--white);
      margin-left: 30px;
    }

  }

  &-content {
    padding: 30px 24px 40px;
    position: relative;
    transition: 0.3s;
    min-height: 660px;

    &-filter {
      margin-bottom: 24px;
      position: relative;

      &__icon {
        position: absolute;
        top: 16px;
        right: 16px;
      }

    }

    &-items {
      max-height: 470px;
      min-height: 470px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      grid-gap: 15px;

      &::-webkit-scrollbar {
        width: 0;
      }

      &.is-card {
        max-height: 290px;
        min-height: 290px;
      }
    }

    &-item {
      padding: 24px;
      border-radius: 10px;
      background: var(--white);
      max-height: 106px;
      min-height: 106px;

      &__name {
        padding-bottom: 10px;
      }

      &__phone {
        color: var(--light-main-gray-500);
      }
    }

    .card-curator {
      padding: 30px 24px;
      border-radius: 15px;
      background: var(--light-main-gray-600);
      backdrop-filter: blur(75px);
      position: relative;
      width: 100%;
      opacity: 0;
      z-index: -1;
      transform: translateY(-10px);
      display: flex;
      flex-direction: column;

      &.is-show {
        opacity: 1;
        z-index: 5;
        transform: translateY(0);
      }

      &__label {
        color: var(--light-main-gray-500);
        margin-bottom: 40px;
      }

      &__icon {
        width: 56px;
        height: 56px;
        flex-shrink: 0;
        background: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
      }

      &__name {
        color: var(--white);
        padding-bottom: 8px;
      }

      &__phone {
        color: var(--light-main-gray-500);
      }
    }
  }

  &-modal {
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.50);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: flex-end;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;

    &__info {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }

    &__icon {
      width: 56px;
      height: 56px;
      background: var(--light-main-gray-700);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }

    &__content {
      max-height: 394px;
      width: 100%;
      background: var(--white);
      border-radius: 20px 20px 0 0;
      padding: 20px 24px 40px 24px;
      transform: translateY(102%);
      transition: 0.3s;
      transition-delay: 0.2s;

      &.is-show {
        transform: translateY(0);
      }
    }

    &__title {
      margin-bottom: 30px;
    }

    .btn-default {
      width: 100%;

      &.button-no {
        background-color: transparent;
        color: var(--light-main-gray-700);
        margin-top: 20px;
      }
    }

    &.is-show {
      opacity: 1;
      z-index: 5;
    }
  }
}
</style>