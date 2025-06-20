<template>
  <div class="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-900 via-indigo-700 to-yellow-400 text-white">
    <!-- Logo : prend tout l'espace restant -->
    <div class="flex-1 flex items-center justify-center">
      <img
        src="/assets/logo.png"
        alt="Logo Un Pierre en Or"
        class="max-h-[70vh] w-auto animate-bounce drop-shadow-lg"
      />
    </div>
    <!-- Texte + formulaire : compact, collé en bas -->
    <div class="flex flex-col items-center justify-end w-full px-4 pb-4">
      <h1 class="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-500 animate-fade-in">
        Un Pierre en Or
      </h1>
      <p class="text-base md:text-xl text-center animate-fade-in-slow">
        Le jeu familial où chaque manche compte&nbsp;!
      </p>
      <div class="flex flex-col sm:flex-row items-center w-full max-w-md gap-2 bg-white/10 backdrop-blur-md rounded-xl shadow-lg animate-fade-in-slow mt-2">
        <input
          type="number"
          v-model.number="rounds"
          min="1"
          placeholder="Nombre de manches"
          class="p-2 rounded border border-gray-300 text-gray-900 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <button
          @click="start"
          class="relative overflow-hidden p-2 rounded bg-yellow-400 text-indigo-900 font-bold w-full sm:w-1/2 text-lg shadow-md transition-colors duration-300 group border-none"
        >
          <span
            class="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-gradient-to-r from-indigo-600 to-indigo-800 transition-all duration-300 ease-out z-0"
            style="transition-property: width;"
          ></span>
          <span
            class="relative z-10 transition-colors duration-300 group-hover:text-white"
          >
            Jouer !
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      rounds: 3
    }
  },
  methods: {
    start() {
      if (this.rounds > 0) {
        this.$emit('startGame', this.rounds);
      }
    }
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
}
.animate-fade-in-slow {
  animation: fade-in 1.8s cubic-bezier(.4,0,.2,1) both;
}
</style>
