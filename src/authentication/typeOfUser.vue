<template>
  <b-container class="contain">
    <center>
      <div class="holder">
        <div class="choices">
          <span class="ch">Create an account as</span>
          <button
            id="org"
            class="btn btn-default"
            v-on:click="signUpAs('Organization')"
          >ORGANIZATION</button>
          <button
            id="reg"
            v-on:click="signUpAs('Regular User')"
            class="btn btn-default"
          >REGULAR USER</button>
        </div>
        <FullSignUp v-show="type=='Regular User'"></FullSignUp>
        <OrgSignUp v-show="type=='Organization'"></OrgSignUp>
      </div>
    </center>
  </b-container>
</template>

<script>
import FullSignUp from "./fullSignUp";
import OrgSignUp from "./orgSignUp";
import $ from "jquery";

export default {
  name: "TypeOfUser",
  data() {
    return {
      type: "Regular User"
    };
  },
  components: {
    FullSignUp,
    OrgSignUp
  },
  methods: {
    signUpAs(type) {
      if (type == "Organization") {
        $("#org").css({"background-color":"#034e85"})
        $("#reg").css({"background-color":"#b8bcc2"})
        this.type = type;
      } else {
        $("#reg").css({"background-color":"#034e85"})
        $("#org").css({"background-color":"#b8bcc2"})
        this.type = type;
      }
    },
    
  }
};
</script>

<style scoped>
.contain {
  text-align: center;
  padding-top:90px;
  text-align: center;
  margin-top:0;
  margin-left: 0;
  margin-right:0;
  padding-left: 0;
  padding-right:0;
  width: 100%;
  font-weight: normal;
}



.tp {
  margin-bottom: 2px;
  padding-bottom: 0;
}

.choices {
  border-bottom: none;
  border-radius: 2px;
  position: relative;
}

.holder {
  padding: 0;
  width: 970px;
  /* margin-top: 80px; */
  text-align: right;
}
.ch {
  font-size: 17px;
  font-weight: normal;
  margin-right: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
  position:absolute;
  bottom:4px;
  right: 255px;
  font-family: sans-serif;
}

.btn {
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #034e85;
  color: white;
  border: none;
  padding: 10px;
  padding-bottom: 8px;
  cursor: pointer;
  transition: ease 0.3s;
}

#org {
  margin-right: 5px;
  background-color:#b8bcc2;
}
.btn:focus {
  outline: none;
}


#option {
  margin-top: 15%;
  border-radius: 1px;
  padding: 0;
}

.close {
  padding: 5px;
  margin-left: 0;
  margin-right: 5px;
}
h2 {
  border-bottom: 1px solid gray;
  padding: 25px;
  margin: 0;
  padding-bottom: 10px;
}

</style>