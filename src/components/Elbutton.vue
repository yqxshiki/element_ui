<template>
  <button
    class="el-button"
    :disabled="disabled"
    :class="[
    type ? 'el-button--'+type : ' ',
    {
      'is-plain':plain,
      'is-round':round,
      'is-circle':circle,
      'is-disabled':disabled,
      'is-loading':loading
    }
  ]"
    :type="nativeType"
    @click="handClick"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon || !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "elbutton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    nativeType: {
      type: String,
      default: "button"
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: Boolean,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    loading: Boolean
  },
  methods: {
    handClick() {
      console.log("handClick");
    }
  }
};
</script>
<style>
</style>