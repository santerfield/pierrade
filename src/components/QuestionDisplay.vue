<template>
  <div class="text-center my-4">
    <h2 ref="questionText" class="text-3xl text-yellow-400 font-bold">
      {{ question }}
    </h2>
  </div>
</template>

<script>
import { animate } from 'animejs';

export default {
  name: 'QuestionDisplay',
  props: {
    question: {
      type: String,
      required: true
    }
  },
  mounted() {
    // Animation de fade-in pour la question dès qu'elle s'affiche
    animate({
      targets: this.$refs.questionText,
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad'
    });
  }
};
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
