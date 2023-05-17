<template>
  <div
    class="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white mx-auto rounded-xl md:rounded-3xl py-5"
  >
    <div class="flex justify-around">
      <div
        id="temprature"
        class="text-3xl opacity-90 sm:text-3xl md:text-4xl lg:text-5xl pl-3 font-bold"
      >
        <p class="text-2xl md:text-3xl lg:text-4xl">
          {{ todayWeather.temp }}°C
        </p>
        <p class="text-lg md:text-xl lg:text-2xl">{{ fullName }}</p>
      </div>
      <div class="w-24">
        <img :src="todayWeather.icon" alt="weather-icon" class="w-full -mt-2" />
      </div>
      <!-- Forecast Section -->
    </div>
    <div class="flex justify-around text-center mt-6">
      <div
        class="flex-item text-center"
        v-for="fore in dailyforecast"
        :key="fore"
      >
        <p class="mb-2 text-sm">{{ fore.text }}</p>
        <unicon class="text-xl" :name="fore.icon"></unicon>
        <p>{{ fore.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentWeather", "currentForecast"],
  data() {
    return {
      todayWeather: {},
      dailyforecast: {},
    };
  },
  computed: {
    fullName() {
      return `${this.todayWeather.cityName}, ${this.todayWeather.countryName}`;
    },
  },
  methods: {
    forecast() {
      const location = this.currentWeather.location;
      const weather = this.currentWeather.current;
      const forecast = this.currentForecast.forecast.forecastday[0].day;
      const newWeather = {
        cityName: location.name,
        countryName: location.country,
        temp: weather.temp_c,
        icon: weather.condition.icon,
      };
      this.todayWeather = newWeather;

      const newForecast = {
        maxTemp: {
          value: `${forecast.maxtemp_c}°C`,
          text: "Max.",
          icon: "temperature",
        },
        minTemp: {
          value: `${forecast.mintemp_c}°C`,
          text: "Min.",
          icon: "temperature-empty",
        },
        uv: {
          value: `${forecast.uv}`,
          text: "UV",
          icon: "sun",
        },
        wind: {
          value: `${forecast.maxwind_kph} km/h`,
          text: "Wind",
          icon: "wind",
        },
        rain: {
          value: `${forecast.daily_will_it_rain}%`,
          text: "Rain",
          icon: "cloud-showers-heavy",
        },
      };
      this.dailyforecast = newForecast;
    },
  },
  created() {
    this.forecast();
  },
  beforeUpdate() {
    this.forecast();
  },
};
</script>
