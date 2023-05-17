<template>
  <div
    id="temprature"
    class="mt-10 opacity-80 w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white mx-auto rounded-xl md:rounded-3xl py-5 flex justify-around text-center"
  >
    <div
      v-for="item in weeklyForecast"
      :key="item"
      class="flex flex-col text-center"
    >
      <p class="temp font-bold">{{ item.day }}</p>
      <img :src="item.icon" />

      <div class="temp font-bold text-sm">{{ item.temp }}°C</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentForecast"],
  data() {
    return {
      newForecast: [],
      weeklyForecast: [],
    };
  },

  methods: {
    weeklyReport() {
      const forecast = this.currentForecast.forecast.forecastday;
      this.newForecast = forecast;
      this.newForecast.splice(0, 1);

      const weekDay = this.newForecast.map((item) => {
        const dateParts = item.date.split("-");
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const weekdayName = date
          .toLocaleDateString("en-US", {
            weekday: "long",
          })
          .slice(0, 3);
        const weatherForecast = {
          day: weekdayName,
          temp: item.day.maxtemp_c,
          icon: item.day.condition.icon,
        };
        return weatherForecast;
      });
      this.weeklyForecast = weekDay;
      // console.log(this.weeklyForecast);
    },
  },
  created() {
    this.weeklyReport();
  },
  beforeUpdate() {
    this.weeklyReport();
  },
};
</script>
