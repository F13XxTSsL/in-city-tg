<script setup>
import IconArrow from "@/components/icons/IconArrow.vue";
</script>

<template>
<div class="btn-back" @click="$emit('eventClick')">
  <IconArrow/>
</div>
</template>

<style scoped lang="scss">

.btn-back {
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: rotate(-180deg);
  background: var(--white);
  flex-shrink: 0;
  &:deep {
    svg {
      path {
        stroke: var(--light-main-gray-700);
      }
    }
  }
}

</style>