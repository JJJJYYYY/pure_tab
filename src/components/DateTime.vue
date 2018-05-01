<template>
  <div class="datetime" :class="cpt_position" :style="{ fontSize: `${size}px` }">
    <div class="datetime_first">{{ cpt_date[0] }}</div>
    <div class="datetime_second">{{ cpt_date[1] }}</div>
  </div>
</template>

<script>
import date from '@/utils/date'

export default {
  name: 'DateTime',
  props: {
    format: {
      type: String,
      default: 'H:m:i Y-m-d'
    },
    position: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      timer: null,
      update: 1
    }
  },
  created () {
    this.start()
  },
  computed: {
    cpt_date () {
      return this.update && date(this.format).split(' ')
    },
    cpt_position () {
      switch (this.position) {
        case 2:
          return 'left-top'
        case 3:
          return 'left-btm'
        default:
          return 'center'
      }
    }
  },
  methods: {
    start () {
      this.timer = setInterval(() => {
        this.update++
      }, 1000)
    },
    restart () {
      clearInterval(this.timer)
      this.start()
    }
  }
}
</script>

<style scoped>
.datetime {
  position: fixed;
  text-align: center;
  color: #ffffff;
}
.datetime_first {
  font-size: 8em;
}
.datetime_second {
  font-size: 4em;
}
.center {
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.left-top {
  top: 0;
  left: 0;
}
.left-btm {
  bottom: 0;
  left: 0;
}
</style>
