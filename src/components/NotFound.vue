<script lang="ts">
export default {
  emits: ['refresh']
};
</script>

<template>
  <div class="not-found">
    <h3 class="not-found__title">Something went wrong!</h3>
    <button class="not-found__btn" @click="$emit('refresh')">Try again</button>
  </div>
</template>

<style lang="scss">
.not-found {
  padding: 30px 10px;

  text-align: center;

  &__title {
    margin-bottom: 10px;

    font-size: 16px;
    text-align: center;
    color: #b71c1c;
  }

  &__btn {
    display: inline-block;
    padding: 10px 18px;

    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #ffffff;

    background-color: #0070c9;
    border: none;
    border-radius: 6px;

    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #51a9ee;
    }
  }
}
</style>
