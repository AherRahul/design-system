<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="rds-timeline">
		<!-- @slot Content to be placed on the Timeline. Supports `TimelineItem` as a subcomponent.  -->
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		/**
		* Reverses the order of Timeline elements.
		*/
		reverse: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			oppositeSlotMaxWidth: '0',
		};
	},

	computed: {
		directionResolver() {
			return this.reverse ? 'column-reverse' : 'column';
		},

		oppositeSlotWidthResolver() {
			return `${this.oppositeSlotMaxWidth}px`;
		},
	},

	mounted() {
		let oppositeSlots = document.querySelectorAll('.rds-timeline-item__opposite');

		oppositeSlots.forEach(slot => {
			let slotWidth = slot.getClientRects()[0].width;
			if (this.oppositeSlotMaxWidth < slotWidth) {
				this.oppositeSlotMaxWidth = slotWidth;
			}
		});
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';
.rds-timeline {
	padding: pa(5);
	display: flex;
	flex-direction: v-bind(directionResolver);
}

.rds-timeline > .rds-timeline-item > .rds-timeline-item__opposite {
	min-width: v-bind(oppositeSlotWidthResolver);
}
</style>
