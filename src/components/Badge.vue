<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="badge__container"
		:class="predefinedStyle"
	>
		<div
			:class="{
				'badge__content--sm': size === 'sm',
				'badge__content--md': size === 'md',
				'badge__content--lg': size === 'lg',
			}"
		>
			<rds-clickable
				v-if="clickable"
				@click="$emit('click', true)"
			>
				<!-- @slot Standard slot used to display content inside the badge -->
				<slot />
			</rds-clickable>

			<slot v-else />
		</div>
	</div>
</template>

<script>
import RdsClickable from './Clickable.vue'

export default {
	components: {
		RdsClickable,
	},

	props: {
		/**
		 * The Badge variant. There are 9 variants: 'turquoise', 'green', 
		 * 'blue', 'violet', 'pink', 'red', 'orange', 'amber' and 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Specifies the size of the badge. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Specifies the size of the badge. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		clickable: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			predefinedColors: [
				'green',
				'teal',
				'turquoise',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
				'gray',
				'white',
			],
			predefinedSizes: [
				'sm',
				'md',
				'lg',
			],
		};
	},

	computed: {
		predefinedStyle() {
			let dynamicClass = '';

			if (this.predefinedColors.indexOf(this.variant) > -1) {
				dynamicClass += `badge--${this.variant}`;
			}

			if (this.predefinedSizes.indexOf(this.size) > -1) {
				dynamicClass += ` badge--${this.size}`;
			}

			return dynamicClass;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		cursor: default;
	}

	&--sm {
		padding: pYX(1, 2);
	}

	&--md {
		padding: pYX(1, 2);
	}

	&--lg {
		padding: pYX(1, 3);
	}

	&__content {
		&--sm {
			@include overline;
		}

		&--md {
			@include caption;
			font-weight: $font-weight-semibold;
		}

		&--lg {
			@include button-1;
			font-weight: $font-weight-semibold;
		}
	}

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		color: darken($shade-500, 4%);
		background-color: $shade-100;
	}

	&--amber {
		color: $al-700;
		background-color: $al-100;
	}

	&--gray {
		color: $n-600;
		background-color: $n-20;
	}

	&--white {
		color: $n-600;
		background-color: $n-0;
		outline: 1px solid $n-50;
	}
}
</style>
