<!-- src/components/FilterPanel.vue -->
<template>
    <div class="filter-panel">
      <div class="filter-section">
        <!-- Фильтр по типу -->
        <div class="filter-item">
          <label class="filter-label">Тип транзакции:</label>
          <select v-model="localFilter.type" @change="applyFilters" class="filter-input">
            <option value="">Все</option>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </div>
    
        <!-- Фильтр по датам -->
        <div class="filter-item">
          <label class="filter-label">Дата с:</label>
          <input type="date" v-model="localFilter.dateFrom" @change="applyFilters" class="filter-input" />
        </div>
        <div class="filter-item">
          <label class="filter-label">Дата по:</label>
          <input type="date" v-model="localFilter.dateTo" @change="applyFilters" class="filter-input" />
        </div>
    
        <!-- Сортировка -->
        <div class="filter-item">
          <label class="filter-label">Сортировать по:</label>
          <select v-model="localSort.field" @change="applySort" class="filter-input">
            <option value="date">Дата</option>
            <option value="amount">Сумма</option>
          </select>
          <select v-model="localSort.order" @change="applySort" class="filter-input">
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
  
  <style scoped lang="scss">
  .filter-panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  
    .filter-section {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  
    .filter-item {
      display: flex;
      flex-direction: column;
      flex: 1 1 200px;
  
      .filter-label {
        font-weight: 600;
        margin-bottom: 5px;
        color: #4a5568;
      }
  
      .filter-input {
        padding: 8px 12px;
        border: 1px solid #cbd5e0;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.3s, box-shadow 0.3s;
        
        &:focus {
          border-color: #3182ce;
          box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
          outline: none;
        }
      }
    }
  }
  </style>
  