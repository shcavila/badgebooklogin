<template>
  <div class="container">
    <center>
      <div class="innercont">
        <form class="col-sm-4">
          <p class="sign">Sign Up</p>
          <label>
            <p class="label-txt1">USERNAME</p>
            <input type="text" class="input" v-model="username" v-on:keyup="checkUsername" />
            <div class="line-box">
              <div class="line"></div>
            </div>
            <transition name="slide-fade">
              <span class="err" v-if="err">Username already taken!</span>
            </transition>
          </label>
          <label>
            <p class="label-txt1">PASSWORD</p>
            <input type="password" class="input" required v-model="password" />
            <div class="line-box">
              <div class="line"></div>
            </div>
            <transition name="slide-fade">
              <span
                class="err"
                v-show=" password.length < 8 && password  != ''"
              >must be at least 8 characters!</span>
            </transition>
          </label>
          <label>
            <p class="label-txt1">CONFIRM PASSWORD</p>
            <input type="password" class="input" required v-model="confirmpassword" />
            <div class="line-box">
              <div class="line"></div>
            </div>
            <transition name="slide-fade">
              <span
                class="err"
                v-show="confirmpassword != password && confirmpassword && password"
              >Password doesn't match!</span>
            </transition>
          </label>
        </form>
        <form id="perinfo" class="col-sm-8" @submit.prevent="register">
          <p class="sign2">Personal Information</p>
          <table>
            <td>
              <div class="fname">
                <label class="ln">
                  <p class="label-txt">FIRST NAME</p>
                  <input type="text" class="input" required v-model="firstname" />
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
            <td>
              <div class="lname">
                <label class="ln">
                  <p class="label-txt">LAST NAME</p>
                  <input type="text" class="input" required v-model="lastname" />
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
          </table>
          <label>
            <p class="label-txt">ADDRESS</p>
            <input type="text" class="input" required v-model="address" />
            <div class="line-box">
              <div class="line"></div>
            </div>
          </label>
          <table class="lastrow">
            <td>
              <label class="ln">
                <p class="label-txt">OCCUPATION</p>
                <input type="text" class="input" required v-model="occupation" />
                <div class="line-box">
                  <div class="line"></div>
                </div>
              </label>
            </td>
            <td id="years">
              <label class="ln">
                <p class="label-txt">YEARS</p>
                <input type="number" class="input" required v-model="years" min="0"/>
                <div class="line-box">
                  <div class="line"></div>
                </div>
              </label>
            </td>
          </table>
          
          <label>
            <p class="label-txt">EMAIL ADDRESS</p>
            <input type="email" class="input" required v-model="email" />
            <div class="line-box">
              <div class="line"></div>
            </div>
          </label>
          <table class="srow">
            <td>
              <div class="fname">
                <label class="ln">
                  <p class="label-txt2">AGE</p>
                  <input type="number" class="input" required v-model="age" min="0"/>
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
            <td>
              <div class="lname">
                <label class="ln">
                  <p class="label-txt2">GENDER</p>
                  <table>
                    <td>
                      <input type="radio" class="rad" value="Male" required v-model="gender" />
                      <span class="gender">MALE</span>
                    </td>
                    <td>
                      <input type="radio" class="rad" value="Female" v-model="gender" />
                      <span class="gender">FEMALE</span>
                    </td>
                  </table>
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
          </table>
          <button type="submit">submit</button>
        </form>
      </div>
    </center>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "FullSignUp",
  data() {
    return {
      username: "",
      password: "",
      confirmpassword: "",
      firstname: "",
      lastname: "",
      email: "",
      age: "",
      address: "",
      occupation: "",
      gender: "",
      isValid: false,
      years: "",
      err: false
    };
  },


  methods: {
    register() {
      var userInfo = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        address: this.address,
        occupation: this.occupation,
        gender: this.gender,
        age: this.age,
        show: true
      };
      // if (
      //   this.isValid &&
      //   this.password != "" &&
      //   this.password == this.confirmpassword
      // ) {
        axios.post("http://localhost:8081/user/fullsignup", userInfo)
        alert("successfully registered");
      // } else {
      //   alert("invalid credentials!");
      //   alert(userInfo)
      // }
    },
    checkUsername() {
      axios
        .post("http://localhost:8081/checkusername", {
          username: this.username
        })
        .then(
          response => {
            if (response.data != "username already used!") {
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
  created() {
    axios.post("http://localhost:8081/user/signedup").then(
      response => {
        this.username = response.data.username;
        this.password = response.data.password;
        this.confirmpassword = response.data.password;
      },
      err => {
        console.log(err);
      }
    );
  },
  mounted() {
    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt")
        .addClass("label-active");
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt")
          .removeClass("label-active");
      }
    });

    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt1")
        .addClass("label-active");
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt1")
          .removeClass("label-active");
      }
    });
  }
};
</script>


<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.col-sm-4 {
  background: #e3e3e3;
  padding: 40px;
  text-align: center;
  border-right: none;
  height: 100%;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: 1px solid #b3b4b5;
  position: relative;
}


.srow {
  margin-left: 0px;
  width: 400px;
}

#years {
  width: 150px;
  padding-left: 20px;
}

#perinfo {
  float: right;
  padding: 40px;
  margin: 0;
  border-radius: 5px;
  height: 100%;
  text-align: left;
}

.gender {
  font-weight: normal;
}
.pholder {
  padding: 0;
}

.rad {
  margin: 16px;
}

.err {
  font-weight: normal;
  color: red;
  font-size: 12px;
  position: absolute;
  left: 0px;
}

.fname {
  width: 100%;
  padding-right: 10px;
  margin: 0;
}
.ln {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.ln {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.lname {
  padding-left: 10px;
  width: 100%;
  margin: 0;
}
table {
  width: 100%;
  margin-top: 0;
  padding-top: 0;
  margin: 0;
  padding: 0;
  overflow: visible;
}

.container {
  margin-left: 0;
  padding: 0;
  width: 100%;
  font-weight: normal;
}

.innercont {
  margin-top: 7%;
  padding: 0;
  border-radius: 5px;
  border: 1px solid #bdbebf;
  overflow: auto;
  width: 970px;
  height: 650px;
  /* height: 100%; */
  /* margin:10%; */
  /* background-color: black; */
}

.body {
  padding: 0;
  margin: 0;
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
  transition: ease 0.3s;
  margin-top: 15px;
}

.label-txt1 {
  position: absolute;
  top: -1.6em;
  font-weight: normal;
  padding: 10px;
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.3s;
  margin-top: 15px;
}

.label-txt2 {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: 1em;
   font-weight: normal;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.3s;
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
  top: -3em;
}

button {
  padding: 12px 24px;
  background: rgb(220, 220, 220);
  font-weight: bold;
  color: rgb(120, 120, 120);
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ease 0.3s;
  margin-top: 50px;
  margin-left: 250px;
  /* float:right; */
}

button:hover {
  background: #5d5f61;
  color: #ffffff;
}

.sign {
  padding: 0px;
  margin-top: 0;
  font-size: 40px;
  font-weight: unset;
  font-family: sans-serif;
  font-weight: normal;
  margin-bottom: 60px;
}
.sign2 {
  padding: 0px;
  margin-top: 0;
  font-size: 25px;
  font-weight: unset;
  font-family: sans-serif;
  font-weight: normal;
  margin-bottom: 60px;
}

</style>






