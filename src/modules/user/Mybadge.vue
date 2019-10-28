<template>
  <div>
    <div id="mybadge">
      <b-button
        id="createC"
        variant="primary"
        class="btn btn-block shadow rounded"
        v-b-modal.availBadge-modal
      >Avail new certificate</b-button>
      <hr>
      <h3 class="temp" v-show="hasData">You haven't availed badges yet</h3>
      <div v-for="(badge, index) in badgelist" :key="index">
        <div v-if="badge.granted">
          <b-card class="bdgs">
            <b-row class="justify-content-md-center">
              <b-col class="text-center">
                <img src="@/assets/image.png" class>
                <h5>{{badge.badgename}}</h5>
              </b-col>
              <b-col cols="8" class="border-left">
                <div class="text-center ifont">
                  <h4>
                    This certificate of
                    <br>
                    {{badge.certificateName}}
                  </h4>
                  <span>is awarded to</span>
                  <h3>{{fullname}}</h3>
                  <p>for</p>
                  <h5>{{badge.descriptions}}</h5>
                  <br>
                  <p>Given this {{ badge.date.month+" "+badge.date.day+", "+badge.date.year }}</p>
                  <div class="text-center byorg">
                    <p class="border-bottom">Certified by : {{badge.organization}}</p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <div v-else>
          <b-card class="bdgs">
            <p class="pending">PENDING</p>
            <h3 class="pending">{{badge.badgename}}</h3>
            <hr>
            <h5 class="pending">Waiting for ceritification from {{badge.organization}}</h5>
          </b-card>
        </div>
      </div>
    </div>
    <b-modal
      size="sm"
      class="modl"
      id="availBadge-modal"
      title="Avail badge"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <form class="addR" @submit.prevent="searchBadge">
        <span class="error" v-show="error">Incorrect code</span>
        <b-input
          id="bcode"
          v-model="badgeCode"
          autocomplete="off"
          placeholher="Enter badge code"
          required
        />
        <br>
        <b-row>
          <b-col>
            <b-button
              @click="$bvModal.hide('availBadge-modal')"
              variant="danger"
              class="btn btn-block"
              v-on:click="error = false"
            >Cancel</b-button>
          </b-col>
          <b-col cols="6">
            <b-button type="submit" variant="primary" class="btn btn-block">Avail badge</b-button>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Newsfeed",
  props: {
    username: String
  },
  data() {
    return {
      badgelist: [],
      badgeCode: "",
      fullname: "",
      hasData: false,
      error: false
    };
  },
  methods: {
    searchBadge() {
      axios
        .post("http://localhost:8081/user/availbadge", {
          code: this.badgeCode,
          credentials: this.$store.getters.token
        })
        .then(resp => {
          this.error = false;
          this.$bvModal.hide("availBadge-modal");
          this.badgeCode = "";
        })
        .catch(error => {
          this.error = true;
          this.badgeCode = "";
        });
    },
  },
  created() {
    axios
      .post("http://localhost:8081/user/userbadges", {
        user: this.$store.getters.token
      })
      .then(res => {
        console.log("badgess"+res.data.badges);
        this.fullname = res.data.fullname;
        this.badgelist = res.data.badges;
        console.log({badges: this.badgelist})
        if (this.badgelist.length == 0) {
          this.hasData = true;
        }
      });
  }
};
</script>
<style scoped>
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.byorg {
  position: relative;
  width: 70%;
  left: 15%;
}
#createC {
  margin-top: 30px;
  margin-bottom: 20px;
  width: 250px;
}
label {
  margin-top: 5px;
}

.bdgs {
  margin-bottom: 10px;
  background: #f2f5f5;
}
.temp {
  margin-top: 250px;
  margin-bottom: 250px;
}

#mybadge {
  text-align: center;
}
.error {
  color: red;
}

.pending {
  padding: 0;
  margin: 0;
}
</style>
