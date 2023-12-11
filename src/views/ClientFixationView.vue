<script setup>
import ButtonQuest from "@/components/ButtonQuest.vue";
import {useRouter} from "vue-router";
import Input from "@/components/Input.vue";
import Agreement from "@/components/Agreement.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
import {Form} from 'vee-validate'
import {computed, onMounted, ref, watch} from "vue";
import ButtonBack from "@/components/ButtonBack.vue";
import {useAgentStore} from "@/stores/storeAgent";

const router = useRouter()

const formDataRef = ref(null)
const isValidFormData = ref(false)
const codeItem = ref(null)
const timer = ref(null)
const timeCount = ref(120)
const formData = ref({
  first_name: '',
  last_name: '',
  phone: '',
  phone2: '',
  agreement: false
})
const formDataCode = ref({
  code_1: '',
  code_2: '',
  code_3: '',
  code_4: '',
})

const store = useAgentStore()

const submitForm = async () => {
  const isValid = await formDataRef.value?.validate()
  isValidFormData.value = isValid.valid

  const resultData = {
    first_name: formData.value.first_name,
    last_name: formData.value.last_name,
    phone: clearPhone(formData.value.phone),
    phone2: clearPhone(formData.value.phone2),
  }


  if (!isValid.valid) {
    return false
  }

  await store.createFixation(resultData)
}


const sendCodeRepeat = () => {
  timer.value = setInterval(() => {
    timeCount.value--
  }, 1000)
}
const hidePhone = (phone) => {
  return Array.from(phone).reduceRight((ctx, char) => {
    const isDigit = char >= '0' && char <= '9';
    const offset = ctx.offset + (isDigit ? 1 : 0);
    const filteredChar = isDigit ? (offset >= 2 && offset < 7) ? '*' : char : char;
    const filtered = filteredChar + ctx.filtered;
    return { offset, filtered };
  }, { offset: -1, filtered: '' }).filtered;
}
const clearPhone = (phone) => {
  return phone.replace('+', '').replaceAll(' ', '')
}
const resultTime = computed(() => {
  return new Date(timeCount.value * 1000).toUTCString().split(/ /)[4].substr(3)
})

watch(timeCount, time => {
  if (time === 0) {
    clearInterval(timer.value)
    timer.value = null
    timeCount.value = 120
  }
})
watch(formDataCode, codes => {
  console.log(codes)
}, {
  deep: true
})

</script>

<template>
  <section class="client-fixation">
    <div class="container">
      <div class="content">
        <template v-if="store.showCodeSubmit">
          <div class="client-fixation-head">
            <div class="client-fixation-head__buttons">
              <ButtonBack @eventClick="isValidFormData = false"/>
            </div>
            <div class="client-fixation-head__title h1">Введите код подтверждения</div>
            <div class="client-fixation-head__subtitle body_16_reg">Код отправлен на номер {{ hidePhone('+7 918 651 71 21') }}</div>
          </div>
          <div class="client-fixation-form client-fixation-form-code panel">
            <div class="client-fixation-form-code__controls">
              <Input ref="codeItem" v-model="formDataCode.code_1" name="code_1"
                     :classes="formDataCode.code_1 ? 'no-empty': ''" inputmode="numeric" min="0" maxlength="1"
                     data-mask="#"/>
              <Input ref="codeItem" v-model="formDataCode.code_2" name="code_2"
                     :classes="formDataCode.code_2 ? 'no-empty': ''" inputmode="numeric" min="0" maxlength="1"
                     data-mask="#"/>
              <Input ref="codeItem" v-model="formDataCode.code_3" name="code_3"
                     :classes="formDataCode.code_3 ? 'no-empty': ''" inputmode="numeric" min="0" maxlength="1"
                     data-mask="#"/>
              <Input ref="codeItem" v-model="formDataCode.code_4" name="code_4"
                     :classes="formDataCode.code_4 ? 'no-empty': ''" inputmode="numeric" min="0" maxlength="1"
                     data-mask="#"/>
            </div>
            <div v-if="!timer" class="client-fixation-form-code__repeat-code" @click="sendCodeRepeat">Отправить
              повторно
            </div>
            <div v-else class="client-fixation-form-code__repeat-code-timer body_16_reg">Отправка повторно через
              {{ resultTime }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="client-fixation-head">
            <div class="client-fixation-head__buttons">
              <ButtonBack @eventClick="router.push('/')"/>
              <ButtonQuest @eventClick="router.push('/how-fixation')"/>
            </div>
            <div class="client-fixation-head__title h1">Фиксация клиента</div>
          </div>
          <Form v-slot="{ errors }" as="" ref="formDataRef">
            <form class="client-fixation-form panel" @submit.prevent="submitForm">
              <Input v-model="formData.first_name" placeholder="Иван" label="Имя*" name="name" rules="required"/>
              <Input v-model="formData.last_name" placeholder="Иванов" label="Фамилия*" name="surname" rules="required"/>
              <Input v-model="formData.phone" placeholder="+7" label="Контактный номер*"
                     sublabel="Мы не звоним клиентам без вашего согласия" rules="required"
                     name="phone" type="tel" data-mask="+7 ### ### ## ##"/>
              <Input v-model="formData.phone2" placeholder="+7" label="Дополнительный номер*" rules="required"
                     sublabel="Обязательно укажите все доп. номера клиента и членов его семьи для проверки на уникальность"
                     name="add_phone" type="tel" data-mask="+7 ### ### ## ##"/>
              <Agreement v-model="formData.agreement"/>
              <ButtonDefault text="Оставить заявку" :disabled="errors && errors.name" :loader="store.loaderSubmit" />
            </form>
          </Form>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.client-fixation {
  .content {
    display: flex;
    flex-direction: column;
  }

  &-head {
    padding: 0 24px;
    margin-bottom: 30px;

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    &__title {
      color: var(--white);
    }

    &__subtitle {
      color: var(--light-main-gray-500);
      padding-top: 10px;
    }
  }

  &-form {
    padding: 30px 24px 40px 24px;
    margin-top: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    max-height: 697px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }

    .agreement {
      margin-top: 10px;
    }

    .btn-default {
      margin-top: 5px;
    }
  }

  &-form-code {
    padding-bottom: 279px;

    &__controls {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 22px;
    }

    &__repeat-code {
      color: var(--light-main-gray-700);
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.16px;
      position: relative;
      max-width: max-content;
      justify-self: center;
      margin-top: 4px;

      &:after {
        content: '';
        position: absolute;
        bottom: 1px;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: var(--light-main-gray-700);
      }
    }

    &__repeat-code-timer {
      color: var(--light-main-gray-500);
      justify-self: center;
      margin-top: 4px;
    }

    &:deep {
      .input-control {
        &-item {
          height: 80px;
          width: 70px;
          padding: 0 24px;
          display: flex;
          background-color: transparent;
          border-color: var(--light-main-gray-400);
          font-size: 23px;
          font-weight: 700;
          line-height: 34px;
          text-align: center;

          &.no-empty {
            background-color: var(--white);
            border-color: var(--white);
          }
        }
      }
    }
  }
}
</style>