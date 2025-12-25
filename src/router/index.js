import { createRouter, createWebHistory } from "vue-router";

// Dynamically import all views from the views folder
const viewModules = import.meta.glob('@/views/*.vue');

// Map filenames to custom route configurations
const customRoutes = {
  'FamilyHistory.vue': { path: '/', name: 'Home' },
  'InfoPage.vue': { path: '/InfoPage/:id?', name: 'InfoPage' },
  'FamilyPage.vue': { path: '/FamilyPage/:id?', name: 'FamilyPage' },
  'BranchForm.vue': { path: '/add-person', name: 'AddPerson' },
  'InfoTableView.vue': { path: '/info-table-view', name: 'InfoTableView' },
  'Logout.vue': { path: '/logout', name: 'Logout' }
};

// Build routes array
const routes = Object.entries(viewModules).map(([filePath, loader]) => {
  const filename = filePath.split('/').pop();
  const custom = customRoutes[filename];
  
  const route = {
    path: custom?.path || '/' + filename.replace('.vue', ''),
    name: custom?.name || filename.replace('.vue', ''),
    component: loader
  };
  
  // Add props for routes with ID parameters
  if (filename === 'InfoPage.vue' || filename === 'FamilyPage.vue') {
    route.props = r => ({ id: Number(r.params.id) });
  }
  
  return route;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;