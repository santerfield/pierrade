<template>
  <div class="w-full p-4 bg-black bg-opacity-50 fixed bottom-0 left-0">
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row items-center">
      <input 
        v-model="inputText" 
        type="text" 
        placeholder="Tapez votre réponse..." 
        class="flex-1 p-3 rounded border border-gray-300 mr-4"
      />
      <select v-model="selectedTeam" class="flex-1 p-3 rounded border border-gray-300">
        <option disabled value="">Equipe qui répond</option>
        <option v-for="team in teams" :key="team.name" :value="team.name">
          {{ team.name }}
        </option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "InputZone",
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      inputText: "",
      selectedTeam: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", { text: this.inputText, team: this.selectedTeam });
      this.inputText = "";
      this.selectedTeam = "";
    }
  }
};
</script>

<style scoped>
/* Styles additionnels si nécessaire */
</style>
