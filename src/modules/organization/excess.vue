<template>
  <div id="bythree">
    <b-row>
        <div v-for="(badge, index) in this.data" :key="index">
          <b-col class="text-center">
            <b-card>
              <img src="@/assets/image.png" class />
              <h5>{{badge.bandgename}}</h5>
              <p>{{badge.venue}}</p>
            </b-card>
          </b-col>
        </div>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "bythree",
  props: {
    data: Array
  },
  created() {
    //console.log(this.data);
  }
};
</script>