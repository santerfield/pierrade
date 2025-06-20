<template>
  <div class="flex flex-col min-h-screen w-full bg-[#0033cc] bg-gradient-to-br from-[#0033cc] via-indigo-700 to-yellow-400 text-white overflow-x-hidden">
    <!-- Logo animé -->
    <div class="flex-1 flex items-center justify-center overflow-hidden">
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
      <p ref="subtitle" class="text-lg md:text-2xl text-center font-light mb-6">
        Trois équipes, une seule victoire&nbsp;:
        <span class="font-bold text-yellow-200">IRS</span>,
        <span class="font-bold text-indigo-200">FISC</span> ou
        <span class="font-bold text-white">Pierre</span> ?
      </p> 
      <!-- Equipes animées -->
      <div class="flex flex-wrap gap-8 justify-center items-end mb-10 w-full max-w-2xl mx-auto">
        <div
          v-for="(team, i) in teams"
          :key="team"
          :ref="el => teamEls[i] = el"
          class="flex flex-col items-center opacity-0 scale-75"
        >
          <div
            class="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-black shadow-2xl border-4 transition-transform duration-300 hover:scale-110"
            :class="teamColors[i]"
          >
            <span class="drop-shadow-lg">{{ team[0] }}</span>
          </div>
          <span class="mt-4 text-2xl font-semibold tracking-wide uppercase drop-shadow">{{ team }}</span>
        </div>
      </div>
      <!-- Zone à maintenir pour jouer avec progress bar animée -->
      <div
        ref="holdZone"
        class="relative group w-80 max-w-full h-16 rounded-2xl bg-white/20 border-2 border-yellow-300 flex items-center justify-center cursor-pointer overflow-hidden shadow-2xl transition-all hover:scale-105"
        @mousedown="startHold"
        @touchstart.prevent="startHold"
        @mouseup="cancelHold"
        @mouseleave="cancelHold"
        @touchend="cancelHold"
      >
        <span class="relative z-10 text-2xl font-extrabold text-yellow-100 select-none tracking-wider flex items-center">
          <svg class="inline-block w-7 h-7 mr-2 align-middle text-yellow-200 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 01.993.883L11 3v7h6a1 1 0 01.117 1.993L17 12h-7v6a1 1 0 01-1.993.117L8 18v-6H3a1 1 0 01-.117-1.993L3 10h6V3a1 1 0 011-1z"/>
          </svg>
          Maintenir pour jouer
        </span>
        <div
          ref="progressBar"
          class="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
          :style="{ width: progressWidth, opacity: progress > 0 ? 0.85 : 0 }"
        ></div>
      </div>
      <div class="mt-6 text-xs text-yellow-100/80 italic">
        Astuce&nbsp;: Maintenez la souris ou le doigt sur la zone pour lancer la partie !
      </div>
    </div>
  </div>
</template>

<script>
import { animate } from 'animejs';

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
      progress: 0,
      progressWidth: "0%",
      animeProgress: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Logo
      if (this.$refs.logo) {
        console.log('Animer logo', this.$refs.logo);
        animate(this.$refs.logo, {
          keyframes: [
            { transform: 'scale(0.7)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
          ],
          duration: 900,
          easing: 'ease-out'
        });
      }
      // Titre
      if (this.$refs.title) {
        console.log('Animer titre', this.$refs.title);
        animate(this.$refs.title, {
          keyframes: [
            { transform: 'translateY(40px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
          ],
          duration: 800,
          easing: 'ease-out'
        });
      }
      // Sous-titre
      if (this.$refs.subtitle) {
        console.log('Animer sous-titre', this.$refs.subtitle);
        animate(this.$refs.subtitle, {
          keyframes: [
            { transform: 'translateY(40px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
          ],
          delay: 200,
          duration: 800,
          easing: 'ease-out'
        });
      }
      // Equipes
      this.teamEls.forEach((el, i) => {
        console.log('Animer équipe', i, el);
        if (el) {
          animate(el, {
            keyframes: [
              { transform: 'scale(0.75) translateY(60px)', opacity: 0 },
              { transform: 'scale(1) translateY(0)', opacity: 1 }
            ],
            delay: 400 + i * 250,
            duration: 900,
            easing: 'ease-out'
          });
        }
      });
      // Zone de maintien
      if (this.$refs.holdZone) {
        console.log('Animer holdZone', this.$refs.holdZone);
        animate(this.$refs.holdZone, {
          keyframes: [
            { transform: 'translateY(40px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
          ],
          delay: 1200,
          duration: 700,
          easing: 'ease-out'
        });
      }
    });
  },
  methods: {
    startHold() {
      if (this.animeProgress) this.animeProgress.pause();
      this.progress = 0;
      this.progressWidth = "0%";
      const progressObj = { value: 0 };
      this.animeProgress = animate(progressObj, {
        value: 100,
        duration: 1200,
        easing: 'linear',
        update: () => {
          this.progress = progressObj.value;
          this.progressWidth = `${this.progress}%`;
        },
        complete: () => {
          this.progressWidth = "100%";
          this.$emit('startGame', { teams: this.teams });
        }
      });
    },
    cancelHold() {
      if (this.animeProgress) {
        this.animeProgress.pause();
        this.progress = 0;
        this.progressWidth = "0%";
      }
    }
  }
}
</script>

<style scoped>
/* Les animations sont gérées par animejs */
</style>
