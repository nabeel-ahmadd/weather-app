<template>
  <transition name="loader">
    <div class="modern-loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </transition>
</template>

<style scoped>
.modern-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  animation: modern-loader-animation 1s infinite;
  margin: 0 10px;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@keyframes modern-loader-animation {
  0% {
    transform: scale(1);
    background-position: 100% 50%;
  }
  50% {
    transform: scale(1.5);
    background-position: 0 50%;
  }
  100% {
    transform: scale(1);
    background-position: 100% 50%;
  }
}
</style>
