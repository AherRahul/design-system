<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<!--
		Event emitted when wrapper is clicked
		@event rds-click
		@type {Event}
	-->
	<div
		:class="{
			'clickable__container--clickable': clickable,
			'clickable__container--not-clickable': !clickable,
		}"
		@click.stop="$emit('rds-click', true)"
	>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Enables or disables clicking on the component
		 */
		clickable: {
			type: Boolean,
			default: false,
		}
	}
}
</script>

<style lang="scss">
.clickable__container {
	width: fit-content;

	&--clickable {
		@extend .clickable__container;
		cursor: pointer;
	}

	&--not-clickable {
		@extend .clickable__container;
		cursor: default;
	}
}
</style>