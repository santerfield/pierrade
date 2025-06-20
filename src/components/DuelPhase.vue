<template>
  <div
    class="relative w-screen h-screen"
    style="background-image: url('/assets/Background.png'); background-size: cover; background-position: center;"
  >
    <!-- Interface dédiée pour la phase de Duel -->
    <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-60">
      <h2 class="text-3xl text-yellow-400 font-bold mb-4">Phase de Duel</h2>
      <p class="text-xl text-white mb-4">{{ duelQuestion }}</p>
      
      <!-- Bouton pour révéler la réponse -->
      <button 
        v-if="!answerRevealed" 
        @click="revealAnswer" 
        class="mb-4 p-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Révéler la réponse
      </button>
      
      <!-- Affichage de la réponse du duel lorsque révélée -->
      <p v-if="answerRevealed" class="text-xl text-green-400 font-semibold mb-4">
        {{ duelAnswer }}
      </p>
      
      <!-- Sélection de l'équipe gagnante et validation -->
      <div v-if="answerRevealed" class="flex flex-col sm:flex-row items-center">
        <select v-model="winningTeam" class="p-3 rounded border border-gray-300 mr-4">
          <option disabled value="">Sélectionner l'équipe gagnante</option>
          <option v-for="team in teams" :key="team.name" :value="team.name">
            {{ team.name }}
          </option>
        </select>
        <button 
          @click="applyVictory" 
          class="p-3 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DuelPhase",
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      duelQuestion: "Duel Question Placeholder",
      duelAnswer: "Duel Answer Placeholder",
      answerRevealed: false,
      winningTeam: ""
    }
  },
  methods: {
    revealAnswer() {
      this.answerRevealed = true;
    },
    applyVictory() {
      this.$emit("finishDuel", { winningTeam: this.winningTeam });
    }
  }
}
</script>

<style scoped>
/* Vous pouvez affiner les styles ici au besoin */
</style>
