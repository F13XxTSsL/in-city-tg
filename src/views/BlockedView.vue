<script setup>

import IconLogo from "@/components/icons/IconLogo.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";
</script>

<template>
  <section class="blocked">
    <div class="container">
      <div class="content">
        <div class="blocked-logo">
          <IconLogo/>
        </div>
        <div class="blocked-content panel">
          <div class="blocked-content__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
              <path d="M17.9767 1.71436C22.5798 1.71436 26.2836 5.33654 26.2836 9.80836V12.1084C28.8671 12.9148 30.7495 15.2536 30.7495 18.047V25.4523C30.7495 28.9105 27.8825 31.7144 24.3478 31.7144H11.6527C8.11655 31.7144 5.24951 28.9105 5.24951 25.4523V18.047C5.24951 15.2536 7.13343 12.9148 9.71544 12.1084V9.80836C9.73068 5.33654 13.4345 1.71436 17.9767 1.71436ZM17.9919 18.7908C17.2603 18.7908 16.6658 19.3721 16.6658 20.0876V23.3968C16.6658 24.1272 17.2603 24.7085 17.9919 24.7085C18.7388 24.7085 19.3332 24.1272 19.3332 23.3968V20.0876C19.3332 19.3721 18.7388 18.7908 17.9919 18.7908ZM18.0071 4.32292C14.913 4.32292 12.398 6.76752 12.3828 9.77855V11.7849H23.6162V9.80836C23.6162 6.78243 21.1013 4.32292 18.0071 4.32292Z" fill="#D84C63"/>
            </svg>
          </div>
          <div class="blocked-content__title h1">Доступ закрыт</div>
          <div class="blocked-content__text body_16_reg">Вы добавлены стоп - лист ГК “ИНСИТИ”. Обратитесь в службу поддержки</div>
          <ButtonDefault text="+7 800 000 00 00"/>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">

.blocked {
  &-logo {
    text-align: center;
  }
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 24px;
    max-height: 640px;
    height: 100%;
    &__icon {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--light-status-rejection-100);
      margin-bottom: 24px;
    }
    &__title {
      margin-bottom: 10px;
    }
    &__text {
      color: var(--light-main-gray-500);
      text-align: center;
    }
    .btn-default {
      margin-top: auto;
      width: 100%;
    }
  }
}

</style>