<template>
  <RenderlessCalendarBis
    v-model="selection"
    v-slot="{
      datesByMonths,
      dateListeners,
      dateAttrs,
      prevMonth,
      nextMonth
    }"
    :min-date="minDate"
    :max-date="maxDate"
    :disabled-dates="disabledDates"
    :marked-dates="['2019-05-29']"
    :locale="locale"
    :first-day-of-week="firstDayOfWeek"
    range
  >
    <div class="root">
      <div class="head">
        <button @click="prevMonth">-</button>
        <button @click="nextMonth">+</button>
      </div>
      <div
        v-for="month in datesByMonths"
        :key="`${month.monthIndex}-${month.year}`"
        class="calendar"
      >
        {{ month.monthIndex }} {{ month.year }}
        <div class="calendar__body">
          <CalendarCellBis
            v-for="date in month.dates"
            :key="date.ms"
            :date="date"
            v-bind="dateAttrs"
            v-on="dateListeners"
          />
        </div>
      </div>
    </div>
  </RenderlessCalendarBis>
</template>

<script>
  import CalendarCellBis from './CalendarCellBis.vue';

  export default {
    name: 'CalendarBis',
    components: {
      CalendarCellBis
    },
    props: {
      locale: {
        type: String,
        default: 'fr'
      }
    },
    data() {
      return {
        selection: null,
        minDate: new Date('2019-06-01'),
        maxDate: new Date('2022-06-26'),
        disabledDates: ['2021-07-24', '2021-08-11', '2021-08-12']
      };
    },
    computed: {
      firstDayOfWeek() {
        return this.locale === 'en' ? 0 : 1;
      }
    },
    methods: {
      test() {
        console.log('test');
      }
    }
  };
</script>

<style scoped lang="scss">
  $cell-width: 40px;
  $cell-height: 40px;
  $light-gray: #f7f7f9;
  
  .root {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .calendar {
    width: calc(#{$cell-width} * 7);
    padding: 8px;
    
    &__header {
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
    }
    
    &__weeks {
      display: flex;
      justify-content: flex-start;
    }
    
    &__week-day {
      display: inline-block;
      width: $cell-width;
      height: 40px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      line-height: 40px;
    }
    
    &__body {
      max-width: calc(#{$cell-width} * 7);
      min-width: calc(#{$cell-width} * 7);
      justify-content: flex-start;
      display: flex;
      flex-wrap: wrap;
    }
    
    &__month-btn {
      background-color: $light-gray;
      color: #383838;
      border: none;
      border-radius: 3px;
      appearance: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      background-image: url('../assets/arrow-point-to-right.svg');
      background-size: 12px;
      background-position: center;
      background-repeat: no-repeat;
      width: 50px;
      height: 30px;
      
      &:first-child {
        transform: rotate(-180deg);
      }
      
      &:focus {
        outline: none;
        background-color: darken($light-gray, 10%);
      }

      &:disabled {
        cursor: auto;
        background-color: aliceblue;
      }
    }
    
  }


</style>
