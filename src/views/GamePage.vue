<template>
  <div class="w-screen h-screen relative">
    <!-- Transition entre les phases -->
    <CountdownTransition v-if="showTransition" @transitionComplete="nextPhase" />

    <!-- Affichage conditionnel selon la phase en cours -->
    <RapidPhase
      v-if="currentPhase === 'rapid'"
      :teams="teams"
      :sharedQuestion="currentQuestion"
      @finishRapid="handleFinishRapid"
    />
    <TurnPhase
      v-else-if="currentPhase === 'turn'"
      :teams="teams"
      :sharedQuestion="currentQuestion"
      @finishTurn="handleFinishTurn"
    />
    <DuelPhase
      v-else-if="currentPhase === 'duel'"
      :teams="teams"
      @finishDuel="handleFinishDuel"
    />
  </div>
</template>

<script>
import RapidPhase from '../components/RapidPhase.vue';
import TurnPhase from '../components/TurnPhase.vue';
import DuelPhase from '../components/DuelPhase.vue';
import CountdownTransition from '../components/CountdownTransition.vue';

export default {
  name: 'GamePage',
  components: {
    RapidPhase,
    TurnPhase,
    DuelPhase,
    CountdownTransition
  },
  props: {
    teams: {
      type: Array,
      required: true
    },
    gameRounds: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentQuestion: {
        question: "Question placeholder pour le round",
        answers: [
          { text: "Réponse 1", points: 10, revealed: false },
          { text: "Réponse 2", points: 20, revealed: false },
          { text: "Réponse 3", points: 30, revealed: false },
          { text: "Réponse 4", points: 5, revealed: false },
          { text: "Réponse 5", points: 15, revealed: false },
          { text: "Réponse 6", points: 25, revealed: false },
          { text: "Réponse 7", points: 35, revealed: false },
          { text: "Réponse 8", points: 8, revealed: false },
          { text: "Réponse 9", points: 18, revealed: false },
          { text: "Réponse 10", points: 28, revealed: false }
        ]
      },
      currentPhase: 'rapid',
      showTransition: false,
      nextPhaseName: ''
    };
  },
  methods: {
    handleFinishRapid(data) {
      console.log("Fin de la phase de rapidité", data);
      this.startTransition("turn");
    },
    handleFinishTurn(data) {
      console.log("Fin de la phase de tour de table", data);
      this.startTransition("duel");
    },
    handleFinishDuel(data) {
      console.log("Fin de la phase de duel", data);
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
/* Styles optionnels */
</style>
