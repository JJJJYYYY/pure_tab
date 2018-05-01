<template>
  <div class="stage">
    <video
      class="stage_video"
      :src="src"
      autoplay
      loop
      :muted='muted'
      width="100%"
      height="100%"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'Stage',
  props: {
    src: String,
    muted: Boolean
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.stage {
  width: 100vw;
  height: 100vh;
}
.stage_video {
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
  top: 50%;
}
</style>

