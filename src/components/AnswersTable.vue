<template>
  <div class="flex flex-row flex-wrap justify-center gap-4 py-6">
    <div
      v-for="(answer, index) in answers"
      :key="index"
      ref="cards"
      class="card relative w-64 h-24 rounded-xl shadow-lg flex items-center justify-center cursor-pointer select-none"
      @click="revealCard(index)"
    >
      <div class="card-inner w-full h-full" :style="{ transform: revealed[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
        <!-- Face avant (dos de la carte) -->
        <div class="face front absolute inset-0 flex items-center justify-center rounded-xl bg-yellow-400 overflow-hidden" style="backface-visibility: hidden;">
          <!-- Motif à points, ou remplace par une image si tu veux -->
          <div class="absolute inset-0 pointer-events-none">
            <span
              v-for="n in 20"
              :key="n"
              class="block w-3 h-3 rounded-full bg-yellow-200 opacity-40 absolute"
              :style="{ left: `${(n*37)%240}px`, top: `${(n*53)%80}px` }"
            ></span>
          </div>
          <span class="text-3xl font-black text-yellow-900 relative z-10">???</span>
        </div>
        <!-- Face arrière (réponse) -->
        <div class="face back absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-yellow-600 border-4 border-yellow-700 shadow-2xl" style="backface-visibility: hidden; transform: rotateY(180deg);">
          <span class="text-xl font-bold text-white drop-shadow-lg">{{ answer.text }}</span>
          <span class="text-md text-yellow-200 mt-1 font-bold">+{{ answer.points }} pts</span>
        </div>
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
  data() {
    return {
      revealed: this.answers.map(a => !!a.revealed)
    }
  },
  watch: {
    answers: {
      handler(newVal) {
        this.revealed = newVal.map(a => !!a.revealed);
      },
      deep: true
    }
  },
  methods: {
    revealCard(index) {
      if (this.revealed[index]) return;
      const cardInner = this.$refs.cards[index].querySelector('.card-inner');
      animate({
        targets: cardInner,
        rotateY: [0, 180],
        duration: 700,
        easing: 'easeInOutCubic',
        update: anim => {
          if (anim.progress > 50 && !this.revealed[index]) {
            this.$set(this.revealed, index, true);
            this.$emit('reveal', index);
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.card {
  perspective: 1000px;
}
.card-inner {
  transition: transform 0.7s cubic-bezier(0.77,0,0.175,1);
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0; left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  box-sizing: border-box;
}
.front {
  z-index: 2;
}
.back {
  transform: rotateY(180deg);
  z-index: 1;
}
</style>
