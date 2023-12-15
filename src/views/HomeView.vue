<template>
  <div class="home">
    <h1>NBA Team</h1>
    <img alt="NBA logo" src="../assets/Logo-NBA.png" style="max-width: 200px" />
    <SearchTeam @team-with-players-found="displayTeamWithPlayers" />
    <div v-if="teamWithPlayers">
      <h2>
        {{ teamWithPlayers.team.full_name }} -
        {{ teamWithPlayers.team.conference }} Conference
      </h2>
      <h3>Players:</h3>
      <ul>
        <li v-for="player in teamWithPlayers.players" :key="player.id">
          {{ player.first_name }} {{ player.last_name }} - Position:
          {{ player.position }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No matching team found or data loading..</p>
    </div>
  </div>
</template>

<script>
import SearchTeam from "@/components/SearchTeam.vue";

export default {
  components: {
    SearchTeam,
  },
  data() {
    return {
      teamWithPlayers: null, // Holds the filtered team and its players data
    };
  },
  methods: {
    displayTeamWithPlayers(teamWithPlayers) {
      this.teamWithPlayers = teamWithPlayers; // Update the filtered team and players data
    },
  },
};
</script>
