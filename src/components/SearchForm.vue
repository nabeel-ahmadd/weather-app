<template>
  <form
    @submit.prevent="submitForm"
    class="mx-auto w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white rounded-xl md:rounded-3xl py-5 mb-10"
  >
    <div class="flex justify-around md:justify-around w-6/12 mx-auto">
      <div>
        <input
          type="text"
          v-model.trim="city"
          placeholder="City"
          :class="{ outline: formIsInvalid }"
          class="border-2 border-gray-200 outline-none p-2 w-52 rounded-md"
        />
        <p v-if="formIsInvalid" class="text-red-600 mt-3">
          Input field must not be empty.
        </p>
      </div>
      <button
        class="ml-2 rounded-md px-2 outline-none transition-all duration-300 font-bold h-11"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["submit-form"],
  data() {
    return {
      city: "",
      formIsInvalid: false,
    };
  },
  methods: {
    submitForm() {
      if (this.city === "") {
        this.formIsInvalid = true;
        console.log("This city field is empty.");
      } else {
        this.$emit("submit-form", this.city);
        this.city = "";
        this.formIsInvalid = false;
      }
    },
  },
};
</script>
<style scoped>
.outline {
  outline: rgb(220 38 38 / 0.6) solid 2px;
}
button {
  background-color: #c1cfea;
  color: #fff;
}
button:hover {
  background-color: #9da8be;
}
</style>
