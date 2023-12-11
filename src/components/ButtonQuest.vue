<script setup>
import IconQuest from "@/components/icons/IconQuest.vue";
</script>

<template>
  <div class="btn-quest" @click="$emit('eventClick')"><IconQuest/></div>
</template>

<style scoped lang="scss">
  .btn-quest {
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 50%;
    border: 2px solid var(--white, #FFF);
  }
</style>