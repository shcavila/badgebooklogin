<template>
  <div id="myModal" role="dialog" v-show="type == ''">
    <div id="option" class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" aria-label="Close" v-on:click="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2>CREATE ACCOUNT AS</h2>
          <span id="org" class="btn btn-default" v-on:click="signUpAs('Organization')">ORGANIZATION</span>
          <span  id="reg" v-on:click="signUpAs('Regular User')" class="btn btn-default">REGULAR USER</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeOfUser",
  data() {
    return {
      type: ""
    };
  },
  methods: {
    signUpAs(type) {
      if (type == "Organization") {
        this.type = type;
        this.$router.push("/organizationsignup");
      } else {
        this.$router.push("/signup");
        this.type = type;
      }
    },
    close() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#myModal {
  margin-top: 7%;
  position: fixed;
  margin: 0;
  background-color: rgba(43, 43, 43, 0.9);
  width: 100%;
  z-index: 99999;
  height: 100%;
}

.btn {
  margin: 10px;
  background-color: #034e85;
  color:white;
  border:none;
  padding:10px;
}

.btn:hover {
    box-shadow: 5px 10px 10px grey;
    background-color: #0458c7;
    
}

#option {
  margin-top: 15%;
  border-radius: 1px;
  padding:0;
}

.close {
  padding: 5px;
  margin-left: 0;
  margin-right: 5px;
}
h2 {
  border-bottom: 1px solid gray;
  padding:25px;
  margin:0;
  padding-bottom: 10px;
}

.modal-body {
  padding: 0;
}

.modal-content {
  margin: 0;
}

#org {
 margin-right: 7px;
}

#reg {
  margin-left: 7px;
}
</style>