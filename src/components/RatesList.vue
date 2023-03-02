<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Rate } from '../types/Rate';

export default defineComponent({
  props: {
    rates: {
      type: Array as PropType<Rate[]>,
      required: true
    }
  }
});
</script>

<template>
  <ul class="rates-list">
    <li class="rates-list__item" v-for="item of rates" :key="item.id">
      <span class="rates-list__currency-type">{{ item.type }}</span
      >: {{ item.rate }}
    </li>
  </ul>
</template>

<style lang="scss">
.rates-list {
  padding: 10px;
  border: 1px solid #5f6368;
  border-radius: 6px;

  &__item {
    padding: 8px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #dbdbdb;
    }

    &:nth-child(2n) {
      background-color: #f8f8f8;
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &__currency-type {
    font-weight: 700;
  }
}
</style>
