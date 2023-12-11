<script setup>
import {useRouter} from "vue-router";
import ButtonBack from "@/components/ButtonBack.vue";
import {ref} from "vue";
import IconSuccess from "@/components/icons/IconSuccess.vue";
import IconWait from "@/components/icons/IconWait.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconRepeat from "@/components/icons/IconRepeat.vue";
import {useAgentStore} from "@/stores/storeAgent";

const router = useRouter()

const store = useAgentStore()
store.getAgentClients()

const clients = ref([
  { client: { status: 'FIXED', first_name: 'Велентин', last_name: 'Каменский', phone: '+7 (928) – 777 –77 – 77' }},
  {  client: { status: 'NEW', first_name: 'Велентин', last_name: 'Каменский', phone: '+7 (928) – 777 –77 – 77' }},
  {  client: { status: 'PROCESSING', first_name: 'Велентин', last_name: 'Каменский', phone: '+7 (928) – 777 –77 – 77' }},
  {  client: { status: 'OVERDUE', first_name: 'Велентин', last_name: 'Каменский', phone: '+7 (928) – 777 –77 – 77' }},
  {  client: { status: 'CANCELED', date: '11.20.2023', first_name: 'Велентин', last_name: 'Каменский', phone: '+7 (928) – 777 –77 – 77' }},
  {  client: { status: 'REPEATED', date: '11.20.2023', first_name: 'Велентин', last_name: 'Каменский', phone: '+7 (928) – 777 –77 – 77' }},
])

const STATUS = {
  FIXED: {
    text: 'Успешно',
    icon: IconSuccess
  },
  APPROVED: {
    text: 'Успешно',
    icon: IconSuccess
  },
  NEW: {
    text: 'На модерации',
    icon: IconWait
  },
  PROCESSING: {
    text: 'Получение акта<br> фиксации',
    icon: IconWait
  },
  OVERDUE: {
    text: 'Отказ',
    sub_text: 'Акт фиксации просрочен',
    icon: IconClose
  },
  CANCELED: {
    text: 'Отказ',
    sub_text: 'Клиент зафиксирован в системе',
    icon: IconClose,
    repeat_moderation: true
  },
  REPEATED: {
    text: 'Отказ',
    sub_text: 'Отказано в фиксации при повторном запросе',
    icon: IconClose,
  }
}

const repeatModeration = (item) => {
  clients.value = clients.value.map(client => {
    if (client.id === item.id) {
      client.repeat = false
      client.message = ''
      client.status = 'moderation'
      return client
    } else {
      return client
    }
  })
}
</script>

<template>
  <section class="my-clients">
    <div class="container">
      <div class="content">
        <div class="my-clients-head">
          <ButtonBack @eventClick="router.push('/')"/>
          <div class="my-clients-head__title h1">Мои клиенты</div>
        </div>
        <div v-if="store.clients && store.clients.length" class="my-clients-content panel">
          <div class="my-clients-content-item" v-for="item in store.clients" :class="item.status">
            <div class="my-clients-content-item__icon">
              <component :is="STATUS[item.status].icon"/>
            </div>
            <div class="my-clients-content-item-info">
              <div class="my-clients-content-item-head">
                <div class="my-clients-content-item-head-info">
                  <div class="my-clients-content-item-head__status" v-html="STATUS[item.status].text" />
                  <div class="my-clients-content-item-head__date body_14_reg">{{ new Date(item.created_at).toLocaleDateString('ru-RU') }}</div>
                </div>
                <div v-if="STATUS[item.status].sub_text" class="my-clients-content-item-head__message body_14_reg" v-html="STATUS[item.status].sub_text" />
              </div>
              <div class="my-clients-content-item-body">
                <div class="my-clients-content-item-body__name body_16_bold">{{ item.client.first_name }} {{ item.client.last_name }}</div>
                <div class="my-clients-content-item-body__phone body_16_reg">{{ item.client.phone }}</div>
                <button v-if="STATUS[item.status].repeat_moderation" class="my-clients-content-item-body__btn body_14_reg" @click="repeatModeration(item.client)"><IconRepeat/>На повторную модерацию</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="my-clients-content panel">Клиентов еще не добавлено...</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.my-clients {
  &-head {
    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-bottom: 35px;

    &__title {
      color: var(--white);
      margin-left: 30px;
    }
  }

  &-content {
    padding: 30px 24px 40px 24px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    max-height: 821px;
    min-height: 660px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }

  &-content-item {
    padding: 16px 20px 20px 20px;
    border-radius: 10px;
    display: flex;
    height: max-content;

    &__icon {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }

    &-head {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 12px;
      margin-bottom: 10px;
      border-bottom: 1px solid;

      &-info {
        display: flex;
        align-items: center;
        width: 100%;
      }

      &__status {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.16px;
      }

      &__date {
        color: var(--light-status-success-300);
        margin-left: auto;
      }
      &__message {
        padding-top: 6px;
      }
    }

    &-info {
      width: 100%;
    }

    &-body {
      &__phone {
        padding-top: 3px;
      }
    }

    &.FIXED {
      background: var(--light-status-success-100);

      .my-clients-content-item {
        &__icon {
          background-color: var(--light-status-success-200);
        }
      }

      .my-clients-content-item-head {
        border-color: rgba(160, 169, 163, 0.5);

        &__status {
          color: var(--light-status-success-200);
        }
      }

      .my-clients-content-item-body {
        &__phone {
          color: var(--light-status-success-300);
        }
      }
    }

    &.NEW, &.PROCESSING {
      background: var(--light-status-moderation-100);

      .my-clients-content-item {
        &__icon {
          background-color: var(--light-status-moderation-200);
        }
      }

      .my-clients-content-item-head {
        border-color: rgba(194, 176, 137, 0.5);

        &__status {
          color: var(--light-status-moderation-200);
        }
      }

      .my-clients-content-item-body {
        &__phone {
          color: var(--light-status-moderation-300);
        }
      }
    }

    &.OVERDUE, &.CANCELED, &.REPEATED {
      background: var(--light-status-rejection-100);

      .my-clients-content-item {
        &__icon {
          background-color: var(--light-status-rejection-200);
        }
      }

      .my-clients-content-item-head {
        border-color: rgba(181, 140, 138, 0.5);

        &__status,   &__message {
          color: var(--light-status-rejection-200);
        }
      }

      .my-clients-content-item-body {
        &__phone {
          color: var(--light-status-rejection-300);
        }
        &__btn {
          padding: 12px 25px;
          border: 1px solid var(--light-status-rejection-200);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light-status-rejection-200);
          margin-top: 17px;
          background-color: transparent;
          font-family: 'PT Sans Caption', sans-serif;
          width: 100%;
          transition: 0.3s;
          svg {
            margin-right: 8px;
          }
          &:active {
            background: var(--light-status-rejection-200);
            color: var(--white);
            &:deep {
              svg {
                path {
                  transition: 0.3s;
                  stroke: var(--white);
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>