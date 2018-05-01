<template>
  <div id="app">
    <Stage
      :src='src'
      :muted='muted'
    />
    <DateTime
      :position='position'
      :format='format'
      :size='size'
    />
    <Setting
      :position='position'
      :muted='muted'
      :size='size'
      :model='model'
      :playList='playList'
      :format='format'
    />
  </div>
</template>

<script>
import Stage from '@/components/Stage'
import DateTime from '@/components/DateTime'
import Setting from '@/components/Setting'

import event from '@/utils/event'
import { setLocalStorage, getLocalStorage, isFunction } from '@/utils/util'

const defaultData = {
  // datetime
  format: 'H:i Y-m-d',
  // setting
  position: 1, // 1: center, 2: left-top, 3: left-bottom
  size: 10,
  muted: true,
  model: -1,
  playList: []
}

function getPlaySrc (data) {
  let i = data['model'] < 0
    ? ~~(Math.random() * data['playList'].length)
    : data['model']

  return data['playList'][i]
}

export default {
  name: 'app',
  components: { Stage, DateTime, Setting },
  created () {
    event.$on('commit', this.commit)
  },
  data () {
    Object.keys(defaultData).forEach(k => {
      let local = getLocalStorage(k)
      defaultData[k] = local === null
        ? defaultData[k]
        : local
    })

    return {
      ...defaultData,
      src: getPlaySrc(defaultData)
    }
  },
  methods: {
    commit (keys, value) {
      let ctx = this
      keys.split('.').forEach((key, i, arr) => {
        if (arr.length - 1 === i) {
          ctx[key] = value
          if (isFunction(this[`commit_${key.toLowerCase()}`])) {
            this[`commit_${key.toLowerCase()}`](value)
          }
          setLocalStorage(key, value)
        } else {
          ctx = ctx[key]
        }
      })
    },
    commit_model (value) {
      this.src = getPlaySrc(this)
    }
  },
  watch: {
  },
  destroyed () {
    event.$off('commit', this.commit)
  }
}
</script>

<style>
html, body, ul, li, h1, h2, h3, h4, h5, p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}

.input {
  border-radius: 4px;
  padding: 4px;
  border: none;
}
.btn {
  border: none;
}
.btn.btn-primary {
  background: rgb(120, 176, 254);
  color: #ffffff;
}
</style>

