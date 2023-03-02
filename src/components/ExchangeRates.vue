<script lang="ts">
import { defineComponent } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import interestedList from '../data/interestedList';
import { getRatesApi } from '../api/getRates';

import RatesList from './RatesList.vue';
import AddCurrencyModal from './AddCurrencyModal.vue';
import LoaderComponent from './LoaderComponent.vue';
import NotFound from './NotFound.vue';
import ButtonComponent from './ButtonComponent.vue';

interface ComponentData {
  rates: { [key: string]: number };
  symbols: string[];
  base: string;
  showModal: boolean;
  isError: boolean;
  isRefreshActive: boolean;
  isLoading: boolean;
}

type Symbol = 'USD' | 'EUR' | 'UAH' | 'BTC';

export default defineComponent({
  components: {
    RatesList,
    AddCurrencyModal,
    LoaderComponent,
    NotFound,
    ButtonComponent
  },
  data(): ComponentData {
    const defaultSymbols: Symbol[] = ['USD', 'EUR', 'UAH', 'BTC'];
    let symbols: Symbol[] = [];
    let jsonData = localStorage.getItem('symbols');

    if (!jsonData) {
      jsonData = JSON.stringify(defaultSymbols);

      localStorage.setItem('symbols', jsonData);
    }

    try {
      symbols = JSON.parse(jsonData) as Symbol[];
    } catch (err: any) {
      throw new Error(err);
    }

    return {
      rates: {},
      symbols,
      base: 'USD',
      showModal: false,
      isError: false,
      isRefreshActive: true,
      isLoading: false
    };
  },
  computed: {
    normalizedList() {
      return interestedList.map((currency) => ({
        id: uuidv4(),
        type: currency
      }));
    },
    normalizedRates() {
      return Object.keys(this.rates).map((key) => ({
        id: uuidv4(),
        type: key,
        rate: this.rates[key]
      }));
    },
    filteredRates() {
      return this.normalizedRates.filter((rate) => this.symbols.includes(rate.type));
    }
  },
  watch: {
    symbols: {
      deep: true,
      handler() {
        localStorage.setItem('symbols', JSON.stringify(this.symbols));
      }
    }
  },
  methods: {
    async getRates(base: string) {
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
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleSubmit(value: string) {
      this.symbols.push(value);
      this.closeModal();
    },
    handleRefresh() {
      this.isRefreshActive = false;

      setTimeout(() => {
        this.isRefreshActive = true;
      }, 5000);

      this.getRates(this.base);
    }
  },
  mounted() {
    this.getRates(this.base);
  }
});
</script>

<template>
  <div class="exchange-rates">
    <h2 class="exchange-rates__title">Exchange Rates</h2>
    <LoaderComponent v-if="isLoading" />

    <NotFound v-else-if="isError" @refresh="handleRefresh" />

    <div class="exchange-rates__wrapper" v-else>
      <select
        class="exchange-rates__select"
        v-model="base"
        @change="() => getRates(base)"
        name="base-currency"
      >
        <option :value="currency.type" v-for="currency of normalizedList" :key="currency.id">
          {{ currency.type }}
        </option>
      </select>

      <RatesList :rates="filteredRates" />

      <div class="exchange-rates__controls">
        <ButtonComponent color="secondary" :onClick="openModal">Add</ButtonComponent>

        <ButtonComponent :disabled="!isRefreshActive" :onClick="handleRefresh"
          >Refresh</ButtonComponent
        >
      </div>
    </div>
  </div>
  <transition name="modal">
    <AddCurrencyModal
      @add="handleSubmit"
      @close="closeModal"
      :rates="normalizedRates"
      v-if="showModal"
    />
  </transition>
</template>

<style lang="scss">
@import '../assets/styles/utils/typography';

.exchange-rates {
  max-width: 720px;
  margin: 40px auto;

  &__title {
    @extend %h2-title;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  &__select {
    max-width: 100px;

    margin: 0;
    padding: 6px;

    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    text-align: center;

    border: 1px solid #5f6368;
    border-radius: 6px;

    outline: none;
  }

  &__controls {
    display: flex;
    gap: 20px;
  }
}
</style>
