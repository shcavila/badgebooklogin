<template>
  <!-- <div id="signup"> -->
    <form class="signupform" @submit.prevent="login">
      <h1 class="sign">Sign up</h1>
      <label>
        <p class="label-txt">USERNAME</p>
        <input
          type="text"
          class="input"
          name="username"
          v-model="username"
          v-on:keyup="checkUsername"
          autocomplete="off" required
        >
        <div class="line-box">
          <div id="username" class="line"></div>
        </div>
         <transition name="slide-fade">
        <span class="err" v-if="err">Username already taken!</span>
         </transition>
      </label>
      <label>
        <p class="label-txt">PASSWORD</p>
        <input type="password" class="input" name="password" v-model="password" required>
        <div class="line-box">
          <div class="line"></div>
        </div>
         <transition name="slide-fade">
        <span
          class="err"
          v-show="password.length < 8 && password  != ''"
        >Password must be at least 8 characters!</span>
         </transition>
      </label>
      <label>
        <p class="label-txt">CONFIRM PASSWORD</p>
        <input
          type="password"
          class="input"
          name="confirmpassword"
          v-model="confirmpassword"
          required
        >
        <div class="line-box">
          <div class="line"></div>
        </div>
        <transition name="slide-fade">
        <span
          class="err"
          v-show="confirmpassword != password && confirmpassword != '' && password != ''"
        >Password doesn't match!</span>
        </transition>
      </label>

      <button type="submit">submit</button>
    </form>
  <!-- </div> -->
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      confirmpassword: "",
      err: false,
      isValid: true
    };
  },
  methods: {
    login() {
      if (
        this.isValid &&
        this.password == this.confirmpassword &&
        this.password.length > 7
      ) {
        let newUser = { username: this.username, password: this.password };
        axios.post("http://localhost:8081/user/signup", newUser).then(response => {
          if (response.status == 200) {
            this.$router.push("/signUpAs");
          } 
        }, err => {
          alert("an error occrured")
        });
      } else {
        alert("Invalid credentials")
      }
    },

    checkUsername() {
      axios
        .post("http://localhost:8081/user/checkusername", {
          username: this.username
        })
        .then(
          response => {
            //alert(response.data.message)
            if (response.data.message != "username already exist") {
              this.err = false;
              this.isValid = true;
            } else {
              this.err = true;
              this.isValid = false;
            }
          },
          err => {
            console.log("error occured");
          }
        );
    }
  },
  mounted() {
    $(".input").focus(function() {
      $(this).parent().find("p").addClass("label-active").css({"color":"#0071ff"});

    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this).parent().find("p").removeClass("label-active");

      }
      $(this).parent().find("p").css({"color":"#555657"});
    });
  }
};
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.signupform {
  border: 1px solid lightgrey;
  width: 380px;
  height: 500px;
  margin-top: 90px;
  margin-bottom: 40px;
  margin-right: 10%;
  margin-left: 10%;
  background: white;
  padding: 45px;
  text-align: center;
  float: right;
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: relative;
}

.input {
  font-weight: normal;
}

.err {
  font-weight: normal;
  color: red;
  font-size: 13px;
  width: 100%;
  position:absolute;
  right:0px;
}

.posts {
  height: 1000px;
  background-color: white;
}

.container {
  /* background-image: linear-gradient(to bottom right, white, #d9dcde); */
  margin: 0;
  padding-top: 0;
  height: 1000px;
  width: 100%;
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

.input {
  font-weight: normal;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  transform: translateX(0%);
  background: #032dff;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

.label-active {
  color:#0071ff;
  font-size: 0.8em;
  top: -3em;
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

