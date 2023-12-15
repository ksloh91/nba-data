<template>
  <div>
    <input
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search NBA Team"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "", // Holds the value entered in the search input
    };
  },
  methods: {
    async handleSearch() {
      try {
        const response = await axios.get(
          "https://www.balldontlie.io/api/v1/teams"
        );

        const teams = response.data.data; // Extract the teams array from the response

        const filteredTeams = teams.filter((team) =>
          team.full_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (filteredTeams.length > 0) {
          const teamName = filteredTeams[0].full_name.toLowerCase();
          const playersResponse = await axios.get(
            `https://www.balldontlie.io/api/v1/players`
          );

          const players = playersResponse.data.data;
          const filteredPlayers = players.filter(
            (player) => player.team.full_name.toLowerCase() === teamName
          );
          const teamWithPlayers = {
            team: filteredTeams[0],
            players: filteredPlayers,
          };

          // Emit an event to pass the team with players data to the parent component (Home.vue)
          this.$emit("team-with-players-found", teamWithPlayers);
        } else {
          // No matching team found
          this.$emit("team-with-players-found", null);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        this.$emit("team-with-players-found", null); // Error occurred
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
