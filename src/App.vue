<template>
  <div class="w-screen h-screen">
    <!-- Affichage de la page d'accueil -->
    <HomePage v-if="currentView === 'home'" @startGame="handleStartGame" />

    <!-- Affichage de la vue principale du jeu -->
    <GamePage
      v-if="currentView === 'game'"
      :teams="teams"
      :gameRounds="gameRounds"
      :sharedQuestion="currentQuestion"
      @finishRound="handleFinishRound"
    />

    <!-- Affichage de la page de fin -->
    <FinishedPhase
      v-if="currentView === 'finished'"
      :teams="teams"
      @restartGame="handleRestartGame"
    />
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue';
import GamePage from './views/GamePage.vue';
import FinishedPhase from './views/FinishedPhase.vue';
import { getRandomQuestion } from './data/questions.js';
import gameLogic from './logic/gameLogic.js';

export default {
  name: "App",
  components: {
    HomePage,
    GamePage,
    FinishedPhase
  },
  data() {
    return {
      currentView: 'home', // "home" | "game" | "finished"
      gameRounds: 0,
      currentRoundIndex: 0,
      teams: [
        { name: "IRS", score: 0, errors: 0 },
        { name: "FISC", score: 0, errors: 0 },
        { name: "Pierre", score: 0, errors: 0 }
      ],
      currentQuestion: null
    }
  },
  methods: {
    handleStartGame(rounds) {
      // Initialisation du jeu avec le nombre de manches choisi
      this.gameRounds = rounds;
      this.currentRoundIndex = 1;
      this.teams = gameLogic.resetTeams(this.teams);
      this.currentQuestion = getRandomQuestion();
      this.currentView = 'game';
    },
    handleFinishRound(data) {
      // Gestion de la fin d'un round (les scores peuvent être mis à jour via la logique métier)
      console.log("Fin du round :", data);
      if (this.currentRoundIndex < this.gameRounds) {
        this.currentRoundIndex++;
        this.currentQuestion = getRandomQuestion();
      } else {
        this.currentView = 'finished';
      }
    },
    handleRestartGame() {
      // Retour à la page d'accueil pour redémarrer le jeu
      this.currentView = 'home';
    }
  }
};
</script>

<style>
/* Vous pouvez ajouter ici des styles globaux si besoin */
</style>
