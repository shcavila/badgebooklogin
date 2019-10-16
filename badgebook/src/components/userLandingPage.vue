<template>
  <div>
    <h1>hi welcome</h1>
    <button v-on:click="logout">logout</button>
  </div>
</template>
<script>
export default {
  name: "LandingPage",
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
h1 {
  position: absolute;
  left:750px;
  margin-top: 200px;
}
button {
    position: absolute;
    margin-top: 250px;
}
</style>

