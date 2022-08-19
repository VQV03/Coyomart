<template>
  <div class="navbar">
    <router-link :to="`/`" class="logo">
      <img src="../assets/coyomartLogo.svg" alt="Logo da Coyo Mart" />
    </router-link>
    <nav class="navigation">
      <router-link :to="`/categorias/`">Categorias</router-link>
      <router-link :to="`/produtos/`">Produtos</router-link>
      <router-link :to="`/clientes/`">Clientes</router-link>
      <router-link :to="`/units/`">Unidade de Medida</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',
});
</script>

<style scoped>
@import '../assets/base.css';

.navbar {
  display: grid;
  grid-template-rows: 1fr 1fr 8fr;
  height: 100vh;
  width: 10vw;
  background-color: var(--darkblue-bg);
  color: var(--white-color);
  align-items: flex-start;
}

.logo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 12px;
}
.navigation {
  display: grid;
  width: 100%;
  gap: 2px;
  border: 0;
}

.navigation a {
  background-color: var(--darkerblue-bg);
  color: white;
  text-decoration: none;
  width: 100%;
  text-align: center;
  margin: 0.5px 0px;
  padding: 5px 0px;
  font-size: 12.8px;
}
</style>
