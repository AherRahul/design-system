<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span class="cds-radio__container">
		<!--
			Event emitted when Radio changes its state.
			@event change
			@type {Event}
		-->
		<input
			:id="`${uniqueId}-${value}`"
			type="radio"
			class="cds-radio"
			:class="`cds-radio--${variant}`"
			:value="value"
			:disabled="disabled"
			:name="$attrs.name"
			:checked="isChecked"
			@change="$emit('update:modelValue', $event.target.value)"
		>

		<label
			class="cds-radio__label"
			:for="`${uniqueId}-${value}`"
		>
			<!-- @slot Standard slot for rendering custom label content -->
			<slot>
				<span
					class="cds-radio__label-text"
					:disabled="disabled"
				>
					{{ label }}
				</span>
			</slot>
		</label>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * The prop used as a v-model to monitor Radio selection
		*/
		modelValue: {
			default: null,
			required: true,
		},
		/**
		 * The prop used as the value associated with Radio. What will be assigned
		 * v-model when this option is selected
		*/
		value: {
			default: null,
			required: true,
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
		 * Defines the input label, the content that is displayed to describe the Radio
		 */
		label: {
			type: String,
			default: 'radio content',
		},
		/**
		 * Control Radio status
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			uniqueId: Math.random(),
		};
	},

	computed: {
		isChecked() {
			return this.modelValue === this.value;
		},

		cursorType() {
			return this.disabled ? 'default' : 'pointer';
		}
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.cds-radio__container {
	display: flex;
	align-items: flex-start;
}

.cds-radio__label {
	cursor: v-bind(cursorType);
	@include body-2;
	margin: ml(2);
}

.cds-radio {
	cursor: v-bind(cursorType);
	-webkit-appearance: none;
	appearance: none;
	margin: 0;
	font: inherit;
	width: 16px;
	height: 16px;
	border: 1px solid $n-400;
	border-radius: 50%;
	margin-top: 1.4px;
	display: grid;
	place-content: center;

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		&:checked {
			border: 1px solid $base-color;
		}

		&::before {
			content: "";
			width: 8px;
			height: 8px;
			border-radius: 50%;
			transform: scale(0);
			transition: 120ms transform ease-in-out;
			background: $base-color;
		}

		&[disabled][checked] {
			background: $shade-200;
			border: 1px solid $shade-200;
		}

		&[disabled]:not(checked) {
			background: $n-20;
			border: 1px solid $n-100;
		}
	}

	&:checked::before {
		transform: scale(1);
	}
}
</style>
