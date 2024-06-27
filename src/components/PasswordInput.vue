<template>
	<div>
		<span>
			<span v-if="hasSlots">
				<slot name="label" />
			</span>
			<label
				v-else
				:class="labelDynamicClass"
			>
				<div
					class="password-input__label__content"
					for="rds-password-input"
				>
					<span>{{ label }}</span>

					<span
						v-if="required"
						class="password-input__label__required-indicator"
					>
						*
					</span>
					<rds-icon
						v-if="tooltip"
						v-rdstip="tooltip"
						:name="tooltipIcon"
						height="20"
						width="20"
						class="password-input__label__icon"
					/>
				</div>
			</label>
		</span>
		<div :class="stepperInputDynamicClass">
			<input
				id="rds-password-input"
				v-model="internalValue"
				:type="customInputType"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			>
			<div
				v-if="!disableTextPasswordInput"
				class="password-input__password-toogle"
			>
				<rds-clickable
					id="rds-clickable"
					clickable
					@click="handleShowPassword"
				>
					{{ customTextPasswordInput }}
				</rds-clickable>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="password-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import RdsIcon from './Icon.vue';
import Rdstip from '../utils/directives/rdstip';

export default {
	directives: {
		rdstip: Rdstip,
	},

	components: {
		RdsIcon
	},

	props: {
		/**
		* Prop used as v-model.
		*/
		modelValue: {
			type: String,
			default: '',
		},
		/**
		 * Specifies the input label.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		 * Disables the input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the state of the PasswordInput. The options are 'default', 'valid' and 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
		/**
		 * Displays asterisk for mandatory field (note: does not validate).
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the input placeholder.
		 */
		placeholder: {
			type: String,
			default: 'Enter information here',
		},
		/**
		 * Specifies the error message, which will be displayed if the state is invalid.
		 */
		errorMessage: {
			type: String,
			default: 'Invalid value',
		},
		/**
		 * Specifies whether the width of the PasswordInput should be fluid.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Defines input tooltip display and text
		 */
		tooltip: {
			type: String,
			default: null,
		},
		/**
		 * Specifies TextInput tooltip icon.
		 */
		tooltipIcon: {
			type: String,
			default: 'info-outline',
		},
		/**
		 * Defines the input type, if true it will be an input adapter for the mobile
		 */
		mobile: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalValue: '',
			isBeingFocused: false,
			showPassword: false,
		};
	},

	computed: {
		customInputType() {
			return this.showPassword ? 'text' : 'password';
		},

		customTextPasswordInput() {
			return this.showPassword ? 'Hide' : 'Show';
		},

		disableTextPasswordInput() {
			return this.internalValue.length < 1 || this.disabled;
		},

		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'password-input--fluid' : 'password-input';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' password-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' password-input--invalid';
					}
				} else {
					stepperInputClass += ' password-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' password-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' password-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' password-input--focused-invalid';
				}
			}

			return stepperInputClass;
		},

		labelDynamicClass() {
			const labelType = this.mobile ? 'mobile-label' : 'label';

			return this.fluid ? `password-input__${labelType}--fluid` : `password-input__${labelType}`;
		},

		inputClass() {
			const inputType = this.mobile ? 'mobile-field' : 'field';
			
			return this.fluid ? `password-input__${inputType}--fluid` : `password-input__${inputType}`;
		},

		errorState() {
			return this.state === 'invalid';
		},
		
		resolveInputWidth() {
			return this.mobile ? '300px' : '266px';
		},
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.internalValue = newValue;
				}
			},

			immediate: true,
		},

		internalValue(value) {
			/**
			 * Event used to implement the v-model.
			 * @event input
			 * @type {Event}
			 */
			this.$emit('update:modelValue', value);
		},
	},

	methods: {
		handleShowPassword() {
			this.showPassword = !this.showPassword;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.password-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: v-bind(resolveInputWidth);

	&--fluid {
		@extend .password-input;
		width: 100%;
	}

	&__label {
		@include label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: v-bind(resolveInputWidth);

		&--fluid {
			@extend .password-input__label;
			width: 100%;
		}

		&__required-indicator {
			color: $rc-600;
		}

		&__content {
			margin: mb(1);
		}

		&__icon {
			margin: mTRBL(0, 0, n1, 1);
			cursor: pointer;
		}
	}

	&__mobile-label {
		@extend .password-input__label;
		font-size: 14px;
		font-weight: 700;
		&--fluid {
			@extend .password-input__mobile-label;
			width: 100%;
		}
	}

	&__field {
		padding: pa(3);
		margin: mr(2);
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .password-input__field;
			width: 100%;
		}
	}

	&__mobile-field {
		@extend .password-input__field;
		@include body-2;
		font-weight: 400;
		height: 48px !important;
		border-radius: $border-radius-lil;
		&--fluid {
			@extend .password-input__mobile-field;
			width: 100%;
		}
	}

	&__password-toogle {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: $n-600;
		padding: pr(4);
		@include caption;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}

	&--focused {
		@extend .password-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .password-input;
		outline: 1px solid $gp-500;
	}

	&--invalid {
		@extend .password-input;
		outline: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .password-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .password-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}
}

input:disabled {
	background: none !important;
}
</style>
