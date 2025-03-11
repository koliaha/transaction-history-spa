<!-- src/components/Pagination.vue -->
<template>
  <div class="pagination">
    <button
      class="pagination__button"
      :disabled="store.currentPage === 1"
      @click="prevPage"
    >
      Назад
    </button>
    <span class="pagination__info">
      Страница {{ store.currentPage }} из {{ totalPages }}
    </span>
    <button
      class="pagination__button"
      :disabled="store.currentPage === totalPages"
      @click="nextPage"
    >
      Вперёд
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTransactionStore } from "../store/transactionStore";

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

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  &__button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #3182ce;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover:not(:disabled) {
      background-color: #2b6cb0;
    }

    &:disabled {
      background-color: #cbd5e0;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: 14px;
    color: #4a5568;
    font-weight: 500;
  }
}
</style>
