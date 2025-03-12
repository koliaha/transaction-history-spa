<template>
  <div class="filter-panel">
    <div class="filter-section">
      <div class="filter-item">
        <label class="filter-label">Тип транзакции:</label>
        <select
          v-model="localFilter.type"
          @change="applyFilters"
          class="filter-input"
        >
          <option value="">Все</option>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>
      <div class="filter-item">
        <label class="filter-label">Дата с:</label>
        <input
          type="date"
          v-model="localFilter.dateFrom"
          @change="applyFilters"
          class="filter-input"
        />
      </div>
      <div class="filter-item">
        <label class="filter-label">Дата по:</label>
        <input
          type="date"
          v-model="localFilter.dateTo"
          @change="applyFilters"
          class="filter-input"
        />
      </div>
      <div class="filter-item">
        <label class="filter-label">Сортировать по:</label>
        <select
          v-model="localSort.field"
          @change="applySort"
          class="filter-input"
        >
          <option value="date">Дата</option>
          <option value="amount">Сумма</option>
        </select>
        <select
          v-model="localSort.order"
          @change="applySort"
          class="filter-input"
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTransactionStore } from "../store/transactionStore";

const store = useTransactionStore();

const localFilter = ref({ ...store.filter });
const localSort = ref({ ...store.sort });

const applyFilters = () => {
  store.setFilter(localFilter.value);
};

const applySort = () => {
  store.setSort(localSort.value);
};

watch(
  () => store.filter,
  (newFilter) => {
    localFilter.value = { ...newFilter };
  }
);
watch(
  () => store.sort,
  (newSort) => {
    localSort.value = { ...newSort };
  }
);
</script>

<style scoped lang="scss">
@import "../assets/styles.scss";

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-panel {
  background: $panel-bg;
  border: 1px solid $panel-border;
  border-radius: $panel-radius;
  padding: 20px;
  box-shadow: $panel-shadow;
  margin: 20px 0;
  animation: fadeIn $animation-duration ease-out;

  .filter-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    flex: 1 1 200px;
    transition: transform $transition-duration ease;

    &:hover {
      transform: scale(1.02);
    }

    .filter-label {
      font-weight: 600;
      margin-bottom: 5px;
      color: $label-color;
    }

    .filter-input {
      padding: 8px 12px;
      border: 1px solid $input-border;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color $transition-duration ease,
        box-shadow $transition-duration ease;

      &:focus {
        border-color: $primary-color;
        box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
        outline: none;
      }
    }
  }
}
</style>
