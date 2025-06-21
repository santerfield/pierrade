<template>
  <div class="flex flex-col min-h-screen w-full bg-[#0033cc] bg-gradient-to-br from-[#0033cc] via-indigo-700 to-yellow-400 text-white overflow-x-hidden">
    <div class="flex-1 flex flex-col items-center justify-center relative">
      <img
        ref="logo"
        src="/assets/logo.png"
        alt="Logo Un Pierre en Or"
        class="h-full max-h-[50vh] w-auto max-w-[90vw] object-contain drop-shadow-2xl"
      />
    </div>
    <!-- Bas de page -->
    <div class="flex flex-col items-center justify-end w-full px-2 sm:px-4 pb-8">
      <h1 ref="title" class="text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-500 drop-shadow-lg mb-2">
        Un Pierre en Or
      </h1>
      <!-- Equipes draggables en ronds, juste avant le texte -->
      <div class="flex gap-8 justify-center items-end mb-6 w-full max-w-2xl mx-auto  ">
        <div
          v-for="(team, i) in teams"
          :key="team"
          class="relative"
        >
          <div
            :ref="el => teamEls[i] = el"
            class="w-40 h-40 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl border-4 select-none transition-transform duration-200 p-8"
            :class="teamColors[i]"
            :style="droppedTeams.includes(i) ? { opacity: 0.7 } : {}"
          >
            {{ team }}
          </div>
        </div>
      </div>
      <p ref="subtitle" class="text-lg md:text-2xl text-center font-light mb-6">
        Trois équipes, une seule victoire&nbsp;:
        <span class="font-bold text-yellow-200">IRS</span>,
        <span class="font-bold text-indigo-200">FISC</span> ou
        <span class="font-bold text-white">Pierre</span> ?
      </p>
      <!-- Zone de drop -->
      <div
        ref="dropZone"
        class="relative w-96 max-w-full h-24 rounded-2xl bg-white/30 border-4 border-dashed border-yellow-300 flex items-center justify-center mx-auto mb-8 transition-all"
        :class="{ 'bg-green-400/40 border-green-500': droppedTeams.length === teams.length }"
      >
        <span
          ref="dropSpan"
          class="text-xl font-bold text-yellow-100 select-none tracking-wider"
        >
          Déposez toutes les équipes ici pour commencer !
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { animate, createDraggable } from 'animejs';

export default {
  name: "HomePage",
  data() {
    return {
      teams: ["IRS", "FISC", "Pierre"],
      teamColors: [
        "bg-yellow-400 border-yellow-600 text-indigo-900",
        "bg-indigo-400 border-indigo-700 text-yellow-100",
        "bg-white border-yellow-400 text-indigo-900"
      ],
      teamEls: [],
      droppedTeams: [],
      draggables: []
    }
  },
  mounted() {
    this.teamEls.forEach((el, i) => {
      if (el) {
        animate(el, {
          keyframes: [
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1.1 },
            { opacity: 1, scale: 1 }
          ],
          delay: 400 + i * 250,
          duration: 900,
          easing: 'ease-out',
          complete: () => {
            // Création du draggable SEULEMENT après l'animation d'apparition
            const draggable = createDraggable(el, {
              axis: 'both',
              onGrab: (draggable) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + el.offsetWidth / 2;
                const centerY = rect.top + el.offsetHeight / 2;
                console.log(
                  `[drag] ${this.teams[i]} départ:`,
                  `relative x: ${draggable.x}, y: ${draggable.y} |`,
                  `center abs: (${centerX}, ${centerY})`
                );
              },
              //onUpdate: (draggable) => {
                // console.log(`[drag] ${this.teams[i]} move:`, draggable.x, draggable.y);
                // Animation de translation pendant le drag
              //},
              onRelease: (draggable) => {
                const dropZone = this.$refs.dropZone;
                const dropRect = dropZone.getBoundingClientRect();
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + el.offsetWidth / 2;
                const centerY = rect.top + el.offsetHeight / 2;

                console.log(
                  `[drag] ${this.teams[i]} fin:`,
                  `relative x: ${draggable.x}, y: ${draggable.y} |`,
                  `center abs: (${centerX}, ${centerY})`
                );
                console.log(
                  '[drop zone]',
                  `left: ${dropRect.left}, right: ${dropRect.right}, top: ${dropRect.top}, bottom: ${dropRect.bottom}`
                );

                const dropSuccess =
                  centerX > dropRect.left &&
                  centerX < dropRect.right &&
                  centerY > dropRect.top &&
                  centerY < dropRect.bottom;

                if (dropSuccess) {
                  console.log(`[drag] ${this.teams[i]} : SUCCESS`);
                  this.droppedTeams.push(i);
                  draggable.enabled = false;
                  if (this.droppedTeams.length === this.teams.length) {
                    this.$emit('startGame', { teams: this.teams });
                    console.log('Toutes les équipes déposées, démarrage du jeu !');
                  }
                } else {
                  console.log(`[drag] ${this.teams[i]} : ÉCHEC (en dehors de la zone)`);
                }
              }
            });
            this.draggables[i] = draggable;
          }
        });
      }
    });
  }
}
</script>

<style scoped>
/* Les animations sont gérées par animejs */
</style>
