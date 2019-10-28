<template>
  <div>
    <form class="signupform">
      <center>
        <h1 class="sign">Update Profile</h1>
      </center>
      <b-row>
        <b-col class="border-rig">
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Firstname</p>
              <input
                type="text"
                class="input"
                name="firstname"
                v-model="newinfo.firstname"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Lastname</p>
              <input
                type="text"
                class="input"
                name="lastname"
                v-model="newinfo.lastname"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Username</p>
              <input
                type="text"
                class="input"
                name="username"
                v-model="newinfo.username"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Age</p>
              <input
                type="number"
                class="input"
                name="age"
                v-model="newinfo.age"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Occupation</p>
              <input
                type="text"
                class="input"
                name="occupation"
                v-model="newinfo.occupation"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Years</p>
              <input
                type="number"
                class="input"
                name="years"
                v-model="newinfo.years"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Address</p>
              <input
                type="text"
                class="input"
                name="address"
                v-model="newinfo.address"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
        <b-col>
          <label>
            <div class="fixedwidth">
              <p class="label-txt">Email Address</p>
              <input
                type="text"
                class="input"
                name="emailaddress"
                v-model="newinfo.email"
                autocomplete="off"
                required
              >
              <div class="line-box">
                <div class="line"></div>
              </div>
            </div>
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Gender" id="gender-form">
            <b-form-radio-group id="radio-gender" v-model="newinfo.gender" name="radio-gender">
              <b-form-radio value="Male">Male</b-form-radio>
              <b-form-radio value="Female">Female</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col>
          <br>
          <button class="btn btn-primary btn-block btn-lg" v-on:click="sendUpdate">Submit</button>
          <button class="btn btn-danger btn-block btn-lg" v-on:click="sendUpdate">Cancel</button>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "SignUp",
  props: {
    username: String
  },
  data() {
    return {
      newinfo: {
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        occupation: "",
        years: 0,
        address: "",
        email: "",
        username: ""
      }
    };
  },
  methods: {
    sendUpdate(event) {
      event.preventDefault();
      alert("sending update");
      let uri_update = `http://localhost:8081/user/update-regular/${this.username}`;
      axios.post(uri_update, this.newinfo).then(response => {
        /* eslint-disable */
        console.log(response.data);
      });
    }
  },
  mounted() {
    let uri_profile = `http://localhost:4000/profile-regular/${this.username}`;
    this.axios.post(uri_profile).then(response => {
      this.newinfo = response.data;
    });
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
  },
  created() {
    this.$store.dispatch("getUserInfo").then(response => {
      var user = response.data;
      this.newinfo = {
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        gender: user.gender,
        occupation: user.occupation,
        years: user.years,
        address: user.address,
        email: user.email,
        username: user.username
      };
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

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
 {
  transform: translateX(10px);
  opacity: 0;
}

.signupform {
  border: 1px solid lightgrey;
  width: 100%;
  height: auto;
  margin-top: 0px;
  margin-bottom: 40px;
  background: white;
  text-align: center;
  float: right;
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: relative;
  padding-left: 15%;
}

.input {
  font-weight: normal;
  text-align-last: center;
}

.err {
  font-weight: normal;
  color: red;
  font-size: 13px;
  width: 100%;
  position: absolute;
  right: 0px;
}

.posts {
  height: 1000px;
  background-color: white;
}

.container {
  padding-left: 5%;
  padding-right: 5%;
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
  transition: ease 0.3s;
  margin-top: 5px;
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

.sign {
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 40px;
  margin-left: -15%;
}

.fixedwidth {
  width: 260px;
}

#gender-form {
  margin-right: 100%;
}

button {
  width: 250px;
}
</style>
