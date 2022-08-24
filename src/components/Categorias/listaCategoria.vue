<template>
  <div class="card">
    <div class="titulo">
      <p>Listagem de Categorias</p>
    </div>
    <div class="fullList">
      <div class="header">
        <router-link :to="`/categorias/novo`">Nova Categoria</router-link>
        <input type="search" v-model="search" placeholder="Procurar" />
      </div>
      <div class="list">
        <div class="list-header">
          <p>Nome</p>
        </div>
        <div v-for="item in current_data" :key="item.id" class="list-content">
          <router-link :to="`/categorias/${item.id}`" class="item-list">
            <p>{{ item.attributes.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../services/axios.js';
import headers from '../../services/headers.js';
import type JSON from '../../interfaces/JSON';

export default defineComponent({
  name: 'listaCategoria',
  data() {
    return { myList: [] as unknown as JSON[], search: '' };
  },
  beforeMount() {
    api.get('/categories', headers).then((response) => {
      this.myList = response.data.data;
    });
  },
  computed: {
    current_data() {
      return (
        this.myList.filter((element) =>
          element.attributes.name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        ) || []
      );
    },
  },
});
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
  margin-right: 10%;
  margin-top: 15px;
  border-radius: 8px;
  padding: 32px 11px 32px 32px;
}

.titulo p {
  margin-bottom: 30px;
  font-size: 24px;
}
.fullList {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header a {
  text-decoration: none;
  color: black;
  background-color: var(--darkblue-bg);
  color: white;
  padding: 8px 32px 8px 32px;
  border-radius: 8px;
}

.header input {
  height: 30px;
  width: 380px;
}

.list-header {
  background-color: #d9d9d9;
  padding: 6px 12px 7px 19px;
}

.list-content {
  padding: 12px 15px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}

.list-content > a {
  text-decoration: none;
  color: black;
}

.list-content:last-child {
  border-bottom: none;
}

.list-content:hover {
  background-color: #d9d9d9;
}
</style>
