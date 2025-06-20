<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-cover bg-center"
    style="background-image: url('/assets/endScreen.png');"
  >
    <h1 class="text-5xl font-bold text-white mb-8">La partie est terminée !</h1>
    <div class="mb-8">
      <ScoreBoard :teams="teams" />
    </div>
    <button
      @click="restartGame"
      class="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-2xl"
    >
      Recommencer ?
    </button>
  </div>
</template>

<script>
import ScoreBoard from '../components/ScoreBoard.vue';

export default {
  name: "FinishedPhase",
  components: { ScoreBoard },
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  methods: {
    restartGame() {
      this.$emit("restartGame");
    }
  }
};
</script>

<style scoped>
/* Styles additionnels si besoin */
</style>
