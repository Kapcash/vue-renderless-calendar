<template>
  <div id="app">
    <div class="flex">
      <section>
        <p>
          Localized with <i>.toLocalString()</i>
          <span class="flex buttons">
            <button
              v-for="loc in ['fr', 'de', 'es', 'en', 'pl']"
              :key="loc"
              :class="{ active: loc === customLocale }"
              @click="customLocale = loc"
            >
              {{ loc }}
            </button>
            <input v-model="customLocale">
          </span>
        </p>
        <CalendarBis :locale="customLocale" />
      </section>
    </div>
  </div>
</template>

<script>
  import CalendarBis from './components/CalendarBis.vue';
  import localeRu from '../lib/locale/ru';

  export default {
    name: 'App',
    components: {
      CalendarBis
    },
    data: () => ({
      hardcodedLocale: localeRu,
      customLocale: 'en'
    })
  };
</script>

<style lang="scss">
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

html {
  background: rgba(0, 0, 0, 0.1);
}
.flex {
  display: flex;
  align-items: flex-start;
}
pre,
.buttons {
  display: block;
  margin: 10px 0;
  height: 20px;
}
section {
  margin: 20px;
}
</style>
