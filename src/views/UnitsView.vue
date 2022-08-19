<template>
  <div class="titulo">
    <h1>Unidades de Medida</h1>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UnitsView',
});
</script>

<style scoped>
.titulo {
  background-color: #d9d9d9;
  color: white;
  line-height: 1;
  margin: 0;
  padding: 17px 0 10px 15px;
}
</style>
