<template>
  <div
    ref="transitionContainer"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
  >
    <h1 class="text-white text-4xl font-bold">Transition...</h1>
  </div>
</template>

<script>
import { animate } from 'animejs';

export default {
  name: "CountdownTransition",
  mounted() {
    animate({
      targets: this.$refs.transitionContainer,
      rotate: '360deg',
      duration: 3000,
      easing: 'easeInOutSine',
      complete: () => {
        this.$emit("transitionComplete");
      }
    });
  }
};
</script>

<style scoped>
/* Le conteneur couvre toute la fenêtre */
</style>
