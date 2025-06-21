<template>
  <div class="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-900 via-indigo-700 to-yellow-400 text-white relative">
    <!-- Transition animée entre les phases -->
    <CountdownTransition
      v-if="showTransition"
      @transitionComplete="nextPhase"
      class="absolute inset-0 z-20"
    />

    <!-- CONTENU CENTRAL -->
    <div class="flex-1 flex flex-col items-center justify-center w-full">
      <div
        class="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6 items-center"
        style="background: url('/assets/Background.png') center/cover no-repeat;"
      >
        <ScoreBoard :teams="teams" />

        <QuestionDisplay :question="currentQuestion.question" class="w-full" />

        <!-- PHASE RAPID -->
        <template v-if="currentPhase === 'rapid'">
          <AnswersTable :answers="currentQuestion.answers" class="w-full" />
          <InputZone
            :teams="teams"
            @submit="handleSubmitAnswer"
            class="w-full"
          />
        </template>

        <!-- PHASE TURN -->
        <template v-else-if="currentPhase === 'turn'">
          <AnswersTable :answers="currentQuestion.answers" class="w-full" />
          <!-- Ajoute ici les composants spécifiques à la phase turn si besoin -->
        </template>

        <!-- PHASE DUEL -->
        <template v-else-if="currentPhase === 'duel'">
          <AnswersTable :answers="currentQuestion.answers" class="w-full" />
          <!-- Ajoute ici les composants spécifiques à la phase duel si besoin -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import RapidPhase from '../components/RapidPhase.vue';
import TurnPhase from '../components/TurnPhase.vue';
import DuelPhase from '../components/DuelPhase.vue';
import CountdownTransition from '../components/CountdownTransition.vue';
import ScoreBoard from '../components/ScoreBoard.vue';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import AnswersTable from '../components/AnswersTable.vue';
import InputZone from '../components/InputZone.vue';

export default {
  name: 'GamePage',
  components: {
    RapidPhase,
    TurnPhase,
    DuelPhase,
    CountdownTransition,
    ScoreBoard,
    QuestionDisplay,
    AnswersTable,
    InputZone
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
  watch: {
    sharedQuestion(newQ) {
      if (newQ) this.currentQuestion = newQ;
    }
  },
  methods: {
    handleFinishRapid(data) {
      this.startTransition("turn");
    },
    handleFinishTurn(data) {
      this.startTransition("duel");
    },
    handleFinishDuel(data) {
      this.$emit("finishRound", data);
    },
    startTransition(nextPhase) {
      this.nextPhaseName = nextPhase;
      this.showTransition = true;
    },
    nextPhase() {
      this.currentPhase = this.nextPhaseName;
      this.showTransition = false;
    },
    handleSubmitAnswer(answer) {
      // Logique pour gérer la soumission d'une réponse
    }
  }
};
</script>

<style scoped>
.flex-1 {
  min-height: 0;
}
</style>
