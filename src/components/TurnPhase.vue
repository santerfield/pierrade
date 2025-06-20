<template>
  <div
    class="relative w-screen h-screen"
    style="background-image: url('/assets/Background.png'); background-size: cover; background-position: center;"
  >
    <div class="absolute top-0 left-0 w-full">
      <ScoreBoard :teams="teams" />
      <QuestionDisplay :question="currentQuestion.question" />
    </div>
    <div class="mt-24">
      <AnswersTable :answers="currentQuestion.answers" @reveal="handleReveal" />
    </div>
    <InputZone :teams="teams" @submit="handleSubmit" />
  </div>
</template>

<script>
import ScoreBoard from '../components/ScoreBoard.vue';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import AnswersTable from '../components/AnswersTable.vue';
import InputZone from '../components/InputZone.vue';

export default {
  name: "TurnPhase",
  components: {
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
    sharedQuestion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentQuestion: this.sharedQuestion,
      roundPoints: 0,
      challengeMode: false
    };
  },
  methods: {
    handleReveal(index) {
      this.$set(this.currentQuestion.answers, index, {
        ...this.currentQuestion.answers[index],
        revealed: true
      });
    },
    handleSubmit(payload) {
      const input = payload.text.toLowerCase().trim();
      if (!input) return;
      let matched = false;
      this.currentQuestion.answers.forEach((ans, i) => {
        if (!ans.revealed && ans.text.toLowerCase().includes(input)) {
          this.$set(this.currentQuestion.answers, i, { ...ans, revealed: true });
          this.roundPoints += ans.points;
          matched = true;
        }
      });
      if (!matched) {
        let teamIndex = this.teams.findIndex(t => t.name === payload.team);
        if (teamIndex !== -1) {
          this.teams[teamIndex].errors = (this.teams[teamIndex].errors || 0) + 1;
          if (this.teams[teamIndex].errors >= 3) {
            this.challengeMode = true;
            this.$emit("finishTurn", {
              roundScore: this.roundPoints,
              bestTeam: payload.team,
              challengeMode: true,
              currentQuestion: this.currentQuestion
            });
            return;
          }
        }
      }
      const allRevealed = this.currentQuestion.answers.every(ans => ans.revealed);
      if (allRevealed) {
        this.$emit("finishTurn", {
          roundScore: this.roundPoints,
          bestTeam: payload.team,
          challengeMode: false,
          currentQuestion: this.currentQuestion
        });
      }
    }
  }
};
</script>

<style scoped>
/* Styles optionnels */
</style>
