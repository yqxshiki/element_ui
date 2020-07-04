<template>
  <div id="calendar">
    <input type="text"
           :value="formatDate">
    <div>
      <div class="border">
        <div class="header">
          <span @click="prevMonth">&lt;</span>
          <span @click="prevYear">&lt;&lt;</span>
          <span>{{time.year}}年</span>
          <span>{{time.month+1}}月</span>
          <span @click="nextYear">&gt;&gt;</span>
          <span @click="nextMonth">&gt;</span>

        </div>
        <div class="hang">
          <span v-for="(item,index) in week"
                :key="index">{{item}}</span>
        </div>
        <div class="hang"
             v-for="i in 6"
             :key="`div_${i}`">
          <span class="lie isThisMonth"
                @click="chooseDate(setMonthDay[(i-1)*7+(j-1)])"
                v-for="j in 7"
                :key="`span_${j}`"
                :class="[
                  {isCurrentMonth:!isThisMonth(setMonthDay[(i-1)*7+(j-1)])},
                  {isToday:isThisDay(setMonthDay[(i-1)*7+(j-1)])}
                ]">
            {{setMonthDay[(i-1)*7+(j-1)].getDate()}}
          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import * as utils from '../lib/utils'
export default {
  name: "calendar",
  data () {
    let { year, month } = utils.getYearMonthDay(this.value)
    return {
      time: {
        year, month
      },
      week: ['日', '一', '二', '三', '四', '五', '六'],
    }
  },
  props: {
    value: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  methods: {
    // 上个月
    prevMonth () {
      let d = utils.getDate(this.time.year, this.time.month)
      // 设置月份
      d.setMonth(d.getMonth() - 1)
      this.time = utils.getYearMonthDay(d)
    },
    // 下个月
    nextMonth () {
      let d = utils.getDate(this.time.year, this.time.month)
      // 设置月份
      d.setMonth(d.getMonth() + 1)
      this.time = utils.getYearMonthDay(d)
    },
    // 上一年
    prevYear () {
      let d = utils.getDate(this.time.year, this.time.month)
      d.setFullYear(d.getFullYear() - 1)
      this.time = utils.getYearMonthDay(d)
    },
    // 下一年
    nextYear () {
      let d = utils.getDate(this.time.year, this.time.month)
      d.setFullYear(d.getFullYear() + 1)
      this.time = utils.getYearMonthDay(d)
    },
    // 判断是不是当月日期 不是变灰
    isThisMonth (date) {
      let { year, month } = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month))
      let { year: y, month: m } = utils.getYearMonthDay(date)
      return year == y && month == m
    },
    // 判断今天的日期  加色
    isThisDay (date) {
      let { year, month, day } = utils.getYearMonthDay(new Date())
      let { year: y, month: m, day: d } = utils.getYearMonthDay(date)
      return year == y && month == m && day == d
    },
    chooseDate (date) {
      this.time = utils.getYearMonthDay(date)
      this.$emit('input', date)
    }
  },
  computed: {
    formatDate () {
      // 获取当前时间
      let { year, month, day } = utils.getYearMonthDay(this.value)
      return `${year}-${month + 1}-${day}`
    },
    setMonthDay () {
      let { year, month } = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month))
      // 获取当前月份的第一天
      let CurrentFirstDay = utils.getDate(year, month, 1)
      // 获取当前月第一天是周几
      let week = CurrentFirstDay.getDay()
      // 获取当前开始天数
      let startDay = CurrentFirstDay - week * 60 * 60 * 1000 * 24

      let arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    }
  },
}

</script>
<style>
#calendar {
  width: 200px;
  height: auto;
}
.header {
  /* width: 200px; */
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  color: red;
  cursor: pointer;
}
.hang {
  /* width: 200px; */
  display: flex;
  justify-content: space-around;
  align-items: space-around;
}
.lie {
  width: 30px;
  text-align: center;
  border: 1px solid transparent;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  padding-right: 4px;
}
.lie:hover,
.border {
  border: 1px solid red;
}

.isCurrentMonth {
  color: gray;
}
.isToday {
  color: #ffffff;
  background: #f40;
  border-radius: 4px;
}
</style>