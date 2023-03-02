<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Rate } from '../types/Rate';

interface ComponentData {
  newValue: string;
  isError: boolean;
}

export default defineComponent({
  props: {
    rates: {
      type: Array as PropType<Rate[]>,
      required: true
    }
  },
  emits: ['add', 'close'],
  data(): ComponentData {
    return {
      newValue: '',
      isError: false
    };
  },
  methods: {
    handleAddCurrency(event: Event) {
      const formData = new FormData(event.target as HTMLFormElement);

      const value = formData.get('add-currency');

      if (!value) {
        this.isError = true;

        setTimeout(() => {
          this.isError = false;
        }, 2000);

        return;
      }

      this.$emit('add', value);
    }
  }
});
</script>

<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <slot name="header"> Choose currency to add </slot>
      </div>

      <div class="modal__body">
        <slot name="body">
          <form class="modal__form" @submit.prevent="handleAddCurrency">
            <select class="modal__select" name="add-currency" v-model="newValue">
              <option v-for="rate of rates" :key="rate.id" :value="rate.type">
                {{ rate.type }}
              </option>
            </select>
            <button
              :disabled="isError"
              type="submit"
              class="modal__btn modal__btn--green"
              :class="{ 'modal__btn--disabled': isError }"
            >
              Add
            </button>
          </form>
          <p class="modal__error" v-if="isError">Invalid currency</p>
        </slot>
      </div>

      <div class="modal__footer">
        <slot name="footer">
          <button class="modal__btn modal__btn--blue" @click="$emit('close')">Cancel</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9998;

  display: table;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 0.3s ease;

  &__container {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;

    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;

    font-family: Arial, Helvetica, sans-serif;

    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }

  &__header {
    margin-top: 0;

    font-size: 20px;
    text-align: center;
    color: #42b983;
  }

  &__body {
    margin: 20px 0;

    text-align: center;
  }

  &__footer {
    text-align: center;
  }

  &__form {
    display: flex;
    justify-content: center;
  }

  &__select {
    max-width: 100px;

    margin: 0 10px 0 0;
    padding: 6px;

    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    text-align: center;

    border: 1px solid #5f6368;
    border-radius: 6px;

    outline: none;
  }

  &__btn {
    display: inline-block;
    padding: 6px 18px;

    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #ffffff;

    border: none;
    border-radius: 6px;

    transition: background-color 0.3s ease;
    cursor: pointer;

    &--blue {
      background-color: #0070c9;

      &:hover {
        background-color: #51a9ee;
      }
    }

    &--green {
      background-color: #1cac78;

      &:hover {
        background-color: #8fbc8b;
      }
    }

    &--disabled {
      background-color: #ececec;

      &:hover {
        background-color: #ececec;
      }
    }
  }

  &__error {
    color: #913831;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
