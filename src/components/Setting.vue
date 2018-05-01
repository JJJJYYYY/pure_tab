<template>
  <div
    class="setting"
    :class="[menuVisible ? 'showAnim' : ( hadClickSetting ? 'hideAnim' : '' )]"
  >
    <img
      class="_button"
      :class="[menuVisible ? 'showAnim' : ( hadClickSetting ? 'hideAnim' : '' )]"
      src="~@/assets/setting.svg"
      @click="showSetting"
    />
    <div
      class="_menu"
      >
      <h5>{{ $root.i18n('Clock') }}</h5>
      <ul class="_list">
        <li>
          {{ $root.i18n('Date') }}：
          <label for="date">
            <input
              type="checkbox"
              name='datetime'
              id="date"
              :checked='format === "H:i"'
              @click='changeFormat($event, "H:i")'
            >
            {{ $root.i18n('Hidden') }}
          </label>
        </li>
        <li>
          <label>{{ $root.i18n('Position') }}：</label>
          <label for="center">
            <input
              type="radio"
              name='position'
              id="center"
              :checked='position === 1'
              @click='choosePosition(1)'
            >
            {{ $root.i18n('Center') }}
          </label>
          <label for="left-top">
            <input
              type="radio"
              name='position'
              id="left-top"
              :checked='position === 2'
              @click='choosePosition(2)'
            >
            {{ $root.i18n('LeftTop') }}
          </label>
          <label for="left-btm">
            <input
              type="radio"
              name='position'
              id="left-btm"
              :checked='position === 3'
              @click='choosePosition(3)'
            >
            {{ $root.i18n('LeftBottom') }}
          </label>
        </li>
        <li>
          {{ $root.i18n('Size') }}：
          <input
            class="input"
            type="number"
            :value='size'
            @change='inputSize'
          />
        </li>
      </ul>
      <hr>
      <h5>{{ $root.i18n('Play') }}</h5>
      <ul class="_list">
        <li>
          {{ $root.i18n('Muted') }}：
          <label for="muted">
            <input
              type="checkbox"
              id="muted"
              @change="changemuted"
              :checked='muted'
            >
            {{ $root.i18n('Muted') }}
          </label>
        </li>
        <li>
          {{ $root.i18n('Model') }}：
          <label for="random">
            <input
              type="radio"
              name='default'
              id="random"
              :checked='model === -1'
              @click='chooseModel(-1)'
            >
            {{ $root.i18n('Random') }}
          </label>
        </li>
        <li>
          {{ $root.i18n('PlayList') }}:
          <table class="table">
            <tr>
              <th class="table_item-default">{{ $root.i18n('Default') }}</th>
              <th class="table_item-path">{{ $root.i18n('Path') }}</th>
            </tr>
            <tr
              v-for="(item, i) in playList"
              :key='i'
            >
              <td class="table_item-default">
                <input
                  type="radio"
                  name='default'
                  :checked='model === i'
                  @click='chooseModel(i)'
                >
              </td>
              <td class="table_item-path">{{ item }}</td>
            </tr>
          </table>
          <p
            v-if="!playList.length"
            class="table-nodata"
          >
            {{ $root.i18n('Nothing') }}
          </p>
        </li>
      </ul>
      <hr>
      <h5>
        {{ $root.i18n('Add') }}
        <span
          v-if="errMsg"
          class="err-msg"
        >
          ({{ errMsg }})
        </span>
      </h5>
      <ul class="_list">
        <li>
          <input
            class="input add-input"
            type="text"
            :placeholder="$root.i18n('InputTip')"
            v-model="path"
          />
          <button
            class="btn btn-primary"
            @click="addList"
          >{{ $root.i18n('Add') }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import event from '@/utils/event'

const EncodeReg = /([^(\/|\\)]{1,}\.(mp4|mov|ogg))$/i

export default {
  name: 'Setting',
  props: {
    position: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    playList: {
      type: Array,
      default: () => { return [] }
    },
    model: Number,
    muted: Boolean,
    defaultIndex: Number,
    format: String
  },
  data () {
    return {
      menuVisible: false,
      errMsg: '',
      path: '',
      hadClickSetting: false
    }
  },
  methods: {
    showSetting () {
      this.menuVisible = !this.menuVisible
      this.hadClickSetting = true
    },
    changeFormat ({ target }, format) {
      event.$emit('commit', 'format', target.checked ? format : 'H:i Y-m-d')
    },
    choosePosition (val) {
      event.$emit('commit', 'position', val)
    },
    inputSize ({ target }) {
      event.$emit('commit', 'size', +target.value)
    },
    addList () {
      if (!this.path) return
      let result = this.path.match(EncodeReg)

      if (Array.isArray(result) && result[1]) {
        event.$emit('commit', 'playList', [].concat(this.playList, [this.path]))
        this.path = ''
      } else {
        this.errMsg = this.$root.i18n('FormatError')
      }
    },
    changemuted ({ target }) {
      event.$emit('commit', 'muted', !!target.checked)
    },
    chooseModel (model) {
      event.$emit('commit', 'model', model)
    }
  }
}
</script>

<style scoped>
.setting {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -350px;
  width: 350px;
}
.setting.showAnim {
  animation: showSetting 1s forwards;
}
.setting.hideAnim {
  animation: hideSetting 1s forwards;
}

._button {
  position: absolute;
  left: -30px;
  width: 30px;
  bottom: 0;
}
/* ._button:hover {
  animation: rotateReverse 3s infinite;
} */
._button.showAnim {
  animation: rotateReverse 1.5s;
}
._button.hideAnim {
  animation: rotate 1.5s;
}
._menu {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
}
._list > li {
  padding-top: 10px;
}
.table {
  width: 100%;
}
.table_item-default {
  width: 20%;
}
.table_item-path {
  width: 80%;
}
.table-nodata {
  width: 100%;
  text-align: center;
}
.add-input {
  width: 60%;
}
.err-msg {
  color: red;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotateReverse {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes showSetting {
  0% {
    right: -350px;
  }
  100% {
    right: 0;
  }
}

@keyframes hideSetting {
  0% {
    right: 0;
  }
  100% {
    right: -350px;
  }
}
</style>
