<template>
  <div class="flex justify-around p-4">
    <div v-for="team in teams" :key="team.name" class="flex flex-col items-center">
      <!-- Nom de l'équipe -->
      <span class="text-white text-xl font-bold">{{ team.name }}</span>
      <!-- Score de l'équipe -->
      <span class="score text-white text-2xl font-semibold">{{ team.score }}</span>
      <!-- Affichage des erreurs sous forme de croix rouge -->
      <div class="mt-2">
        <img
          v-for="n in team.errors"
          :key="n"
          src="/assets/redCross.png"
          alt="Erreur"
          class="w-6 inline-block mr-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreBoard",
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    // Ici, tu pourras utiliser anime.js pour animer par exemple un effet de zoom sur l'élément .score
    // Exemple (à adapter) :
    // anime({
    //   targets: '.score',
    //   scale: [1, 1.2, 1],
    //   duration: 800,
    //   easing: 'easeInOutQuad',
    //   delay: anime.stagger(100)
    // });
  },
};
</script>

<style scoped>
/* Tu peux ajouter ici des styles spécifiques si nécessaire */
</style>
