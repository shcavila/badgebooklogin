<template>
  <div id="bythree">
    <b-row class="row">
        <div v-for="(badge, index) in this.data" :key="index">
            <b-card class="box">
              <img src="@/assets/image.png" class />
              <h5 class="binfo">{{badge.badgename}}</h5>
              <p class="binfo">{{badge.venue}}</p>
              <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
             
            </b-card>
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
};
</script>

<style scoped>
  .box {
    margin:10px;
    /* margin-bottom:10px;
    margin-right: 5px;
    margin-left: 5px; */
    /* margin-bottom: 0;
    margin-top:5px; */
  }

  .binfo {
    margin-bottom: 2px;
    margin-top:2px;
  }

  .text-center {
    background:red;
  }

  .row {
    border-color:white;
  }
</style>
