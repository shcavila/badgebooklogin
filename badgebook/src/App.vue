<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
           <router-link to="/">
          <h3 class="web-name" href="#">BadgeBook</h3>
           </router-link>
        </div>

        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link class="btn btn-default" to="/signUpAs">
              <span class="glyphicon glyphicon-user"></span> Sign Up
            </router-link>
          </li>
          <li>
            <router-link class="btn btn-default" to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </router-link>
          </li>
        </ul>

        <form class="navbar-form navbar-right" action>
          <div class="form-group has-search">
            <span class="material-icons">search</span>
            <input type="text" class="form-control" placeholder="Search">
          </div>
        </form>
      </div>
    </nav>
    <center>
      <router-view/>
    </center>
    
  </div>
</template>


<script>
export default {
  name: "app"
};
</script>

<style scoped>
.navbar {
  z-index: 9999;
  position: fixed;
  width: 100%;
  margin-top: 0px;
  border-radius: 0;
  padding-right: 2%;
  padding-left: 2%;
  margin-bottom: 0;
  background:#043b80;
  padding-top: 3px;
  padding-bottom: 3px;
}

.btn {
  padding: 5px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  margin: 10px;
}

body{
  zoom:10%
}

.web-name {
  padding: 10px;
  color: white;
  padding: 5px;
  letter-spacing: 2px;
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
  margin-left: 5px;
}

.form-control {
  margin: 0;
  border: none;
  padding-left: 30px;
}

.navbar-form {
  background-color: white;
  border-radius: 3px;
  padding: 0;
  position: relative;
  margin-right: 7px;
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

button:hover {
  background: #5d5f61;
  color: #ffffff;
}

</style>
