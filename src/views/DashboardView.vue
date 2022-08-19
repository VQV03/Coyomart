<template>
  <div class="titulo">
    <h1>Dashboard</h1>
  </div>
  <div class="totais">
    <totalProdutos />
    <totalClientes />
  </div>
  <div class="lista">
    <produtosDestaque />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import totalProdutos from '../components/Dashboard/totalProdutos.vue';
import totalClientes from '../components/Dashboard/totalClientes.vue';
import produtosDestaque from '../components/Dashboard/produtosDestaque.vue';

export default defineComponent({
  name: 'DashboardView',
  components: {
    totalProdutos,
    totalClientes,
    produtosDestaque,
  },
});
</script>

<style scoped>
.titulo h1 {
  background-color: rgba(0, 0, 0, 0.18);
  color: white;
  line-height: 1;
  margin: 0;
  padding: 17px 0 10px 15px;
}

.totais {
  display: flex;
}
</style>
