// Shared composable to access infoTable data
import { ref, inject } from 'vue';

export function useInfoTableData() {
  // Try to get the infoTable from global injection first
  const injectedInfoTable = inject('infoTable', null);

  const infoTable = ref(injectedInfoTable || []);
  const loading = ref(false); // No loading since data is provided app-wide
  const error = ref(null);

  // If no injected data is available, log a warning
  if (!injectedInfoTable) {
    console.warn('useInfoTableData: No infoTable found via injection. Make sure it is provided in main.js.');
    // Set a default empty array
    infoTable.value = [];
  }

  return {
    infoTable,
    loading,
    error
  };
}