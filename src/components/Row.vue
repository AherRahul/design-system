<template>
	<div class="rds-row">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'RdsRow'
};
</script>

<style scoped>
.rds-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
