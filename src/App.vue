<!-- src/App.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">История транзакций</h1>
    <FilterPanel />
    <TransactionTable />
    <Pagination />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTransactionStore } from './store/transactionStore';
import FilterPanel from './components/FilterPanel.vue';
import TransactionTable from './components/TransactionTable.vue';
import Pagination from './components/Pagination.vue';

const store = useTransactionStore();

onMounted(() => {
  store.fetchTransactions();
});
</script>
