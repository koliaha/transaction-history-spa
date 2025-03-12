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
@import "../assets/styles.scss";

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  &__button {
    padding: 10px 20px;
    font-size: 14px;
    background-color: $primary-color;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color $transition-duration ease,
      transform $transition-duration ease;

    &:hover:not(:disabled) {
      background-color: $primary-hover;
      transform: scale(1.05);
    }

    &:disabled {
      background-color: $disabled-bg;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: 14px;
    color: $label-color;
    font-weight: 500;
    transition: color $transition-duration ease;
  }
}
</style>
