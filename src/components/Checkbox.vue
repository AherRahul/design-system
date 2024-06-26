<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="rds-checkbox__container"
	>
		<div
			class="rds-checkbox__input"
		>
			<input
				:id="$attrs.id || 'rds-checkbox-option-input'"
				:value="modelValue"
				type="checkbox"
				:name="$attrs.name || 'rds-checkbox-option'"
				:disabled="disabled"
			>

			<label
				:for="$attrs.id || 'rds-checkbox-option-input'"
				:class="resolveCheckboxClass"
				@click="toggleValue"
			/>
		</div>

		<label
			class="rds-checkbox__label"
			:class="{
				'rds-checkbox__label--disabled': disabled,
				'rds-checkbox__label--prominent': prominent && modelValue,
			}"
			:for="$attrs.id || 'rds-checkbox-option-input'"
			@click="toggleValue"
		>
			{{ label }}
		</label>
	</div>
</template>

<script>
import variantClassResolver from '../utils/methods/variantClassResolver';

export default {
	props: {
		/**
		* The prop used as a v-model to monitor Checkbox selection
		*/
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		* Displays the checkbox label
		*/
		label: {
			type: String,
			default: 'checkbox content',
		},
		/**
		* The Checkbox variant. There are 10 variants: 'teal', 'green', 'blue',
		* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' and 'dark'.
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Prop used to visually indicate whether the checkbox is in the indeterminate state. Two-way binding active with `v-model:indeterminate`
		*/
		indeterminate: {
			type: Boolean,
			default: false,
		},
		/**
		* Visually highlights the label
		*/
		prominent: {
			type: Boolean,
			default: false,
		},
		/**
		* Controls the status box
		*/
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isChecked: this.modelValue,
			isIndeterminate: this.indeterminate,
		};
	},

	computed: {
		resolveCheckboxClass() {
			const disabledClass = this.disabled ? 'rds-checkbox__input--disabled' : '';
			const variantClass = variantClassResolver('rds-checkbox__input', this.variant);
			let checkedClass = this.isChecked
				? `rds-checkbox__input--checked`
				: 'rds-checkbox__input--unchecked';
			checkedClass = this.isIndeterminate ? 'rds-checkbox__input--indeterminate' : checkedClass;

			return `${variantClass} ${checkedClass} ${disabledClass}`;
		}
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}
				
				this.isChecked = this.modelValue;
			},
			immediate: true,
		},

		indeterminate: {
			handler(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}
				
				this.isIndeterminate = this.indeterminate;
			},
			immediate: true,
		},
	},

	methods: {
		toggleValue() {
			if (this.disabled) return;
			this.isChecked = this.isIndeterminate ? false : !this.isChecked;
			this.isIndeterminate = false;
			/**
			* Event used to implement the v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', this.isChecked);

			/**
			* Event used to implement the modelValue with the "Indeterminate" prop.
			* @event update:indeterminate
			* @type {Event}
			*/
			this.$emit('update:indeterminate', false);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.rds-checkbox__container {
	display: flex;
	align-items: center;
	gap: spacer(2);

	input[type=checkbox] {
		visibility: hidden;
		margin-top: spacer(n8);
		position: absolute;
	}

	.rds-checkbox__input {
		position: relative;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color !important;
		}

		label {
			cursor: pointer;
			display: block;
			width: 16px;
			height: 16px;
			border-radius: $border-radius-button;
		}

		&--checked {
			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 5px;
				width: 8px;
				left: 4px;
				opacity: 0;
				position: absolute;
				top: 5px;
				transform: rotate(-45deg);
				border-radius: 0.4px;
				opacity: 1;
			}
		}

		&--indeterminate {
			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				border-left: none;
				content: "";
				height: 5px;
				width: 8px;
				left: 4px;
				opacity: 0;
				position: absolute;
				top: 5px;
				border-radius: 1px;
				opacity: 1;
			}
		}

		&--disabled {
			background-color: $n-100 !important;
			border: none !important;
			cursor: default !important;
		}

		&--disabled:not(.rds-checkbox__input--checked) {
			background-color: $n-20 !important;
			border: 1px solid $n-200 !important;
			cursor: default !important;
		}

		&--unchecked {
			background-color: $n-0 !important;
			border: 1px solid $n-400 !important;
		}

	}

	.rds-checkbox__label {
		@include body-2;
		cursor: pointer;
		color: $n-700;

		&--disabled {
			@extend .rds-checkbox__label;
			color: $n-400;
			cursor: default !important;
		}

		&--prominent {
			font-weight: $font-weight-semibold;
			color: $n-800;
		}
	}
}
</style>
