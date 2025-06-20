<template>
  <div class="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-900 via-indigo-700 to-yellow-400 text-white relative">
    <!-- Transition animée entre les phases -->
    <CountdownTransition
      v-if="showTransition"
      @transitionComplete="nextPhase"
      class="absolute inset-0 z-20"
    />

    <!-- PHASE RAPIDE -->
    <RapidPhase
      v-if="currentPhase === 'rapid'"
      :teams="teams"
      :sharedQuestion="currentQuestion"
      @finishRapid="handleFinishRapid"
      class="flex-1 w-full"
    />

    <!-- PHASE TOUR DE TABLE -->
    <TurnPhase
      v-else-if="currentPhase === 'turn'"
      :teams="teams"
      :sharedQuestion="currentQuestion"
      @finishTurn="handleFinishTurn"
      class="flex-1 w-full"
    />

    <!-- PHASE DUEL -->
    <DuelPhase
      v-else-if="currentPhase === 'duel'"
      :teams="teams"
      @finishDuel="handleFinishDuel"
      class="flex-1 w-full"
    />

    <!-- Scoreboard toujours visible en bas -->
    <div class="w-full max-w-3xl mx-auto px-4 py-2">
      <ScoreBoard :teams="teams" />
    </div>
  </div>
</template>

<script>
import RapidPhase from '../components/RapidPhase.vue';
import TurnPhase from '../components/TurnPhase.vue';
import DuelPhase from '../components/DuelPhase.vue';
import CountdownTransition from '../components/CountdownTransition.vue';
import ScoreBoard from '../components/ScoreBoard.vue';

export default {
  name: 'GamePage',
  components: {
    RapidPhase,
    TurnPhase,
    DuelPhase,
    CountdownTransition,
    ScoreBoard
  },
  props: {
    teams: {
      type: Array,
      required: true
    },
    gameRounds: {
      type: Number,
      required: true
    },
    sharedQuestion: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      currentQuestion: this.sharedQuestion || {
        question: "Question de démonstration",
        answers: [
          { text: "Réponse 1", points: 10, revealed: false },
          { text: "Réponse 2", points: 20, revealed: false },
          { text: "Réponse 3", points: 30, revealed: false },
          { text: "Réponse 4", points: 5, revealed: false },
          { text: "Réponse 5", points: 15, revealed: false }
        ]
      },
      currentPhase: 'rapid', // 'rapid' | 'turn' | 'duel'
      showTransition: false,
      nextPhaseName: ''
    };
  },
  methods: {
    handleFinishRapid(data) {
      // Traite la fin de la phase rapide
      this.startTransition("turn");
    },
    handleFinishTurn(data) {
      // Traite la fin de la phase tour de table
      this.startTransition("duel");
    },
    handleFinishDuel(data) {
      // Traite la fin de la phase duel et termine la manche
      this.$emit("finishRound", data);
    },
    startTransition(nextPhase) {
      this.nextPhaseName = nextPhase;
      this.showTransition = true;
    },
    nextPhase() {
      this.currentPhase = this.nextPhaseName;
      this.showTransition = false;
    }
  }
};
</script>

<style scoped>
.flex-1 {
  min-height: 0;
}
</style>
