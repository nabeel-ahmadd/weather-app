<template>
  <teleport to="body">
    <transition name="dialog">
      <div v-if="show" class="fixed left-0 top-0 w-full h-full backdrop">
        <dialog
          open
          v-if="show"
          class="fixed w-7/12 lg:w-4/12 top-1/3 rounded-lg bg-white"
        >
          <header
            class="text-lg md:text-2xl text-black text-center font-bold h-8 my-2"
          >
            <slot name="header">
              <h2>{{ title }}</h2>
            </slot>
          </header>
          <hr class="bg-gray-500" />
          <section class="lg:px-5 lg:mt-2 texl-md md:text-lg">
            <slot>{{ description }}</slot>
          </section>
          <hr class="bg-gray-500 mt-10" />
          <menu class="text-center" v-if="!fixed">
            <slot name="actions">
              <button
                class="bg-blue-500 transition-all duration-150 opacity-75 hover:opacity-100 text-white px-6 mt-2 py-2 rounded-full"
                @click="tryClose"
              >
                Close
              </button>
            </slot>
          </menu>
        </dialog>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },

  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  /* From https://css.glass */
  background: rgba(0, 0, 0, 0.36);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.bg {
  background-color: #8d909b;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active {
  transition: all 0.2s ease-out;
}

.dialog-leave-active {
  transition: all 0.2s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}
</style>
