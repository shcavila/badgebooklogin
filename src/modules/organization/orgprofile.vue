<template>
  <div id="Profile">
    <div class="text-center">
      <br>
      <br>
      <img :src="image" alt class="border rounded-circle border-dark" id="profile">
      <div class="card-header">
        <h4>{{ orgName }}</h4>
        <button v-on:click="InsideMethod" class="btn btn-primary btn-block">Update Profile</button>
      </div>
      <b-card>
        <!-- <h5>Organization Details</h5> -->
        <div class="text-left">
          <!-- <p>Username: {{orginfo.username}}</p> -->
          <p>Organization name: {{orgName}}</p>
          <p>Address: {{address}}</p>
          <p>Email Address: {{email}}</p>
          <p>Description: {{description}}</p>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
/*eslint linebreak-style: ["error", "windows"]*/
export default {
  name: "Profile",
  props: {
    username: String
  },
  data() {
    return {
      orgName: "",
      address: "",
      email: "",
      description: "",
      image: require("@/assets/pn.png")
    };
  },
  created() {
    this.$store.dispatch("getUserInfo").then(resp => {
      this.orgName= resp.data.orgName;
      this.address= resp.data.address;
      this.email= resp.data.email;  
      this.description= resp.data.description;
    });
  },

  methods: {
    InsideMethod() {
      this.$emit("InsideMethod");
    }
  }
};
</script>
<style scoped>
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
