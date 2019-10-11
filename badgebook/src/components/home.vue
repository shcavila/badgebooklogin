<template>
  <div>
    <div class="container">
      <SignUp></SignUp>
    </div>
    <div class="posts"></div>
  </div>
</template>

<script>
import SignUp from "./signUp";


export default {
  name: "Home",
  components: { 
    SignUp 
  },
};
</script>


<style scoped>
.col-sm-3 {
  border: 1px solid lightgrey;
  width: 400px;
  margin-top: 90px;
  margin-bottom: 40px;
  margin-right: 10%;
  margin-left: 10%;
  background: white;
  padding: 4%;
  text-align: center;
  float: right;
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.posts {
  height: 1000px;
  background-color: white;
}

.container {
  background-image: linear-gradient(to bottom right, white, #d9dcde);
  margin: 0;
  padding-top: 0;
  height: 650px;
  width: 100%;
}
</style>






