<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white p-4">
    <!-- Logo du jeu -->
    <img src="/assets/logo.png" alt="Logo Un Pierre en Or" class="w-32 md:w-48 mb-8" />
    
    <!-- Titre du jeu -->
    <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center">Un Pierre en Or</h1>
    
    <!-- Saisie du nombre de manches et bouton de démarrage -->
    <div class="flex flex-col sm:flex-row items-center w-full max-w-md">
      <input 
        type="number" 
        v-model.number="rounds" 
        placeholder="Nombre de manches"
        class="p-3 rounded border border-gray-300 text-gray-900 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto"
      />
      <button 
        @click="startGame" 
        class="p-3 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors w-full sm:w-auto text-lg font-semibold"
      >
        Jouer !
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      rounds: 3
    }
  },
  methods: {
    startGame() {
      // Émission de l'événement startGame avec le nombre de manches choisi.
      this.$emit('startGame', this.rounds)
    }
  }
}
</script>

<style scoped>
/* Ajout d'un style pour garantir que le body prend toute la hauteur */
html, body, #app {
  height: 100%;
}
</style>
