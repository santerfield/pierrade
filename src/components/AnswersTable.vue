<template>
  <div class="grid grid-cols-2 gap-4 p-4">
    <div 
      v-for="(answer, index) in answers" 
      :key="index"
      class="card relative w-full h-20 bg-gray-800 rounded shadow-lg flex items-center justify-center transform transition duration-700 cursor-pointer"
      :class="{ 'rotate-y-180': answer.revealed }"
      @click="flipCard(index)"
    >
      <div class="face front absolute inset-0 flex items-center justify-center">
        <span class="text-2xl font-bold text-white">???</span>
      </div>
      <div class="face back absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-xl font-bold text-yellow-300">{{ answer.text }}</span>
        <span class="text-md text-white">- {{ answer.points }} pts</span>
      </div>
    </div>
  </div>
</template>

<script>
import { animate } from 'animejs';

export default {
  name: 'AnswersTable',
  props: {
    answers: {
      type: Array,
      required: true
    }
  },
  methods: {
    flipCard(index) {
      animate({
        targets: this.$el.querySelectorAll('.card')[index],
        rotateY: '+=180',
        duration: 800,
        easing: 'easeInOutQuad'
      });
      this.$emit('reveal', index);
    }
  }
}
</script>

<style scoped>
.card {
  perspective: 1000px;
}
.face {
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}
.back {
  transform: rotateY(180deg);
}
</style>
