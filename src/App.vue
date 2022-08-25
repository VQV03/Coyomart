<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    RouterView,
  },
});
</script>

<template>
  <section class="page">
    <div>
      <NavBar />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>
.page {
  display: grid;
  grid-template-columns: 1fr 9fr;
}

.content {
  margin-left: 15px;
}
</style>
