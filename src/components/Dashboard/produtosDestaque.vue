<template>
  <div class="lista">
    <div class="titulo">
      <p>Listagem de Produtos em Destaque</p>
    </div>
    <div class="ferramentaListagem">
      <ListaDestaque />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListaDestaque from './listaDestaque.vue';

export default defineComponent({
  name: 'produtosDestaque',
  components: { ListaDestaque },
});
</script>

<style scoped>
.lista {
  display: flex;
  flex-direction: column;
  padding: 32px 11px 32px 32px;
  width: 1088px;
  height: 550px;
  border-radius: 8px;
  margin-top: 26px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
}

.lista .titulo {
  padding-bottom: 10px;
}
</style>
