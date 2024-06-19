<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="rds-timeline-item">
		<div class="rds-timeline-item__opposite">
			<!-- @slot Slot used for rendering content on the left side of the TimelineItem.-->
			<slot name="opposite" />
		</div>

		<div
			class="rds-timeline-item__timeline-container"
		>
			<span
				v-if="!loading"
				:class="`rds-timeline-item__pin--${variant}${hollowed ? '--hollowed' : ''}`"
			/>

			<rds-spinner
				v-else
				size="sm"
				class="spinner"
				:variant="variant"
			/>

			<div
				:class="(loading || hollowed) ? 'tail--dashed' : 'tail'"
			/>
		</div>

		<div class="rds-timeline-item__content-container">
			<div
				v-if="hasSlot($slots, 'title')"
				class="rds-timeline-item__title"
			>
				<!-- @slot Slot used to render the TimelineItem title.-->
				<slot name="title" />
			</div>

			<span class="rds-timeline-item__text">
				<!-- @slot Slot used to render TimelineItem content. The elements added in this slot are arranged below the title. -->
				<slot name="content" />
			</span>
		</div>
	</div>
</template>

<script>
import RdsSpinner from './Spinner.vue';
import hasSlot from '../utils/methods/hasSlot';

export default {
	components: {
		RdsSpinner,
	},

	props: {
		/**
		* The TimelineItem variant. There are 10 variants: 'teal', 'green', 'blue',
		* 'violet', 'pink', 'red', 'orange', 'amber', 'gray' and 'dark'.
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Changes the pin state. When true turns the pin into a `Rds-spinner`.
		*/
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		* Changes the pin state. When true, it leaves the pin without filling, just with a border.
		*/
		hollowed: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		hasSlot,
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.rds-timeline-item {
	display: flex;

	&__opposite {
		color: $n-600;
		margin: mTRBL(n1, 6, 0, 0);
		@include body-2;
	}

	&__content-container {
		margin: mTRBL(n1, 0 , 8, 6);

	}

	&__title {
		color: $n-900;
		font-weight: 600;
		margin: mb(2);
	}
	
	&__text {
		@include caption;
		color: $n-600;
		font-weight: $font-weight-regular;
	}
	
	&__pin {
		border-radius: $border-radius-circle;
		min-height: 16px !important;
		min-width: 16px !important;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;
			@extend .rds-timeline-item__pin;

			&--hollowed {
				border: 4px solid $base-color;
				box-sizing: border-box;	
				@extend .rds-timeline-item__pin;
			}
		}
	}

	&__timeline-container {
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	
	.tail {
		background-color: $n-40;
		height: 100% !important;
		width: 2px !important;
	}

	.tail--dashed {
		border: 1px dashed $n-40;
		height: 100% !important;
		width: 2px !important;
	}
}

.spinner {
	min-height: 16px !important;
	min-width: 16px !important;
}

</style>
