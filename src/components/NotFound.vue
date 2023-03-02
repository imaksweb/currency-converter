<script lang="ts">
import ButtonComponent from './ButtonComponent.vue';

export default {
  components: {
    ButtonComponent
  },
  emits: ['refresh']
};
</script>

<template>
  <div class="not-found">
    <h3 class="not-found__title">Something went wrong!</h3>
    <ButtonComponent :onClick="() => $emit('refresh')">Try again</ButtonComponent>
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
}
</style>
