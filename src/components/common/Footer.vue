<template>
  <div class="footer">
    <div class="footer-content">
      {{ new Date().getFullYear() }} — <strong>ProductPoker</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}

.footer-content {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>