<template>
  <div class='container'>
    <center>
      <div class='innercont'>
        <form @submit.prevent='register'>
          <div id='perinfo'class='col-sm-8'>
            <p class='sign2'>Update Organization Information</p>

            <label>
              <p class='label-txt'>Name</p>
              <input type='text'class='input'required v-model='name'>
              <div class='line-box'>
                <div class='line'></div>
              </div>
            </label>
            <label>
              <p class='label-txt'>Username</p>
              <input type='text'class='input'required v-model='username'>
              <div class='line-box'>
                <div class='line'></div>
              </div>
            </label>
            <table class='lastrow'>
              <td>
                <label class='ln'>
                  <p class='label-txt'>Address</p>
                  <input type='text'class='input'v-model='address'>
                  <div class='line-box'>
                    <div class='line'></div>
                  </div>
                </label>
              </td>
            </table>

            <label>
              <p class='label-txt'>Email Address</p>
              <input type='email'class='input'required v-model='email'>
              <div class='line-box'>
                <div class='line'></div>
              </div>
            </label>

            <label>
              <p class='label-txt'>Description</p>
              <input
                type='email'
                class='input'
                required
                v-model='description'
                placeholder='what do you do?'
              >
              <div class='line-box'>
                <div class='line'></div>
              </div>
            </label>
            <button type='submit'>submit</button>
          </div>
        </form>
      </div>
    </center>
  </div>
</template>

<script>
/*eslint linebreak-style: ['error', 'windows']*/
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'FullSignUp',
  data() {
    return {
      email: '',
      username: '',
      address: '',
      name: '',
      description: '',
      isValid: false,
      err: false
    };
  },

  created() {
    this.$store.dispatch('getUserInfo').then(resp => {
      var org = resp.data;
      (this.username = org.username),
        (this.email = org.email),
        (this.address = org.address),
        (this.name = org.orgName),
        (this.description = org.description),
        $('.label-txt')
          .addClass('label-active')
          .css({
            color: '#555657',
          });
    });
  },
  mounted() {
    // let url = `http://localhost:8081/update-org/${this.username}`
    // axios.get(url).then(response => {
    //   this.email = response.data.email
    //   this.address = response.data.address
    //   this.name = response.data.name // org name
    //   this.description = response.data.description
    // })
    $('.input').focus(function() {
      $(this)
        .parent()
        .find('p')
        .addClass('label-active')
        .css({
          color: '#0071ff',
        });
    });

    $('.input').focusout(function() {
      if ($(this).val() == '') {
        $(this)
          .parent()
          .find('p')
          .removeClass('label-active');
      }
      $(this)
        .parent()
        .find('p')
        .css({
          color: '#555657',
        });
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

h5 {
  margin: 0;
  padding: 3px;
}

h5:hover {
  background-color: #0071ff;
  color: white;
}

.month {
  padding: 0px;
  display: none;
  position: absolute;
  background: white;
  border: 1px solid lightgray;
}

#mnth {
  width: 50%;
}

.BD {
  width: 100%;
  border: none;
  margin: 9px;
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

.gg {
  margin-bottom: 0;
  /* height: 5px; */
  padding-top: 5px;
  width: 200px;
}

.gg td {
  padding-top: 10px;
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
  margin-top: 0px;
  padding: 0;
  border-radius: 5px;
  border: 1px solid #bdbebf;
  overflow: visible;
  width: 970px;
  height: 700px;
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

#gend {
  font-size: 0.8em;
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
  background: #032dff;
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

/* ::placeholder{
  text-align: center;
} */
</style>
