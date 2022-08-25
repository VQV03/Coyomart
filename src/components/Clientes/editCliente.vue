<template>
  <div class="card">
    <div class="header">
      <h2>Detalhes do Cliente</h2>
      <router-link :to="`/clientes/`" class="arrow">󱦱</router-link>
    </div>
    <form action="" class="form">
      <div class="campo">
        <label for="name">Nome do Cliente</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="campo">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="campo">
        <label for="date">Data de Nascimento</label>
        <input type="date" v-model="birthdate" required />
      </div>
      <div class="campo">
        <label for="cpf">CPF</label>
        <input type="text" v-model="cpf" v-mask="'###.###.###-##'" required />
      </div>
      <div class="campo">
        <label for="address">Endereco</label>
        <input type="text" v-model="address" required />
      </div>
      <div class="campo">
        <label for="phone1">Telefone 1</label>
        <input
          type="text"
          v-model="phone1"
          v-mask="['(##) ####-####', '(##) #####-####']"
          required
        />
      </div>
      <div class="campo">
        <label for="phone2">Telefone 2</label>
        <input
          type="text"
          v-model="phone2"
          v-mask="['(##) ####-####', '(##) #####-####']"
        />
      </div>
      <button
        type="submit"
        class="edit-button"
        @click.prevent="editCliente(id as unknown as number)"
      >
        Editar
      </button>
      <button
        type="submit"
        class="delete-button"
        @click.prevent="deleteCliente(id as unknown as number)"
      >
        Excluir
      </button>
      <div
        v-if="status !== '201' && status !== '' && status !== '204'"
        class="error"
      >
        <p>Ocorreu um erro {{ error }} inesperado, tente novamente.</p>
      </div>
      <div v-if="status === 'cpf-invalido'" class="error">
        CPF inválido, insira um cpf válido para continuar.
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../../services/axios.js';
import headers from '../../services/headers.js';
import type JSON from '../../interfaces/JSON';
import type ErrorHandler from '../../interfaces/Error';
import { cpf } from 'cpf-cnpj-validator';

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
      email: '',
      birthdate: '' as unknown as Date,
      cpf: '',
      address: '',
      phone1: '',
      phone2: '',
      status: '',
      error: '',
      aaa: this.id,
    };
  },
  beforeMount() {
    api.get(`/customers/${this.aaa}`, headers).then((res) => {
      this.myList = res.data.data;
      this.name = this.myList.attributes.name;
      this.email = this.myList.attributes.email || '';
      this.birthdate = this.myList.attributes.birthdate || new Date();
      this.cpf = this.myList.attributes.cpf || '';
      this.address = this.myList.attributes.address || '';
      this.phone1 = this.myList.attributes.phone1 || '';
      this.phone2 = this.myList.attributes.phone2 || '';
    });
  },
  methods: {
    editCliente(id: number) {
      const body = {
        id: `${id}`,
        name: `${this.name}`,
        birthdate: `${this.birthdate}`,
        cpf: this.cpf,
        address: this.address,
        phone1: [this.phone1],
        phone2: `${this.phone2}`,
        email: `${this.email}`,
      };
      const valido = cpf.isValid(this.cpf);
      if (valido === true) {
        api
          .patch(`/customers/${id}`, body, headers)
          .then((res) => {
            if (res.status == 200) {
              this.status = '200';
              this.$router.push('/clientes');
            }
          })
          .catch(
            (err: ErrorHandler) => (
              (this.error = err.response.status.toString()),
              (this.status = err.response.status.toString())
            )
          );
      } else {
        this.status = 'cpf-invalido';
      }
    },

    deleteCliente(id: number) {
      api
        .delete(`/customers/${id}`, headers)
        .then((res) => {
          console.log(id);
          if (res.status == 204) {
            this.status = '204';
            this.$router.push('/clientes');
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
