<script lang="ts">
import CurrencyConverter from './components/CurrencyConverter.vue';
import ExchangeRates from './components/ExchangeRates.vue';

export default {
  components: {
    CurrencyConverter,
    ExchangeRates
  }
};
</script>

<template>
  <div class="currencies-app">
    <div class="container">
      <div class="currencies-app__wrapper">
        <h1 class="currencies-app__title">Currencies App</h1>
        <CurrencyConverter />

        <hr />

        <ExchangeRates />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/styles/utils/variables';

.currencies-app {
  &__wrapper {
    margin-top: 30px;
    padding: 30px;

    border-radius: 10px;
    background-color: $c-white;

    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  }

  &__title {
    padding-bottom: 30px;

    font-size: 32px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
