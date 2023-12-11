<script setup>
import { RouterView } from 'vue-router'
import {useAgentStore} from "@/stores/storeAgent";
const store = useAgentStore()

store.getAgent()
</script>

<template>
  <RouterView v-slot="{ Component, route  }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

</style>
