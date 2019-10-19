<template>
  <div class="container">
    <center>
      <form id="lgn" @submit.prevent="login">
        <h1 class="sign">Sign in</h1>

        
        <label>
          <p class="label-txt">ENTER USERNAME</p>
          <input type="text" class="input" required v-model="username" />
          <div class="line-box">
            <div class="line"></div>
          </div>
        </label>
        <label>
          <p class="label-txt">ENTER PASSWORD</p>
          <input type="password" class="input" required v-model="password" />
          <div class="line-box">
            <div class="line"></div>
          </div>
        </label>

        <button type="submit">submit</button>
      </form>
    </center>
  </div>
</template>


<script>
import $ from "jquery";
import axios from "axios";



export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let cred = { username: this.username, password: this.password };
       this.$store.dispatch("signup", cred)
        .then(() => this.$router.push("/landingpage"))
        .catch(err => console.log(err));
      axios.post("http://localhost:8081/login", cred).then(response => {
        if (response.data.message != "login unsuccessful") {
          console.log(response)
          alert("login successfull");
        } else {
          alert(response.data.message);
        }
      });
    }
  },
  mounted() {
    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt")
        .addClass("label-active").css({"color":"#0071ff"});
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt")
          .removeClass("label-active");
      }
      $(this)
        .parent()
        .find(".label-txt")
        .css({"color":"#555657"});
    });
  }
};
</script>

<style scoped>
#lgn {
  border: 1px solid lightgrey;
  width: 400px;
  margin-top: 150px;
  margin-bottom: 40px;
  background: white;
  padding: 40px;
  text-align: center;
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.container {
  justify-content: center;
  margin: 0;
  padding-top: 0;
  width: 100%;
}
.input {
  font-weight: normal;
}

label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  font-weight: normal;
  padding: 10px;
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.2s;
  margin-top: 15px;
}

.label-active {
  color:#0071ff;
  font-size: 0.8em;
  top: -3em;
}

.input {
  width: 100%;
  padding: 10px;
  /* height: 5px; */
  background: transparent;
  border: none;
  outline: none;
  text-align: left;
}

.line-box {
  position: relative;
  width: 100%;
  height: 1px;
  background: #555657;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  transform: translateX(0%);
  background: #0071ff;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}



button {
  display: inline-block;
  padding: 12px 24px;
  background: rgb(220, 220, 220);
  font-weight: bold;
  color: rgb(120, 120, 120);
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ease 0.3s;
}

button:hover {
  background: #0071ff;
  color: #ffffff;
}

.sign {
  padding: 0px;
  margin-top: 0;
  margin-bottom: 60px;
}
</style>






