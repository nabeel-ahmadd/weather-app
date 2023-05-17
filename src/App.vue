<template>
  <h1
    class="text-center opacity-80 mt-8 mb-14 font-extrabold text-2xl md:text-3xl lg:text-5xl"
  >
    Weather App
  </h1>
  <base-dialog
    @close="hideDialog"
    :show="responseIsInvalid"
    title="Invalid City"
    description="Please enter a valid city name."
  ></base-dialog>
  <!-- <base-dialog fixed :show="!dataLoaded"></base-dialog> -->
  <search-form @submit-form="searchWeather"></search-form>
  <base-loader v-if="!dataLoaded"></base-loader>
  <div v-else>
    <current-weather
      v-if="dataLoaded"
      :currentWeather="currentWeather"
      :currentForecast="currentForecast"
    ></current-weather>
  </div>
  <the-forecast
    v-if="dataLoaded"
    :currentForecast="currentForecast"
  ></the-forecast>
</template>

<script>
import SearchForm from "./components/SearchForm.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import TheForecast from "./components/TheForecast.vue";
export default {
  components: {
    SearchForm,
    CurrentWeather,
    TheForecast,
  },
  data() {
    return {
      errorMessage: "",
      responseIsInvalid: false,
      dataLoaded: false,
      currentWeather: null,
      currentForecast: null,
    };
  },
  methods: {
    hideDialog() {
      this.responseIsInvalid = false;
    },
    async searchWeather(city) {
      // Current Weather API Call;
      this.dataLoaded = false;

      const weather = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=9e1e63ae993c4029998104203231205&q=${city}&aqi=no`
      );
      const forecast = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=9e1e63ae993c4029998104203231205 &q=${city}&days=8&aqi=no&alerts=no`
      );

      const [weatherResponse, forecastResponse] = await Promise.all([
        weather,
        forecast,
      ]);
      if (!weatherResponse.ok || !forecastResponse.ok) {
        this.errorMessage = "Something went wrong";
        this.responseIsInvalid = true;
        // console.log(this.errorMessage);
        this.dataLoaded = true;
        return;
      }
      this.currentWeather = await weatherResponse.json();
      this.currentForecast = await forecastResponse.json();
      this.dataLoaded = true;
    },
  },
  created() {
    this.searchWeather("faisalabad");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap");

body {
  font-family: "Nunito", sans-serif;
  background-color: #d6eeff;
}
</style>
