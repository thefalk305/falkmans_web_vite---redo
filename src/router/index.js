import { createRouter, createWebHistory } from "vue-router";

// 1. Manually define special routes
const staticRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/FamilyHistory.vue')
  }
];

// Explicit route for InfoPage that accepts an optional :id and passes it as a prop
staticRoutes.push({
  path: '/InfoPage/:id?',
  name: 'InfoPage',
  component: () => import('@/views/InfoPage.vue'),
  props: route => ({ id: Number(route.params.id) })
});

staticRoutes.push({
  path: '/FamilyPage/:id?',
  name: 'FamilyPage',
  component: () => import('@/views/FamilyPage.vue'),
  props: route => ({ id: Number(route.params.id) })
});

staticRoutes.push({
  path: '/add-person',
  name: 'AddPerson',
  component: () => import('@/views/BranchForm.vue'),
});

staticRoutes.push({
  path: '/info-table-view',
  name: 'InfoTableView',
  component: () => import('@/views/InfoTableView.vue'),
});

// 2. Dynamically generate routes from the /views folder
const viewModules = import.meta.glob('@/views/*.vue');

const dynamicRoutes = Object.entries(viewModules).map(([path, loader]) => {
  const name = path.split('/').pop().replace('.vue', '');
  return {
    path: '/' + name,
    name: '/' + name,
    component: loader
  };
});

// 3. Combine them
const routes = [...staticRoutes, ...dynamicRoutes];

// 4. Create the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;