import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';

import CategoriasView from '../views/CategoriasView.vue';
import ListaCategoria from '../components/Categorias/listaCategoria.vue';
import CreateCategoria from '../components/Categorias/createCategoria.vue';
import EditCategoria from '../components/Categorias/editCategoria.vue';

import ClientesView from '../views/ClientesView.vue';
import ListaCliente from '../components/Clientes/listaCliente.vue';
import EditCliente from '../components/Clientes/editCliente.vue';
import CreateCliente from '../components/Clientes/createCliente.vue';

import UnitsView from '../views/UnitsView.vue';
import ListaUnidades from '../components/Units/listaUnits.vue';
import CreateUnits from '../components/Units/createUnits.vue';
import EditUnits from '../components/Units/editUnit.vue';

import ProdutosView from '../views/ProdutosView.vue';
import ListaProdutos from '../components/Produtos/listaProdutos.vue';
import CreateProdutos from '../components/Produtos/createProducts.vue';
import EditProdutos from '../components/Produtos/editProducts.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/categorias',
    component: CategoriasView,
    children: [
      {
        path: '',
        name: 'Categorias',
        component: ListaCategoria,
      },
      {
        path: 'novo',
        name: 'Nova Categoria',
        component: CreateCategoria,
      },
      {
        path: ':id',
        name: 'Editar Categoria',
        component: EditCategoria,
        props: true,
      },
    ],
  },
  {
    path: '/clientes',
    component: ClientesView,
    children: [
      {
        path: '',
        name: 'Clientes',
        component: ListaCliente,
      },
      {
        path: 'novo',
        name: 'Novo cliente',
        component: CreateCliente,
      },
      {
        path: ':id',
        name: 'Editar cliente',
        component: EditCliente,
        props: true,
      },
    ],
  },
  {
    path: '/units',
    component: UnitsView,
    children: [
      {
        path: '',
        name: 'Unidades de Medida',
        component: ListaUnidades,
      },
      {
        path: 'novo',
        name: 'Nova Unidade de Medida',
        component: CreateUnits,
      },
      {
        path: ':id',
        name: 'Editar Unidade de Medida',
        component: EditUnits,
        props: true,
      },
    ],
  },
  {
    path: '/produtos',
    component: ProdutosView,
    children: [
      {
        path: '',
        name: 'Produtos',
        component: ListaProdutos,
      },
      {
        path: 'novo',
        name: 'Novo Produto',
        component: CreateProdutos,
      },
      {
        path: ':id',
        name: 'Editar Produto',
        component: EditProdutos,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
