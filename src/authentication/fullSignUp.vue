<template>
  <div class="innercont">
    <b-form @submit.prevent="register">
      <b-row>
        <b-col class="signup" sm="4">
          <p class="sign">Sign Up</p>
          <label>
            <p class="label-txt1">USERNAME</p>
            <input type="text" class="input" required v-model="username">
            <div id="unameErr" class="line-box">
              <div class="line"></div>
            </div>
            <transition name="slide-fade">
              <span class="err" v-if="err">Username already taken!</span>
            </transition>
          </label>
          <label>
            <p class="label-txt1">PASSWORD</p>
            <input type="password" class="input" required v-model="password">
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
            <input type="password" class="input" required v-model="confirmpassword">
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
        </b-col>
        <b-col id="perinfo" sm="8">
          <p class="sign2">Personal Information</p>
          <table>
            <td>
              <div class="fname">
                <label class="ln">
                  <p class="label-txt">FIRST NAME</p>
                  <input type="text" class="input" required v-model="firstname">
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
                  <input type="text" class="input" required v-model="lastname">
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
          </table>
          <label>
            <p class="label-txt">ADDRESS</p>
            <input type="text" class="input" required v-model="address">
            <div class="line-box">
              <div class="line"></div>
            </div>
          </label>
          <table class="srow">
            <td>
              <div class="fname">
                <label class="ln">
                  <p class="label-txt">AGE</p>
                  <input type="number" class="input" required v-model="age" min="12">
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
            <td>
              <div class="fname">
                <label class="ln">
                  <p id="gend" class="label-txt">BIRTHDATE</p>
                  <table class="bday">
                    <td>
                      <input
                        autocomplete="off"
                        type="text"
                        class="BD"
                        id="mnth"
                        placeholder="Month"
                        min="1"
                        max="12"
                        required
                        v-model="birthdate.month"
                      >
                      <div class="month">
                        <h5 @click="month('January')">January</h5>
                        <h5 @click="month('February')">February</h5>
                        <h5 @click="month('March')">March</h5>
                        <h5 @click="month('April')">April</h5>
                        <h5 @click="month('May')">May</h5>
                        <h5 @click="month('June')">June</h5>
                        <h5 @click="month('July')">July</h5>
                        <h5 @click="month('August')">August</h5>
                        <h5 @click="month('September')">September</h5>
                        <h5 @click="month('October')">October</h5>
                        <h5 @click="month('November')">November</h5>
                        <h5 @click="month('December')">December</h5>
                      </div>
                    </td>
                    <td id="day">
                      <input
                        type="number"
                        class="BD"
                        placeholder="Day"
                        min="1"
                        max="32"
                        required
                        v-model="birthdate.day"
                      >
                    </td>
                    <td>
                      <input
                        type="number"
                        class="BD"
                        placeholder="Year"
                        min="1990"
                        max="2019"
                        required
                        v-model="birthdate.year"
                      >
                    </td>
                  </table>
                  <div class="line-box">
                    <div class="line"></div>
                  </div>
                </label>
              </div>
            </td>
            <td>
              <div class="lname">
                <label class="ln">
                  <p id="gend" class="label-txt">GENDER</p>
                  <table class="gg">
                    <td>
                      <input
                        type="radio"
                        class="rad"
                        value="Male"
                        name="gender"
                        required
                        v-model="gender"
                      >
                      <span class="gender">MALE</span>
                    </td>
                    <td>
                      <input type="radio" class="rad" value="Female" name="gender" v-model="gender">
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

          <label>
            <p class="label-txt">EMAIL ADDRESS</p>
            <input type="email" class="input" required v-model="email">
            <div class="line-box">
              <div class="line"></div>
            </div>
          </label>

          <table class="lastrow">
            <td>
              <label class="ln">
                <p class="label-txt">OCCUPATION</p>
                <input type="text" class="input" required v-model="occupation">
                <div class="line-box">
                  <div class="line"></div>
                </div>
              </label>
            </td>
            <td id="years">
              <label class="ln">
                <p class="label-txt">YEARS</p>
                <input type="number" class="input" required v-model="years" min="1">
                <div class="line-box">
                  <div class="line"></div>
                </div>
              </label>
            </td>
          </table>
          <button type="submit">submit</button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FullSignUp",
  data() {
    return {
      username: "jrivas23",
      password: "jrivas2398",
      confirmpassword: "jrivas2398",
      firstname: "Jonathan",
      lastname: "Rivas",
      email: "rivas@gmail.com",
      age: 21,
      address: "Sa imong heart ayeehh",
      occupation: "POORgrammer",
      gender: "Male",
      birthdate: { month: "September", day: 23, year: 1998 },
      isValid: true,
      years: 10,
      err: false,
      type: ""
    };
  },

  methods: {
    register() {
     
      let userInfo = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        email: this.email,
        address: this.address,
        occupation: this.occupation,
        gender: this.gender,
        years: this.years,
        age: this.age,
        type: "Regular user"
      };
      if (
        this.isValid &&
        this.password != "" &&
        this.password == this.confirmpassword
      ) {
        this.$store
          .dispatch("fullsignup", userInfo)
          .then(() => {this.$router.push("/user");
            this.err = false;
            $("#unameErr").css({background: "#555657"});
            })
          .catch(err => {
            $("#unameErr").css({background: "red"});
            this.err = true;
          });
      } else {
        alert("invalid credentials!");
      }
    },
    checkUsername() {
      axios
        .post("http://localhost:8081/user/checkusername", {
          username: this.username
        })
        .then(
          (response) => {
              this.err = false;
              this.isValid = true;
          })
          .catch((err) => {
              this.err = true;
              this.isValid = false;
          }
        );
    },
    month(m) {
      this.birthdate.month = m;
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  created() {
    // if (
    //   this.username != "" &&
    //   this.password != "" &&
    //   this.confirmpassword != ""
    // ) {
    //   $(".label-txt1").addClass("label-active");
    // }
    // axios.get("http://localhost:8081/user/signedup").then(
    //   response => {
    //     if (response.data.username != null) {
    //       this.isValid = true;
    //       this.username = response.data.username;
    //       this.password = response.data.password;
    //       this.confirmpassword = response.data.password;
    //       $(".label-txt1")
    //         .addClass("label-active")
    //         .css({ color: "#555657" });
    //     }
    //   },
    //   err => {
    //     console.log("error");
    //   }
    // );
  },
  mounted() {
    $(".label-txt").addClass("label-active").css({ color: "#555657" });
    $(".input").focus(function() {
      $(this)
        .parent()
        .find("p")
        .addClass("label-active")
        .css({ color: "#0071ff" });
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find("p")
          .removeClass("label-active");
      }
      $(this)
        .parent()
        .find("p")
        .css({ color: "#555657" });
    });

    $("#mnth").click(function() {
      if ($(".month").is(":hidden")) {
        $("#mnth").val("");
        $(".month").slideDown();
      } else if  ($("#mnth").val() != "") {
         $(".month").slideUp();
      }
    });

  },
};
</script>


<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.lgt {
  color: red;
  text-decoration: underline;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #b3b4b5;
  margin: 1em 0;
  padding: 0;
}

.signup {
  overflow: auto;
  background: #e3e3e3;
  padding: 40px;
  text-align: center;
  border-right: none;
  height: 648px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: 1px solid #b3b4b5;
}
.uname {
  text-decoration: underline;
}
h5 {
  margin: 0;
  padding: 3px;
  font-weight: normal;
  font-size: 15px;
}

h5:hover {
  background-color: #0071ff;
  color: white;
}

.month {
  padding: 0px;
  display: none;
  position: absolute;
  border: 1px solid lightgray;
  z-index: 9999;
  background: #f7fafa;
}

#mnth {
  width: 100%;
  margin-left: 0;
}
#gend {
  font-size: 0.8em;
}

.BD {
  width: 100%;
  border: none;
  margin: 9px;
  margin-right: 0;
  font-weight: normal;
}

.bd {
  width: 100%;
  background: red;
}
.srow {
  margin-left: 0px;
  width: 100%;
}

#years {
  width: 150px;
  padding-left: 20px;
}

#perinfo {
  overflow: visible;
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
  margin: 15px;
}

.err {
  font-weight: normal;
  color: red;
  font-size: 14px;
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

#day {
  width: 10%;
}

.gg {
  margin-bottom: 0;
  /* height: 5px; */
  padding-top: 5px;
  width: 200px;
}
.bday {
  width: 250px;
  /* padding-top: 20px;
  margin-top: 10px; */
}

.bday td {
  width: 15%;
  padding-right: 10px;
  padding-top: 15px;
}

.gg td {
  padding-top: 12px;
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

.innercont {
  padding: 0;
  border-radius: 2px;
  border: 1px solid #bdbebf;
  overflow: hidden;
  width: 970px;
  height: 650px;
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
  transition: ease 0.2s;
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
  transition: ease 0.2s;
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
  transition: ease 0.2s;
}

.label-active {
  color: #0071ff;
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

.input {
  font-weight: normal;
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
  background: #0071ff;
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






