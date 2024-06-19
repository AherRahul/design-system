<template>
	<span id="rds-link-button">
		<button
			class="link-button__container"
			:class="computedStyle"
			@click="clickHandler()"
		>
			<!-- @slot Default slot used to display button text. -->
			<slot>
				{{ text }}
			</slot>
		</button>
	</span>
</template>

<script>
export default {

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
			],
		};
	},

	computed: {
		predefinedColor() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `link-button--${this.variant}`;
			}

			return 'link-button--green';
		},

		computedStyle() {
			const disabled = this.disabled ? '--disabled' : '--active';

			return `${this.predefinedColor}${disabled}`;
		},
	},

	methods: {
		clickHandler() {
			if (this.disabled) {
				return;
			}
			/**
			* Event that indicates that the Button was clicked
			* @event click
			* @type {Event}
			*/
			this.$emit('click', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.link-button {
	&__container {
		font-weight: $font-weight-semibold;
		border: none;
		cursor: pointer;
		background-color: transparent;

		&:focus {
			outline: none !important;
		}
	}

	$colors: (
		'--green': (
			'active': $gp-500,
			'disabled': $gp-300,
		),
		'--teal': (
			'active': $ta-500,
			'disabled': $ta-300,
		),
		'--turquoise': (
			'active': $ts-500,
			'disabled': $ts-300,
		),
		'--blue': (
			'active': $bn-500,
			'disabled': $bn-300,
		),
		'--indigo': (
			'active': $in-500,
			'disabled': $in-300,
		),
		'--violet': (
			'active': $vr-500,
			'disabled': $vr-300,
		),
		'--pink': (
			'active': $pp-500,
			'disabled': $pp-300,
		),
		'--red': (
			'active': $rc-500,
			'disabled': $rc-300,
		),
		'--orange': (
			'active': $og-500,
			'disabled': $og-300,
		),
		'--amber': (
			'active': $al-500,
			'disabled': $al-300,
		),
	);

	@each $color, $variants in $colors {
		&#{$color} {
			@each $state, $disabled-color in $variants {
				&--#{$state} {
					color: $disabled-color;
				}

				@if $state == 'active' {
					&--#{$state}:hover {
						color: darken($disabled-color, 5%);
					}
				}
			}

			&--disabled {
				cursor: not-allowed;
			}
		}
	}
}
</style>
