<script setup>

import IconArrow from "@/components/icons/IconArrow.vue";

defineProps({
  item: {
    type: Object,
    default: () => null
  },
  link: {
    type: Boolean
  }
})

</script>

<template>
  <router-link class="card" :to="item?.path">
    <div class="card-icon">
      <component :is="item?.icon"/>
    </div>
    <div class="card-text body_16_bold">{{ item?.title }} <IconArrow v-if="link" /></div>
  </router-link>
</template>

<style scoped lang="scss">
  .card {
    border-radius: 10px;
    background: var(--white);
    box-shadow: 0 15px 25px 0 #ECEDF1;
    padding: 24px;
    transition: border 0.5s, box-shadow 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-icon {
      background-color: var(--light-main-gray-700);
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-text {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:deep {
        svg {
          path {
            stroke: var(--light-main-gray-700);
          }
        }
      }
    }
    &:hover {
      box-shadow: rgba(227,229,237, 1) 0 0 0 6px;
    }
  }
</style>