<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <!-- Logo du jeu -->
    <img src="/assets/logo.png" alt="Logo Un Pierre en Or" class="w-48 mb-8" />
    
    <!-- Titre du jeu -->
    <h1 class="text-4xl font-bold mb-4">Un Pierre en Or</h1>
    
    <!-- Saisie du nombre de manches et bouton de démarrage -->
    <div class="flex flex-col sm:flex-row items-center">
      <input 
        type="number" 
        v-model.number="rounds" 
        placeholder="Nombre de manches"
        class="p-3 rounded border border-gray-300 mb-4 sm:mb-0 sm:mr-4"
      />
      <button 
        @click="startGame" 
        class="p-3 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors"
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
/* Vous pouvez ajouter ici des styles supplémentaires si nécessaire */
</style>
