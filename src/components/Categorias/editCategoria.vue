<template>
  <div class="card">
    <div class="header">
      <h2>Detalhes da Categoria</h2>
      <router-link :to="`/categorias/`" class="arrow">󱦱</router-link>
    </div>
    <form action="" class="form">
      <div class="campo">
        <label for="name">Nome da Categoria</label>
        <input type="text" v-model="name" required />
      </div>
      <button
        type="submit"
        @click.prevent="editCategory(id as unknown as number)"
        class="edit-button"
      >
        Editar
      </button>
      <button
        type="submit"
        @click.prevent="deleteCategory(id as unknown as number)"
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
import type JSON from '@/interfaces/JSON';
import type ErrorHandler from '../../interfaces/Error';

export default defineComponent({
  name: 'createUnits',
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      myList: '' as unknown as JSON,
      name: '',
      status: '',
      error: '',
      aaa: this.id,
    };
  },
  beforeMount() {
    api.get(`/categories/${this.aaa}`, headers).then((res) => {
      this.myList = res.data.data;
      this.name = this.myList.attributes.name;
    });
  },
  methods: {
    editCategory(id: number) {
      const body = {
        id: `${id}`,
        name: `${this.name}`,
      };
      api
        .patch(`/categories/${id}`, body, headers)
        .then((res) => {
          if (res.status == 200) {
            this.status = '200';
            this.$router.push('/categorias');
          }
        })
        .catch(
          (err: ErrorHandler) => (
            (this.error = err.response.status.toString()),
            (this.status = err.response.status.toString())
          )
        );
    },

    deleteCategory(id: number) {
      api
        .delete(`/categories/${id}`, headers)
        .then((res) => {
          if (res.status == 204) {
            this.status = '204';
            this.$router.push('/categorias');
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
  width: 100px;
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
  width: 100px;
}
</style>
