<template>
	<span id="rds-icon-button">
		<rds-tooltip
			:text="innerTooltipText"
		>
			<button
				class="rds-icon-button__container"
				:class="computedModifiers"
				@click="clickHandler"
			>
				<rds-icon
					:key="inputControlPanel"
					:name="internalIcon"
					class="rds-icon-button__icon"
				/>
			</button>
		</rds-tooltip>
	</span>
</template>

<script>
import RdsIcon from './Icon.vue';
import RdsTooltip from './Tooltip.vue';

const predefinedSizes = [
	'sm',
	'md',
	'lg',
];

export default {
	components: {
		RdsIcon,
		RdsTooltip,
	},

	props: {
		/**
		 * Specifies the size of the button. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
			validator: (value) => {
				return predefinedSizes.includes(value);
			},
		},
		/**
		* Specifies the `name` of the cura icons icon to be displayed in the button body.
		*/
		icon: {
			type: String,
			default: 'create-outline',
		},
		/**
		 * Controls button availability.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		* Text to be displayed as a tooltip when the button is hovered.
		*/
		tooltipText: {
			type: String,
			default: null,
		},
		/**
		* When active, it causes the button icon to temporarily change after user iteration.
		*/
		feedbackOnClick: {
			type: Boolean,
			default: false,
		},
		/**
		* Icon shown after user click.
		*/
		feedbackIcon: {
			type: String,
			default: 'check-outline',
		},
		/**
		* The color variant. There are 9 variants implemented: 'green', 'teal',
		* 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' and 'dark'.
		*/
		variant: {
			type: String,
			default: 'white',
		},
	},

	data() {
		return {
			predefinedSizes,
			innerTooltipText: this.tooltipText,
			internalIcon: this.icon,
			inputControlPanel: 0,
		};
	},

	computed: {
		predefinedSize() {
			return `rds-icon-button--${this.size}`;
		},

		computedModifiers() {
			const status = this.disabled ? 'rds-icon-button--disabled' : '';
			const variantClass = `rds-icon-button__container--${this.variant}`;

			return `${status} ${this.predefinedSize} ${variantClass}`;
		},
	},

	watch: {
		disabled: {
			handler(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}

				if (newValue === true) {
					this.innerTooltipText = null;
				} else {
					this.innerTooltipText = this.tooltipText;
				}
			},
			immediate: true,
		},
	},

	methods: {
		clickHandler(e) {
			if (this.disabled) {
				return;
			}

			if (this.feedbackOnClick) {
				this.inputControlPanel += 1;
				this.internalIcon = this.feedbackIcon;
				setTimeout(() => {
					this.internalIcon = this.icon;
					this.inputControlPanel += 1;
				}, 1000);

				this.inputControlPanel += 1;
			}

			/**
			* Event that indicates that the button was clicked
			* @event rds-click
			* @type {Event}
			*/
			this.$emit('rds-click', e);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.rds-icon-button {
	&__container {
		border: none !important;
		border-radius: $border-radius-extra-small;
		cursor: pointer;
		box-sizing: border-box;

		&:focus {
			outline: none !important;
		}

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .rds-icon-button__container;
			background-color: $base-color;
			color: $n-0;

			@if ($color-name == 'gray') {
				background-color: $shade-100;
				color: $n-600;
			}

			@if ($color-name == 'white') {
				color: $n-600;
				outline: 1px solid $n-50 !important;

				&:hover {
					background-color: $n-10;
				}
			} @else {
				&:hover {
					background-color: $shade-500;
				}
			}
		}
	}

	&--disabled {
		box-sizing: border-box;
		outline: 1px solid transparent !important;
		color: $n-300 !important;
		background-color: $n-20 !important;
		cursor: not-allowed !important;

		&:hover {
			outline: 1px solid transparent !important;
		}
	}

	&__icon {
		display: flex;
	}
}

.rds-icon-button {
	&--sm {
		padding: pYX(2, 2);
		border-radius: $border-radius-lil;

		.rds-icon-button__icon {
			transition: $hover;
			width: 16px;
			height: 16px;
		}
	}

	&--md {
		padding: pYX(2, 2);
		border-radius: $border-radius-extra-small;

		.rds-icon-button__icon {
			transition: $hover;
			width: 20px;
			height: 20px;
		}
	}

	&--lg {
		padding: pYX(2, 2);
		border-radius: $border-radius-extra-small;

		.rds-icon-button__icon {
			transition: $hover;
			width: 24px;
			height: 24px;
		}
	}
}
</style>
