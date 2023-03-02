<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value: string): boolean => ['primary', 'secondary'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    }
  },
  computed: {
    buttonClass() {
      return this.disabled ? 'button--disabled' : `button--${this.color}`;
    }
  }
});
</script>

<template>
  <button :type="type" class="button" :class="buttonClass" :disabled="disabled" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<style lang="scss">
.button {
  display: inline-block;
  padding: 10px 18px;

  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;

  border: none;
  border-radius: 6px;

  transition: background-color 0.3s ease;
  cursor: pointer;

  &--primary {
    background-color: #0070c9;

    &:hover {
      background-color: #51a9ee;
    }
  }

  &--secondary {
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
</style>
