<script lang="ts">
import { defineComponent } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import currencyList from '../data/currencyList';
import { getRatesApi } from '../api/getRates';
import type { Rate } from '../types/Rate';

import LoaderComponent from './LoaderComponent.vue';
import NotFound from './NotFound.vue';

interface ComponentData {
  targetCurrency: string;
  baseAmount: number;
  baseCurrency: string;
  rates: { [key: string]: number };
  isLoading: boolean;
  isError: boolean;
}

export default defineComponent({
  components: {
    LoaderComponent,
    NotFound
  },
  data(): ComponentData {
    return {
      targetCurrency: 'BTC',
      baseAmount: 1,
      baseCurrency: 'USD',
      rates: {},
      isLoading: false,
      isError: false
    };
  },
  computed: {
    maxValue(): number {
      return (10000 * this.rates[this.targetCurrency]) / this.rates['USD'];
    },
    targetAmount: {
      get(): number {
        if (!this.baseAmount) {
          return 0;
        }

        const result = this.baseAmount * this.rates[this.targetCurrency];

        if (result >= this.maxValue) {
          return this.maxValue;
        }

        return result;
      },
      set(value: number) {
        this.baseAmount = value / this.rates[this.targetCurrency];
      }
    },
    normalizedList(): Rate[] {
      return currencyList.map((currency: string) => ({
        id: uuidv4(),
        type: currency
      }));
    }
  },
  methods: {
    async requestRates(base: string) {
      this.isLoading = true;
      this.isError = false;

      try {
        const data = await getRatesApi(base);

        this.rates = await data.rates;
      } catch (err: any) {
        this.isError = true;
        throw new Error(err);
      } finally {
        this.isLoading = false;
      }
    },
    handleBaseChange() {
      this.requestRates(this.baseCurrency);
    }
  },
  mounted() {
    this.requestRates(this.baseCurrency);
  }
});
</script>

<template>
  <div class="converter">
    <h2 class="converter__title">Converter</h2>
    <LoaderComponent v-if="isLoading" />
    <NotFound @refresh="requestRates(baseCurrency)" v-else-if="isError" />
    <div class="converter__wrapper" v-else>
      <div class="converter__item">
        <select
          name="convert-from"
          class="converter__select"
          v-model="baseCurrency"
          @change="handleBaseChange"
        >
          <option :value="currency.type" v-for="currency of normalizedList" :key="currency.id">
            {{ currency.type }}
          </option>
        </select>
        <div class="converter__divider"></div>
        <input class="converter__input" type="number" v-model="baseAmount" :max="maxValue" />
      </div>
      <div class="converter__item">
        <select name="convert-to" v-model="targetCurrency" class="converter__select">
          <option :value="currency.type" v-for="currency of normalizedList" :key="currency.id">
            {{ currency.type }}
          </option>
        </select>
        <div class="converter__divider"></div>
        <input class="converter__input" type="number" v-model="targetAmount" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/styles/utils/typography';

.converter {
  max-width: 280px;
  margin: 0 auto 40px;

  &__title {
    @extend %h2-title;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 1px;

    border: 1px solid #5f6368;
    border-radius: 6px;

    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 14px;
    }
  }

  &__select {
    flex: 1;
    margin: 0;

    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    text-align: center;

    border: none;

    outline: none;
  }

  &__divider {
    display: block;
    width: 1px;
    height: 20px;
    margin: 0 2px;

    background-color: #202124;
  }

  &__input {
    flex: 1;
    margin: 0;

    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    text-align: left;

    border: none;
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>
