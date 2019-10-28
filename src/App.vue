<template>
  <div id="app">
    <b-navbar class="navbar" toggleable="lg" type="dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/">
            <h3 class="web-name" href="#">BadgeBook*</h3>
          </router-link>
        </div>

        <b-navbar-nav class="ml-auto">
          <ul id="nav" class="nav navbar-nav navbar-right">
            <li>
              <b-nav-form id="search" @submit.prevent="search">
                <div class="searchbox">
                  <input
                    type="text"
                    id="srch"
                    class="form-control"
                    placeholder="Search"
                    v-model="person"
                  >
                </div>
              </b-nav-form>
            </li>
            <li>
              <div v-if="!this.$store.getters.isLoggedIn">
                <router-link class="btn btn-default" to="/signUpAs">
                  <p class="auth">Sign up</p>
                </router-link>

                <router-link id="su" class="btn btn-default" to="/login">
                  <p class="auth">Sign in</p>
                </router-link>
              </div>
              <button v-else id="su" class="btn btn-default" @click="signout">
                <p class="singout">Sign out</p>
              </button>
            </li>
          </ul>
        </b-navbar-nav>
        <span class="fa fa-bars">=</span>
      </div>
    </b-navbar>
    <center>
      <router-view class="content"/>
    </center>
  </div>
</template>


<script>
 // eslint-disable-next-line
 /* eslint-disable */
import $ from "jquery";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      person: ""
    };
  },
  methods: {
    search() {
      let user = { user: this.person };
      axios.post("http://localhost:8081/search", user).then(
        response => {
          if (response.data.respond != "Cannot find user!") {
            console.log(response.data);
            alert(response.data.respond);
          } else {
            alert(response.data.respond);
          }
        },
        err => {
          console.log("error");
        }
      );
    },
    signout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  mounted() {
    $(".fa").click(function() {
      if ($("ul").is(":visible")) {
        $("ul").hide();
      } else {
        $("ul").show();
      }
    });
    $(window).on("resize", function() {
      var win = $(this);
      if (win.width() >= 750) {
        $("ul").show();
        $('.fa').hide();
      }
    });

    $(window).on("resize", function() {
      var win = $(this);
      if (win.width() <= 750) {
        $("ul").hide();
        $(".fa").show();
      }
    });
  },
};
</script>

<style scoped>
.icon {
  padding-top: 0;
  display: none;
}

.fa {
  height: 40px;
  padding: 14px;
  padding-bottom: 5px;
  position: fixed;
  top: 0px;
  right: 0px;
  margin: 10px;
  display: none;
  color: white;
  cursor: pointer;
  transition: ease 0.3s;
}

.searchbox {
  /* margin: 10px; */
  padding: 0;
}

.content {
  padding-top:66px;
}

#srch {
  margin: 0;
  font-size: 13px;
  padding: 8px;
  width: 190px;
}

.fa:hover {
  background-color: lightblue;
  border-radius: 25px;
}
p {
  cursor: pointer;
  transition: ease 0.3s;
}
.btn:hover {
  border-color: gray;
}

p:hover {
  text-shadow: 5px 5px 5px black;
}

#search {
  margin: 12px;
}

#search:hover {
  box-shadow: 5px 5px 5px #1b2c3d;
}

.navbar {
  z-index: 9999;
  position: fixed;
  width: 100%;
  margin-top: 0px;
  border-radius: 0;
  padding-right: 2%;
  padding-left: 2%;
  margin-bottom: 0;
  background: #034e85;
  padding-top: 5px;
  padding-bottom: 3px;
  overflow: hidden;
}

.btn {
  float: right;
  padding: 5px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  margin: 8px;
  cursor: pointer;
  transition: ease 0.3s;
}

#su {
  padding-right: 0px;
  border: none;
}

ul {
  padding: 0;
  margin: 0;
}

body {
  zoom: 10%;
}

.auth {
  margin: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 17px;
  color: white;
}

.singout {
  margin: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 17px;
  color: white;
  font-weight: normal;
  padding-right: 10px;
}

.web-name {
  padding: 8px;
  color: white;
  letter-spacing: 3px;
  margin: 5px;
}

.material-icons {
  color: grey;
  top: 5px;
  left: 4px;
  position: absolute;
  margin-bottom: 0;
}

button {
  margin-left: 0px;
}

.form-control {
  margin: 0;
  border: none;
  padding-left: 30px;
}

.navbar-form {
  background-color: white;
  border-radius: 3px;
  position: relative;
  padding: 0;
  margin-right: 7px;
  margin-left: 10px;
  cursor: pointer;
  transition: ease 0.3s;
}
label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: 0.8em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
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
  height: 2px;
  background: #bcbcbc;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  /* left: 50%; */
  transform: translateX(0%);
  background: #0071ff;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

.label-active {
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

/* #nav {
  width: 450px;
  text-align: right;
} */

button:hover {
  background: #5d5f61;
  color: #ffffff;
}
</style>
