<!-- src/components/Grid/Grid.vue -->
<template>
	<div class="rds-grid">
		<slot></slot>
	</div>
</template>
  
<script>
export default {
	name: 'RdsGrid'
};
</script>
  
<style>
.rds-grid {
  /* display: flex; */
  flex-wrap: wrap;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
</style>
  