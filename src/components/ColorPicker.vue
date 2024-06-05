<template>
	<div v-if="inline">
		<div class="color-picker__label">
			{{ label }}
		</div>

		<div
			v-for="(swatchline, i) in swatch"
			:key="i"
			class="color-picker__container"
		>
			<div
				v-for="(color, j) in swatchline"
				:key="j"
			>
				<div
					:class="`color-picker__swatch--${color.replace('$', '')}`"
					@click="SwatchSelection(color)"
				>
					<cds-icon
						v-if="isCurrentColorSelected(color)"
						height="22"
						width="22"
						name="check-outline"
						class="swatch__icon"
						:class="iconColorResolver"
					/>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<div
			id="color-picker"
			class="color-picker__trigger"
			@click.stop="showPopover = !showPopover"
		>
			<div class="color-picker__preview" /> 
		</div>

		<cds-popover
			v-model="showPopover"
			:right-aligned="false"
			target-id="color-picker"
			:height="popoverHeight"
			fit-content-width
		>
			<div
				v-for="(swatchline, i) in swatch"
				:key="i"
				class="popover__container"
			>
				<div
					v-for="(color, j) in swatchline"
					:key="j"
				>
					<div
						:class="`color-picker__swatch--${color.replace('$', '')}`"
						@click="SwatchSelection(color)"
					>
						<cds-icon
							v-if="isCurrentColorSelected(color)"
							height="22"
							width="22"
							name="check-outline"
							class="swatch__icon"
							:class="iconColorResolver"
						/>
					</div>
				</div>
			</div>
		</cds-popover>
	</div>
</template>

<script>
import CdsPopover from './Popover.vue';
import CdsIcon from './Icon.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
import ContrastChecker from '../utils/methods/contrastChecker';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

export default {
	components: {
		CdsPopover,
		CdsIcon,
	},

	props: {
		/**
		* Saves the selected color in the Color Picker.
		*/
		modelValue: {
			type: String,
			required: true,
		},
		/**
		 * Specifies the ColorPicker label.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		* When true, it starts showing the color options outside the popover.
		*/
		inline: {
			type: Boolean,
			default: false,
		},
		/**
		* Specifies the height of the popover. ⚠️ When the inline prop is active, this prop has no effect.
		*/
		popoverHeight: {
			type: Number,
			default: 190,
		},
		/**
		* Set of colors to be rendered in ColorPicker. The prop expects an Array of Array of color tokens. E.g.: $gp-400
		*/
		swatch: {
			type: Array,
			default: () => ([]),
		},
	},

	data() {
		return {
			selectedColor: this.modelValue,
			sassColorVariables,
			showPopover: false,
		};
	},

	computed: {
		iconColorResolver() {
			return this.ContrastChecker(this.selectedColor, '#FFFFFF', 'POOR') 
				? 'swatch__icon--white'
				: 'swatch__icon--black';
		},

		palete() {
			return this.paleteBuilder(this.sassColorVariables.palete);
		},
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.selectedColor = newValue;
				}
			},
			immediate: true,
		},
	},

	methods:{
		paleteBuilder,
		ContrastChecker,

		SwatchSelection(color) {
			let selectedVariant = '';

			this.selectedColor = this.sassColorVariables[color.replace(/-|\$/gi, '')];
			this.palete.forEach(paleteColor => {
				if (paleteColor.colorTokens.find(token => token === color)) {
					selectedVariant = paleteColor.variantName.toLowerCase();
				}
			});

			/**
			 * **Implements v-model**. Event used to emit the selected *color*. The color is output as a string in HEX format.
			 * @event update:modelValue
			 * @type {Event}
			*/
			this.$emit('update:modelValue', this.selectedColor);
			/**
			 * Event used to emit the *variant* of the selected color. The variant is output as a string. ⚠️ Important: the issued variant will only change if the color changes. Changing the shade within the same color does not change the variant. E.g.: $gp-400 and $gp-600 will emit the same variant, namely "green".
			 * @event update:colorVariant
			 * @type {Event}
			*/
			this.$emit('variant-chosen', selectedVariant);
		},

		isCurrentColorSelected(color) {
			return this.selectedColor === this.sassColorVariables[color.replace(/-|\$/gi, '')];
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.color-picker {
	&__container {
		display: flex;
	}

	&__label {
		margin: mb(1);
		@include label;
	}

	&__swatch {
		@include paleteResolver using ($color) {
			background-color: $color;
			height: 24px;
			width: 24px;
			border-radius: 4px;
			margin: mTRBL(1, 1, 0, 0);
			padding-top: 2px;
			padding-left: 1px;
			cursor: pointer;
			transition: $interaction;

			&:hover {
				transform: scale(1.1);
				transition: $interaction;
			}
		}
	}

	&__trigger {
		padding: pa(1);
		outline: 1px solid $n-50;
		width: fit-content;
		border-radius: $border-radius-lil;
		transition: $hover;
		cursor: pointer;

		&:hover {
			outline: 1px solid $n-200;
			transition: $hover;
		}
	}

	&__preview {
		height: 24px;
		width: 24px;
		border-radius: 4px;
		background-color: v-bind(selectedColor);
	}
}

.swatch {
	&__icon {
		&--white {
			color: $n-0;
		}

		&--black {
			color: $n-900;
		}
	}
}

.popover__container {
	display: flex;
}
</style>
