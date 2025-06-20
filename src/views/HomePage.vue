<template>
  <div class="flex flex-col min-h-screen w-full bg-[#0033cc] bg-gradient-to-br from-[#0033cc] via-indigo-700 to-yellow-400 text-white overflow-x-hidden">
    <div class="flex-1 flex flex-col items-center justify-center overflow-hidden relative">
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
      <div class="flex gap-8 justify-center items-end mb-6 w-full max-w-2xl mx-auto">
        <div
          v-for="(team, i) in teams"
          :key="team"
          :ref="el => teamEls[i] = el"
          class="relative"
        >
          <div
            class="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl border-4 select-none transition-transform duration-200"
            :class="teamColors[i]"
            :style="dragging === i
              ? dragStyle
              : (droppedTeams.includes(i)
                  ? { pointerEvents: 'none', opacity: 0.7, position: 'fixed', left: droppedPos[i]?.x + 'px', top: droppedPos[i]?.y + 'px', zIndex: 1000 }
                  : {})"
            @mousedown="!droppedTeams.includes(i) && startDrag(i, $event)"
            @touchstart.prevent="!droppedTeams.includes(i) && startDrag(i, $event)"
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
        <span class="text-xl font-bold text-yellow-100 select-none tracking-wider">
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
      droppedPos: {}, // {i: {x, y}}
      dragging: null,
      dragPos: { x: 0, y: 0 },
      dragOffset: { x: 0, y: 0 },
      dragStartPos: { x: 0, y: 0 }
    }
  },
  computed: {
    dragStyle() {
      if (this.dragging === null) return {};
      return {
        position: 'fixed',
        left: this.dragPos.x + 'px',
        top: this.dragPos.y + 'px',
        zIndex: 1000,
        pointerEvents: 'none'
      };
    }
  },
  mounted() {
    this.teamEls.forEach((el, i) => {
      if (el) {
        // Animation d'apparition
        animate(el, {
          keyframes: [
            { transform: 'scale(0.5)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
          ],
          delay: 400 + i * 250,
          duration: 900,
          easing: 'ease-out'
        });

        // Drag & drop natif avec animejs v4
        createDraggable(el, {
          onRelease: (e) => {
            const dropZone = this.$refs.dropZone;
            const dropRect = dropZone.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            // Vérifie si une partie du rond touche la zone
            const dropSuccess =
              elRect.right > dropRect.left &&
              elRect.left < dropRect.right &&
              elRect.bottom > dropRect.top &&
              elRect.top < dropRect.bottom;
            if (dropSuccess) {
              console.log(`[drop] ${this.teams[i]} déposé à`, { x: elRect.left, y: elRect.top });
              this.droppedTeams.push(i);
              // Animation de validation
              animate(el, {
                keyframes: [
                  { scale: 1.1 },
                  { scale: 1 }
                ],
                duration: 400,
                easing: 'ease-out'
              });
              // Fige la position
              this.$set
                ? this.$set(this.droppedPos, i, { x: elRect.left, y: elRect.top })
                : (this.droppedPos[i] = { x: elRect.left, y: elRect.top });
              // Désactive le drag
              el.style.pointerEvents = 'none';
              if (this.droppedTeams.length === this.teams.length) {
                this.$emit('startGame', { teams: this.teams });
              }
            } else {
              // Retour à la position d'origine (optionnel)
              animate(el, {
                translateX: 0,
                translateY: 0,
                duration: 400,
                easing: 'easeOutElastic'
              });
              console.log(`[drop] ${this.teams[i]} retour à la position initiale`);
            }
          }
        });
      }
    });
  },
  methods: {
    startDrag(i, event) {
      if (this.droppedTeams.includes(i)) {
        console.log(`[startDrag] Équipe déjà déposée : ${this.teams[i]}`);
        return;
      }
      const el = this.teamEls[i];
      const rect = el.getBoundingClientRect();
      const startX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
      const startY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;
      this.dragging = i;
      this.dragOffset = {
        x: startX - rect.left,
        y: startY - rect.top
      };
      this.dragPos = {
        x: rect.left,
        y: rect.top
      };
      this.dragStartPos = { ...this.dragPos };
      console.log(`[startDrag] ${this.teams[i]} départ:`, this.dragStartPos);
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag, { passive: false });
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchend', this.endDrag);
    },
    onDrag(event) {
      if (this.dragging === null) return;
      const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
      const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;
      this.dragPos = {
        x: clientX - this.dragOffset.x,
        y: clientY - this.dragOffset.y
      };
    },
    endDrag(event) {
      if (this.dragging === null) {
        console.log('[endDrag] Pas de drag en cours');
        return;
      }
      const i = this.dragging;
      const el = this.teamEls[i];
      const dropZone = this.$refs.dropZone;
      const dropRect = dropZone.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const dropSuccess =
        elRect.right > dropRect.left &&
        elRect.left < dropRect.right &&
        elRect.bottom > dropRect.top &&
        elRect.top < dropRect.bottom;
      if (dropSuccess) {
        // Dépôt réussi
        console.log(`[endDrag] ${this.teams[i]} fin:`, { x: elRect.left, y: elRect.top });
        this.droppedTeams.push(i);
        // On mémorise la position de drop pour figer le rond à cet endroit
        this.$set
          ? this.$set(this.droppedPos, i, { x: elRect.left, y: elRect.top })
          : (this.droppedPos[i] = { x: elRect.left, y: elRect.top });
        animate(el, {
          keyframes: [
            { scale: 1.1 },
            { scale: 1 }
          ],
          duration: 400,
          easing: 'ease-out'
        });
        setTimeout(() => {
          this.dragging = null;
          if (this.droppedTeams.length === this.teams.length) {
            this.$emit('startGame', { teams: this.teams });
          }
        }, 400);
      } else {
        // Retour à la position d'origine
        console.log(`[endDrag] ${this.teams[i]} retour à la position initiale`, this.dragStartPos);
        this.dragging = null;
      }
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchend', this.endDrag);
    }
  }
}
</script>

<style scoped>
/* Les animations sont gérées par animejs */
</style>
