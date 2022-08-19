<template>
  <div class="card">
    <div class="text">
      <p>Clientes Cadastrados</p>
      <h2>{{ totalClientes }}</h2>
    </div>
    <div class="image">
      <img src="../../assets/clientesImage.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../services/axios.js';
import headers from '../../services/headers.js';

export default defineComponent({
  name: 'totalClientes',
  data() {
    return {
      totalClientes: null,
    };
  },
  beforeMount() {
    api.get('/customers/all', headers).then((response) => {
      const data = response.data.data;
      this.totalClientes = data.length;
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
