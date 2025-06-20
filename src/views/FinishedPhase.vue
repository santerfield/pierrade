<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center p-4"
    style="background-image: url('/assets/endScreen.png');"
  >
    <h1 class="text-5xl font-bold text-white mb-8">La partie est terminée !</h1>
    <div v-if="winningTeam" class="mb-4">
      <h2 class="text-3xl font-bold text-yellow-300">
        🏆 Félicitations à l'équipe {{ winningTeam.name }} !
      </h2>
      <p class="text-xl text-white">Score : {{ winningTeam.score }}</p>
    </div>
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
  computed: {
    winningTeam() {
      if (!this.teams || this.teams.length === 0) return null;
      // Trouve l'équipe avec le score le plus élevé
      return this.teams.reduce((max, team) => (team.score > max.score ? team : max), this.teams[0]);
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
