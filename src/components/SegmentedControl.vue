<template>
	<div
		class="segment-control"
	>
		<button
			v-for="(segment, index) in segments"
			:key="index"
			class="segment-control__button"
			:class="{
				'segment-control__button--active': segment === activeSegment,
				'segment-control__button--inactive': segment !== activeSegment,
			}"
			@click="handleClick(segment, index)"
		>
			<rds-tooltip
				v-if="withIcon"
				:text="segmentsTooltipText[index]"
			>
				<rds-icon
					height="20"
					width="20"
					:name="segment"
				/>
			</rds-tooltip>

			<span v-else>{{ segment }}</span>
		</button>
	</div>
</template>
<script>
import RdsIcon from './Icon.vue';
import RdsTooltip from './Tooltip.vue';

export default {
	components: {
		RdsIcon,
		RdsTooltip,
	},
	props: {
		segments: {
			type: Array,
			default: () => [],
		},
		withIcon: {
			type: Boolean,
			default: false,
		},
		segmentsTooltipText: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			activeSegment: '',
		};
	},

	mounted() {
		this.activeSegment = this.segments[0];
	},

	methods: {
		handleClick(segment, index) {
			this.activeSegment = segment;
			this.$emit('click', this.activeSegment, index);
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';
.segment-control {
	background-color: $n-20;
	outline: 1px solid $n-40;
	display: flex;
	width: fit-content;
	padding: pa(1);
	border-radius: $border-radius-extra-small;
	
	&__button {
		max-width: 200px;
		border-radius: $border-radius-extra-small;
		border: none;
		background-color: transparent;
		font-size: 14px;
		cursor: pointer;
		transition: $opening;
		padding: pYX(2, 3);
		
		&--active {
			background-color: $n-0;
			color: $n-700;
			transition: $opening;
			box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.04);
			font-weight: $font-weight-semibold;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
		
		&--inactive {
			font-weight: $font-weight-semibold;
			background-color: transparent;
			color: $n-600;
			transition: $opening;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>