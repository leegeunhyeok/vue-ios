<template>
  <div class="i-text-field">
    <input
      :type="props"
      :placeholder="'aa'"
      :max="max"
      :min="min"
    >
  </div>
</template>

<script>
export default {
  name: 'iTextField',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    }
  }
}
</script>

<style lang="scss">
$placeholder-color: #8e8e93;

.i-text-field {
  width: 100%;
  height: 100%;
  padding: 1rem;

  input {
    outline: none;
    padding: .4rem .8rem;
    background-color: #e3e3e8;
    border: none;
    border-radius: 6px;

    &::placeholder {
      color: $placeholder-color;
    }

    &:-ms-input-placeholder {
      color: $placeholder-color;
    }

    &::-ms-input-placeholder {
      color: $placeholder-color;
    }
  }
}
</style>
