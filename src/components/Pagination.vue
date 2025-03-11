<!-- src/components/Pagination.vue -->
<template>
    <div class="flex justify-center items-center space-x-2 mt-4">
      <button 
        class="px-3 py-1 border rounded" 
        :disabled="store.currentPage === 1" 
        @click="prevPage">
        Назад
      </button>
      <span>Страница {{ store.currentPage }} из {{ totalPages }}</span>
      <button 
        class="px-3 py-1 border rounded" 
        :disabled="store.currentPage === totalPages" 
        @click="nextPage">
        Вперёд
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTransactionStore } from '../store/transactionStore';
  
  const store = useTransactionStore();
  
  const totalPages = computed(() => store.totalPages);
  
  const prevPage = () => {
    if (store.currentPage > 1) {
      store.setPage(store.currentPage - 1);
    }
  };
  
  const nextPage = () => {
    if (store.currentPage < totalPages.value) {
      store.setPage(store.currentPage + 1);
    }
  };
  </script>
  