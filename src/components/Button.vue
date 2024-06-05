<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<button
		v-cdstip="tooltipDisabled"
		class="button__container"
		:class="computedStyle"
		@click.stop="clickHandler"
	>
		<cds-spinner
			v-if="loading"
			variant="white"
			size="sm"
			class="button__loader"
		/>

		<!-- @slot Default slot used to display button text. -->
		<slot>
			{{ text }}
		</slot>
	</button>
</template>

<script>
import CdsSpinner from '../components/Spinner.vue';
import Cdstip from '../utils/directives/cdstip';

export default {

	directives: {
		cdstip: Cdstip,
	},

	components: {
		CdsSpinner,
	},

	props: {
		/**
		 * The color variant. There are 9 variants implemented: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' and 'amber'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Specifies the size of the button. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		* When true, makes the button width fluid
		*/
		block: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the text to be displayed in the button body.
		 * This text will only be displayed if the default slot is not used.
		 */
		text: {
			type: String,
			default: 'Lorem ipsum',
		},
		/**
		 * Controls Button availability.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Text to be displayed as a tooltip on button hover when the disabled prop is active.
		 */
		tooltipText: {
			type: String,
			default: null,
		},
		/**
		 * Specifies whether the Button version is the secondary one.
		 */
		secondary: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies whether the Button version is the secondary one.
		 */
		loading: {
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
				'dark',
			],
			predefinedSizes: [
				'sm',
				'md',
				'lg',
			],
		};
	},

	computed: {
		widthResolver() {
			return this.block ? '100%' : 'max-content';
		},

		tooltipDisabled() {
			return this.disabled && this.tooltipText !== '' ? this.tooltipText : null;
		},

		predefinedColor() {
			if (this.secondary) {
				return 'button--secondary';
			}

			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `button--${this.variant}`;
			}

			return 'button--green';
		},

		predefinedSize() {
			if (this.predefinedSizes.indexOf(this.size) > -1) {
				return `button-size--${this.size}`;
			}
			return 'button-size--md';
		},

		computedStyle() {
			const disabled = this.disabled ? '--disabled' : '--active';

			return `${this.predefinedColor}${disabled} ${this.predefinedSize}`;
		},
	},

	methods: {
		clickHandler() {
			if (this.disabled) {
				return;
			}
			/**
			* Event that indicates that the Button was clicked
			* @event button-click
			* @type {Event}
			*/
			this.$emit('button-click', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.button {
	&--secondary {
		&--active {
			background-color: $n-10;
			color: $n-700;
			border: 1px solid $n-50 !important;
			
			&:hover {
				@extend .button--secondary--active;
				background-color: $n-20;
			}
		}

		&--disabled {
			cursor: default !important;
			background-color: $n-10;
			color: $n-300;
			border: 1px solid $n-30 !important;
		}
	}

	&__loader {
		margin: mr(3);
	}

	&__container {
		font-family: Satoshi, Inter, Avenir, Helvetica, Arial, sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		width: v-bind(widthResolver);
		border: none;
		cursor: pointer;

		&:focus {
			outline: none !important;
		}
	}

	$colors: (
		'--green': (
			'active': $gp-400,
			'disabled': $gp-300,
		),
		'--teal': (
			'active': $ta-400,
			'disabled': $ta-300,
		),
		'--turquoise': (
			'active': $ts-400,
			'disabled': $ts-300,
		),
		'--blue': (
			'active': $bn-400,
			'disabled': $bn-300,
		),
		'--indigo': (
			'active': $in-400,
			'disabled': $in-300,
		),
		'--violet': (
			'active': $vr-400,
			'disabled': $vr-300,
		),
		'--pink': (
			'active': $pp-400,
			'disabled': $pp-300,
		),
		'--red': (
			'active': $rc-400,
			'disabled': $rc-300,
		),
		'--orange': (
			'active': $og-400,
			'disabled': $og-300,
		),
		'--amber': (
			'active': $al-400,
			'disabled': $al-300,
		),
		'--dark': (
			'active': $n-700,
			'disabled': $n-500,
		),
	);

	@each $color, $variants in $colors {
		&#{$color} {
			@each $state, $disabled-color in $variants {
				&--#{$state} {
					background-color: $disabled-color;
					color: $n-0;
				}

				@if $state == 'active' {
					&--#{$state}:hover {
						background-color: darken($disabled-color, 5%);
						color: $n-0;
					}
				}
			}

			&--disabled {
				cursor: not-allowed;
			}
		}
	}
}

.button-size {
	&--sm {
		@include button-3;
		padding: pYX(2, 4);
		border-radius: $border-radius-lil;
	}

	&--md {
		@include button-2;
		padding: pYX(3, 6);
		border-radius: $border-radius-extra-small;
	}

	&--lg {
		@include button-1;
		padding: pYX(4, 8);
		border-radius: $border-radius-extra-small;
	}
}
</style>
