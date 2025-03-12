<!-- src/App.vue -->
<template>
  <div class="app-container">
    <h1 class="app-title">История транзакций</h1>
    <FilterPanel />
    <TransactionTable />
    <Pagination />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTransactionStore } from "./store/transactionStore";
import FilterPanel from "./components/FilterPanel.vue";
import TransactionTable from "./components/TransactionTable.vue";
import Pagination from "./components/Pagination.vue";

const store = useTransactionStore();

onMounted(() => {
  store.fetchTransactions();
});
</script>

<style scoped lang="scss">
@import "./assets/styles.scss"; 
.app-container {
  background-color: $app-background;
  color: $app-text-color;
  padding: $app-container-padding;
  max-width: $app-max-width;
  margin: 0 auto;

  .app-title {
    color: $app-title-color;
    font-size: $app-title-font-size;
    font-weight: $app-title-font-weight;
    text-align: center;
    margin-bottom: $app-title-margin-bottom;
  }
}
</style>
