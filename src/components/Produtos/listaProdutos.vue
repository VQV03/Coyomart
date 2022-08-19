<template>
  <div class="card">
    <div class="titulo">
      <p>Listagem de Produtos</p>
    </div>
    <div class="fullList">
      <div class="header">
        <router-link :to="`/produtos/novo`">Novo Produto</router-link>
        <input type="search" v-model="search" placeholder="Procurar" />
      </div>
      <div class="list">
        <div class="list-header">
          <p>Imagem</p>
          <p>Nome</p>
          <p>Categoria</p>
          <p>Unidade de Medida</p>
          <p>Quantidade em Estoque</p>
          <p>Preço</p>
          <p>Em destaque?</p>
        </div>
        <div class="list-contents">
          <div v-for="item in current_data" :key="item.id" class="list-content">
            <router-link :to="`/produtos/${item.id}`" class="item-list">
              <img v-bind:src="item.attributes.image" class="item-image" />
              <p>{{ item.attributes.name }}</p>
              <p>{{ item.attributes['category-name'].name }}</p>
              <p>{{ item.attributes['unit-name'].name }}</p>
              <p>{{ item.attributes['quantity-in-stock'] }}</p>
              <p>R${{ item.attributes.price }}</p>
              <p>{{ highligth(item) }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../services/axios.js';
import headers from '../../services/headers.js';

export default defineComponent({
  name: 'listaProdutos',
  data() {
    return { myList: [], search: '' };
  },
  beforeMount() {
    api.get('/products/all', headers).then((response) => {
      this.myList = response.data.data;
    });
  },
  methods: {
    highligth(item) {
      if (item.attributes.highlight === true) {
        return 'Sim';
      } else {
        return 'Não';
      }
    },
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
  display: grid;
  grid-template-columns: 0.5fr 1.4fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
}
.list-contents {
  max-height: 550px;
  overflow-y: auto;
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

.item-list {
  display: grid;
  grid-template-columns: 0.5fr 1.4fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
}

.item-list:nth-child(1) {
  border-left: 30px;
  padding-left: 29px;
}

.item-list p:nth-child(6) {
  padding-left: 20px;
}

.item-list p:nth-child(7) {
  padding-left: 40px;
}

.item-image {
  max-width: 48px;
  max-height: 48px;
}
</style>
