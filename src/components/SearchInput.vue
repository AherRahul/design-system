<template>
	<div>
		<div :class="stepperInputDynamicClass">
			<rds-icon
				name="search-outline"
				class="search-input__search-icon"
			/>

			<input
				id="rds-search-input"
				:value="modelValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
				@input="handleInput"
			>

			<!-- <rds-link-button
				v-if="internalValue"
				variant="blue"
				@click="internalValue = ''"
			>
				To clean
			</rds-link-button> -->

			<rds-icon
				v-if="modelValue"
				name="x-outline"
				width="18"
				height="18"
				class="search-input__close-icon"
				@click="internalValue = ''"
			/>

			<!-- <div class="search-input__icon-container">
				<check-icon
					v-if="validState && !disabled"
					size="1x"
					class="search-input__icon--check-icon"
				/>
				<alert-circle-icon
					v-if="errorState && !disabled"
					size="1x"
					class="search-input__icon--alert-circle-icon"
				/>
				<rds-spinner
					v-if="loadingState && !disabled"
					size="sm"
					variant="blue"
					class="search-input__icon--spinner-icon"
				/>
			</div> -->
		</div>
		<!-- <div
			v-if="errorState && !disabled"
			class="search-input__error-message"
		>
			{{ errorMessage }}
		</div> -->
	</div>
</template>

<script>
import RdsIcon from './Icon.vue';
import RdsLinkButton from './FlatButton.vue';

export default {
	components: {
		RdsIcon,
		RdsLinkButton,
	},

	props: {
		/**
		* Prop used as v-model.
		*/
		modelValue: {
			type: [String, Number],
			default: '',
		},
		/**
		 * Disables input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the input placeholder
		 */
		placeholder: {
			type: String,
			default: 'Search...',
		},
		/**
		 * Specifies whether the TextInput width should be fluid.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	data() {
		return {
			internalValue: '',
			isBeingFocused: false,
		};
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'search-input--fluid' : 'search-input';
			return stepperInputClass.concat(' ', this.disabled ? 'search-input--disabled' : '');

			// if (!this.isBeingFocused) {
			// 	if (!this.disabled) {
			// 		if (this.state === 'valid') {
			// 			stepperInputClass += ' search-input--valid';
			// 		} else if (this.state === 'invalid') {
			// 			stepperInputClass += ' search-input--invalid';
			// 		}
			// 	} else {
			// 		stepperInputClass += ' search-input--disabled';
			// 	}
			// } else if (!this.disabled) {
			// 	if (this.state === 'default') {
			// 		stepperInputClass += ' search-input--focused';
			// 	} else if (this.state === 'valid') {
			// 		stepperInputClass += ' search-input--focused-valid';
			// 	} else if (this.state === 'invalid') {
			// 		stepperInputClass += ' search-input--focused-invalid';
			// 	} else if (this.state === 'loading') {
			// 		stepperInputClass += ' search-input--focused-loading';
			// 	}
			// }
		},

		// loadingState(){
		// 	return this.state === 'loading';
		// },

		inputClass() {
			return this.fluid ? 'search-input__field--fluid' : 'search-input__field';
		},
	},

	methods: {
		handleInput(e) {
			/**
			* Event used to implement the v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', e.target.value);
		}
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.search-input {
	display: flex;
	align-items: center;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: fit-content;
	width: -moz-fit-content;
	margin: mt(2);

	&--fluid {
		@extend .search-input;
		width: 100%;
	}

	&__search-icon {
		color: $n-300;
		padding: pl(3);
	}

	&__close-icon {
		color: $n-300;
		padding: pr(3);
		cursor: pointer;
	}

	&__close-icon:hover {
		color: $n-400;
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;
		display: flex;
		align-items: flex-end;
	}

	&__icon {
		margin: ml(1);
		cursor: pointer;
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
		padding: pTRBL(3, 3, 3, 2);
		margin: mr(2);
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;
		box-sizing: border-box;

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .search-input__field;
			width: 100%;
		}
	}

	&--focused {
		@extend .search-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}

	&__icon--spinner-icon {
		padding: 0px;
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

input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	color: $n-400;
	opacity: 1; /* Firefox */
}

input:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color: $n-400;
}

input::-ms-input-placeholder { /* Microsoft Edge */
	color: $n-400;
}
</style>
