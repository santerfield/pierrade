<template>
  <div class="flex flex-col min-h-[60vh] w-full items-center justify-start gap-6">
    <QuestionDisplay :question="currentQuestion.question" />
    <AnswersTable :answers="currentQuestion.answers" @reveal="handleReveal" />
    <InputZone :teams="teams" @submit="handleSubmit" />
  </div>
</template>

<script>
import ScoreBoard from '../components/ScoreBoard.vue';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import AnswersTable from '../components/AnswersTable.vue';
import InputZone from '../components/InputZone.vue';

export default {
  name: "RapidPhase",
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
          this.$set(this.currentQuestion.answers, i, {
            ...ans,
            revealed: true
          });
          matched = true;
          this.roundPoints += ans.points;
          const maxPoints = Math.max(...this.currentQuestion.answers.map(a => a.points));
          if (ans.points === maxPoints) {
            this.$emit("finishRapid", {
              roundScore: this.roundPoints,
              bestTeam: payload.team,
              currentQuestion: this.currentQuestion
            });
          } else {
            this.challengeMode = true;
          }
        }
      });
      if (!matched) {
        let teamIndex = this.teams.findIndex(t => t.name === payload.team);
        if (teamIndex !== -1) {
          this.teams[teamIndex].errors = (this.teams[teamIndex].errors || 0) + 1;
        }
      }
    }
  }
};
</script>

<style scoped>
/* Styles optionnels */
</style>
