<template>
  <div class="fullList">
    <div class="header">
      <input type="search" v-model="search" placeholder="Procurar" />
    </div>
    <div class="list">
      <div class="list-header">
        <p>Imagem</p>
        <p>Descrição</p>
        <p>Categoria</p>
        <p>Un</p>
        <p>Estoque</p>
        <p>Valor</p>
      </div>
      <div class="list-content">
        <div v-for="item in current_data" :key="item.id" class="item-list">
          <img v-bind:src="item.attributes.image" class="item-image" />
          <p>{{ item.attributes.name }}</p>
          <p>{{ item.attributes['category-name']?.name }}</p>
          <p>{{ item.attributes['unit-name']?.name }}</p>
          <p>{{ item.attributes['quantity-in-stock'] }}</p>
          <p>R${{ item.attributes.price }}</p>
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
  name: 'listaDestaque',
  data() {
    return {
      myList: [] as unknown as JSON[],
      search: '',
      highlightList: [] as unknown as JSON[],
    };
  },
  beforeMount() {
    api.get('/products/all', headers).then((response) => {
      this.myList = response.data.data;
      this.highlightList = this.myList.filter(
        (element) => element.attributes.highlight == true
      );
    });
  },
  methods: {},
  computed: {
    current_data() {
      return (
        this.highlightList.filter((element) =>
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
.fullList {
  display: flex;
  flex-direction: column;
}

.header {
  text-align: right;
}

.header input {
  height: 30px;
  width: 380px;
}

.list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
}

.list-header {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr 2fr 2fr;
  background: #d9d9d9;
  text-align: center;
}

.list-content {
  max-height: 500px;
  overflow-y: auto;
}

.item-list {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1.5fr 1.5fr 2fr;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  padding: 0px 25px 0px 20px;
  text-align: center;
  align-items: center;
}

.item-list:nth-child(1) {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1.5fr 1.5fr 2fr;
  border-bottom: 1px solid #d9d9d9;
}

.item-list p:nth-child(6) {
  padding-left: 60px;
}

.item-list img {
  width: 48px;
  height: 48px;
}
</style>
