<template>
  <label class="v-radio" @click="choose">
    <i class="_radio" :class="{ choosed: choosed }"></i>
    <span><slot></slot></span>
  </label>
</template>

<script>
export default {
  name: 'VRadio',
  props: {
    choosed: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  methods: {
    choose () {
      console.log('choose')
    }
  }
}
</script>

<style scoped>
.v-radio {
  vertical-align: middle;
}
._radio {
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: #ffffff;
}
</style>

