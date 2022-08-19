<template>
  <div class="card">
    <div class="text">
      <p>Produtos Cadastrados</p>
      <h2>{{ totalProdutos }}</h2>
    </div>
    <div class="image">
      <img src="../../assets/produtosImage.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../services/axios.js';
import headers from '../../services/headers.js';

export default defineComponent({
  name: 'totalProdutos',
  data() {
    return {
      totalProdutos: null,
    };
  },
  beforeMount() {
    api.get('/products/all', headers).then((response) => {
      const data = response.data.data;
      this.totalProdutos = data.length;
    });
  },
});
</script>

<style scoped>
.card {
  display: flex;
  padding: 32px 64px;
  border-radius: 8px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
  margin-right: 16px;
  margin-top: 16px;
}

.card p {
  margin: 0;
  font-size: 20px;
}

.card h2 {
  text-align: left;
  font-size: 50px;
  font-weight: 700;
  margin: 0;
}

.card .image {
  justify-content: center;
  margin-left: 36px;
}
</style>
