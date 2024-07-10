<template>
	<div>
		<span>
			<span
				v-if="hasSlots"
			>
				<slot name="label" />
			</span>

			<label
				v-else
				:class="labelDynamicClass"
			>
				<div
					class="label__content"
					for="rds-text-input"
				>
					<span>
						{{ label }}
					</span>

					<span
						v-if="required"
						class="label__required-indicator"
					>
						*
					</span>

					<rds-icon
						v-if="tooltip"
						v-rdstip="tooltip"
						:name="tooltipIcon"
						height="20"
						width="20"
						class="label__icon"
					/>
				</div>

				<rds-link
					v-if="linkTextState"
					class="label__link"
					:href="linkUrl"
					:text="linkText"
					new-tab
				/>
			</label>

		</span>

		<div :class="stepperInputDynamicClass">
			<input
				v-if="mask"
				id="rds-text-input"
				v-model="internalValue"
				v-facade="mask"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				:type="inputType"
				@focus="handleFocus"
				@blur="handleBlur"
			>

			<input
				v-else
				id="rds-text-input"
				v-model="internalValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				:type="inputType"
				@focus="handleFocus"
				@blur="handleBlur"
			>

			<div
				v-if="state !== 'default'"
				class="text-input__icon-container"
			>
				<rds-icon
					v-if="validState && !disabled"
					height="20"
					width="20"
					name="check-outline"
					class="text-input__icon--check-icon"
				/>

				<rds-icon
					v-if="errorState && !disabled"
					height="20"
					width="20"
					name="alert-outline"
					class="text-input__icon--alert-circle-icon"
				/>

				<rds-spinner
					v-if="loadingState && !disabled"
					size="sm"
					variant="blue"
					class="text-input__icon--spinner-icon"
				/>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="text-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { facade } from 'vue-input-facade';
import RdsLink from './Link.vue';
import RdsIcon from './Icon.vue';
import RdsSpinner from './Spinner.vue';
import Rdstip from '../utils/directives/rdstip';

export default {
	directives: {
		rdstip: Rdstip,
		facade,
	},

	components: {
		RdsLink,
		RdsIcon,
		RdsSpinner,
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
		 * Disables input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the state of the TextInput. The options are 'default', 'valid', 'loading' and 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
		/**
		 * Specifies the type of TextInput. The options are 'text' and 'email'.
		 */
		inputType: {
			type: String,
			default: 'text',
			validator: (value) => ['text', 'email'].includes(value),
		},
		/**
		 * Displays mandatory asterisk (note: does not validate)
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the input placeholder
		 */
		placeholder: {
			type: String,
			default: 'Enter information here',
		},
		/**
		 * Specifies the error message, which will be displayed if the status is invalid
		 */
		errorMessage: {
			type: String,
			default: 'Invalid value',
		},
		/**
		 * Specifies whether the TextInput width should be fluid.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Specifies the mask to be applied to the TextInput.
		 * Example: "(##) #####-####"
		 */
		mask: {
			type: [String, Array],
			default: null,
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
		 * Defines input link text (located to the right of the label).
		 */
		linkText: {
			type: String,
			default: null,
		},
		/**
		 * Defines the url to be accessed when clicking the link (if the link is displayed).
		 */
		linkUrl: {
			type: String,
			default: 'https://rds-design-system.netlify.app/',
		},
		/**
		 * Defines the use of lazy for debouncer.
		 */
		lazy: {
			type: Boolean,
			default: false,
		},
		/**
		 * Defines the input type, if true it will be an input adapted for the mobile
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
			timeout: null,
		};
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'text-input--fluid' : 'text-input';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' text-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' text-input--invalid';
					}
				} else {
					stepperInputClass += ' text-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' text-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' text-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' text-input--focused-invalid';
				} else if (this.state === 'loading') {
					stepperInputClass += ' text-input--focused-loading';
				}
			}

			return stepperInputClass;
		},

		labelDynamicClass() {
			const labelType = this.mobile ? 'mobile-label' : 'label';
			return this.fluid ? `text-input__${labelType}--fluid` : `text-input__${labelType}`;
		},

		validState() {
			return this.state === 'valid';
		},

		errorState() {
			return this.state === 'invalid';
		},

		loadingState(){
			return this.state === 'loading';
		},

		inputClass() {
			const inputType = this.mobile ? 'mobile-field' : 'field';
			return this.fluid ? `text-input__${inputType}--fluid` : `text-input__${inputType}`;
		},

		linkTextState() {
			return this.linkText ? true : false;
		}
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

			if (this.lazy) {
				this.emitLazy(value)
			} else {
				this.$emit('update:modelValue', value);
			} 
		},
	},

	methods: {
		/**
		 * Allows the event to be emitted only when there is no typing for 1 second.
		 */
		emitLazy(value) {
			clearTimeout(this.timeout);

			const that = this;

			this.timeout = setTimeout(function () {
				that.$emit('update:modelValue', value);
			}, 1000);
		},

		handleBlur() {
			this.isBeingFocused = false;
			this.$emit('blur', true);
		},

		handleFocus() {
			this.isBeingFocused = true;
			this.$emit('focus', true);
		},
	}
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.text-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: 266px;

	&--fluid {
		@extend .text-input;
		width: 100%;
	}

	&__label {
		@include label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .text-input__label;
			width: 100%;
		}
	}

	&__mobile-label {
		@extend .text-input__label;
		font-size: 14px;
		font-weight: 700;
		&--fluid {
			@extend .text-input__mobile-label;
			width: 100%;
		}
	}


	&__icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: mr(3);
		min-width: 15px;
	}

	&__field {
		padding: pa(3);
		margin: mr(2);
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;
		width: 100%;

		&::placeholder {
			color: $n-300;
		}

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .text-input__field;
			width: 100%;
		}
	}

	&__mobile-field {
		@extend .text-input__field;
		@include body-2;
		font-weight: 400;
		height: 48px !important;
		border-radius: $border-radius-lil;
		&--fluid {
			@extend .text-input__mobile-field;
			width: 100%;
		}
	}

	&--focused {
		@extend .text-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .text-input;
		outline: 1px solid $gp-500;
	}

	&--invalid {
		@extend .text-input;
		outline: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .text-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .text-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}

	&__icon--check-icon {
		color: $gp-500;
		height: 50%;
	}

	&__icon--alert-circle-icon {
		color: $rc-600;
		height: 50%;
	}

	&__icon--spinner-icon {
		padding: 0px;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__icon {
		margin: mTRBL(0, 0, n1, 1);
		cursor: pointer;
	}

	&__link {
		justify-self: end;
	}

	&__content {
		margin: mb(1);
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: ma(0);
}

input:disabled {
	background: none !important;
}
</style>
