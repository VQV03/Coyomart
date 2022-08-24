<template>
  <div class="card">
    <div class="header">
      <h2>Detalhes do Produto</h2>
      <router-link :to="`/produtos/`" class="arrow">󱦱</router-link>
    </div>
    <form action="" class="form">
      <div class="campo">
        <label for="name">Nome do Produtos</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="campo">
        <label for="description">Descrição do Produto</label>
        <input type="text" v-model="description" class="description" required />
      </div>
      <div class="campo">
        <label for="categoryID">Categoria</label>
        <select name="category" class="dropdown" v-model="categoryID" required>
          <option disabled value="" selected="true">Categorias</option>
          <option
            v-for="category in categoryList"
            :key="category?.id"
            v-bind:value="category?.id"
            :selected="category?.id == categoryID"
          >
            {{ category?.attributes.name }}
          </option>
        </select>
      </div>
      <div class="campo">
        <label for="unitID">Unidade de Medida</label>
        <select name="unit" class="dropdown" v-model="unitID" required>
          <option disabled value="" selected="true">Unidades de Medida</option>
          <option
            v-for="unit in unitList"
            :key="unit?.id"
            v-bind:value="unit?.id"
            :selected="unit?.id == unitID"
          >
            {{ unit?.attributes.name }}
          </option>
        </select>
      </div>
      <div class="campo">
        <label for="quantityInStock">Quantidade em Estoque</label>
        <input type="number" v-model="quantityInStock" required />
      </div>
      <div class="campo">
        <label for="price">Preço</label>
        <input type="number" v-model="price" required />
      </div>
      <div class="campo">
        <label for="image">Imagem do Produto</label>
        <input type="url" v-model="image" required />
      </div>
      <div class="campo-check">
        <input type="checkbox" v-model="highlight" />
        <label for="highlight">Em destaque?</label>
      </div>
      <button
        type="submit"
        @click.prevent="editProduct(id as string)"
        class="edit-button"
      >
        Editar
      </button>
      <button
        type="submit"
        @click.prevent="deleteProduct(id as string)"
        class="delete-button"
      >
        Excluir
      </button>
      <div
        v-if="status !== '201' && status !== '' && status !== '204'"
        class="error"
      >
        <p>Ocorreu um erro {{ error }} inesperado, tente novamente.</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../services/axios.js';
import headers from '../../services/headers.js';
import type JSON from '../../interfaces/JSON';
import type ErrorHandler from '@/interfaces/Error';

export default defineComponent({
  name: 'createUnits',
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      myList: {} as JSON,
      name: '',
      description: '',
      quantityInStock: 0,
      price: 0,
      highlight: false,
      image: '',
      categoryID: 0,
      unitID: 0,
      status: '',
      error: '',
      aaa: this.id,
      unitList: '' as unknown as JSON,
      categoryList: '' as unknown as JSON,
    };
  },
  beforeMount() {
    api.get('/units', headers).then((res) => {
      this.unitList = res.data.data;
    });
    api.get('/categories', headers).then((res) => {
      this.categoryList = res.data.data;
    });
    api.get(`/products/${this.aaa}`, headers).then((res) => {
      this.myList = res.data.data;
      console.log(this.myList);
      this.name = this.myList.attributes.name;
      this.description = this.myList.attributes.description || '';
      this.quantityInStock = this.myList.attributes['quantity-in-stock'] || 0;
      this.highlight = this.myList.attributes.highlight || false;
      this.categoryID = this.myList.attributes['category-name']?.id || 0;
      this.unitID = this.myList.attributes['unit-name']?.id || 0;
      this.image = this.myList.attributes.image || '';
      this.price = this.myList.attributes.price || 0;
    });
  },
  methods: {
    editProduct(id: string) {
      const body = {
        id: `${id}`,
        name: `${this.name}`,
        description: `${this.description}`,
        quantity_in_stock: this.quantityInStock,
        price: this.price,
        highlight: [this.highlight],
        image: `${this.image}`,
        category_id: `${this.categoryID}`,
        unit_id: `${this.unitID}`,
      };
      api
        .patch(`/products/${id}`, body, headers)
        .then((res) => {
          if (res.status == 200) {
            this.status = '200';
            this.$router.push('/produtos');
          }
        })
        .catch(
          (err: ErrorHandler) => (
            (this.error = err.response.status.toString()),
            (this.status = err.response.status.toString())
          )
        );
    },

    deleteProduct(id: string) {
      api
        .delete(`/products/${id}`, headers)
        .then((res) => {
          if (res.status == 204) {
            this.status = '204';
            this.$router.push('/produtos');
          }
        })
        .catch(
          (err: ErrorHandler) => (
            (this.error = err.response.status.toString()),
            (this.status = err.response.status.toString())
          )
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

.header {
  display: flex;
  justify-content: space-between;
}

.header h2 {
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 16px;
}

.arrow {
  font-family: 'Material';
  font-size: 26px;
  padding-right: 24px;
  text-decoration: none;
  color: black;
}

.campo {
  display: flex;
  flex-direction: column;
}

.campo label {
  font-size: 12.8px;
  padding-bottom: 8px;
}

.campo input {
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  color: #7b7b7b;
  height: 25px;
  border-radius: 1px;
  margin-bottom: 16px;
  width: 320px;
}

.campo-check {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
}

.description {
  width: 670px !important;
}

.dropdown {
  padding: 8px 16px;
  height: 35px;
  width: 320px;
  background: #f5f5f5;
  color: #7b7b7b;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 16px;
}

.error {
  padding: 8px 16px;
  background-color: #fbeded;
  border: 1px solid red;
  color: red;
  border-radius: 8px;
  width: 370px;
  margin-top: 16px;
}

.edit-button {
  text-decoration: none;
  color: black;
  background-color: var(--darkblue-bg);
  color: white;
  padding: 8px 32px 8px 32px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
}

.delete-button {
  text-decoration: none;
  color: black;
  background-color: white;
  color: var(--darkblue-bg);
  padding: 8px 32px 8px 32px;
  border-radius: 8px;
  border: 1px solid #214171;
  margin-left: 16px;
  cursor: pointer;
}
</style>
