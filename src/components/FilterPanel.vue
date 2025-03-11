<!-- src/components/FilterPanel.vue -->
<template>
    <div class="mb-4 p-4 bg-gray-100 rounded shadow">
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
        <!-- Фильтр по типу -->
        <div class="mb-2 md:mb-0">
          <label class="mr-2">Тип транзакции:</label>
          <select v-model="localFilter.type" @change="applyFilters" class="border p-1 rounded">
            <option value="">Все</option>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </div>
  
        <!-- Фильтр по датам -->
        <div class="mb-2 md:mb-0">
          <label class="mr-2">Дата с:</label>
          <input type="date" v-model="localFilter.dateFrom" @change="applyFilters" class="border p-1 rounded" />
        </div>
        <div class="mb-2 md:mb-0">
          <label class="mr-2">Дата по:</label>
          <input type="date" v-model="localFilter.dateTo" @change="applyFilters" class="border p-1 rounded" />
        </div>
  
        <!-- Сортировка -->
        <div>
          <label class="mr-2">Сортировать по:</label>
          <select v-model="localSort.field" @change="applySort" class="border p-1 rounded">
            <option value="date">Дата</option>
            <option value="amount">Сумма</option>
          </select>
          <select v-model="localSort.order" @change="applySort" class="border p-1 rounded ml-2">
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useTransactionStore } from '../store/transactionStore';
  
  const store = useTransactionStore();
  
  const localFilter = ref({ ...store.filter });
  const localSort = ref({ ...store.sort });
  
  const applyFilters = () => {
    store.setFilter(localFilter.value);
  };
  
  const applySort = () => {
    store.setSort(localSort.value);
  };
  
  // Если значения в store изменятся извне, синхронизируем локальное состояние
  watch(() => store.filter, (newFilter) => {
    localFilter.value = { ...newFilter };
  });
  watch(() => store.sort, (newSort) => {
    localSort.value = { ...newSort };
  });
  </script>
  
  <style scoped>
  /* Местные стили можно добавить здесь, если нужно */
  </style>
  