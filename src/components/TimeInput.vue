<template>
	<div>
		<label
			class="input__label"
		>
			<div
				class="label__content"
				:for="id"
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
			</div>
		</label>
		<div
			:id="id"
			class="input__container"
		>
			<div>
				<input
					:id="`${id}-start-hour`"
					v-model="startHour"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="23"
					step="1"
					placeholder="00"
					@keyup.up="startHour++"
					@keyup.down="startHour > 0 ? startHour-- : null"
					@input="handleTimeInput"
				>
				:
				<input
					:id="`${id}-start-minute`"
					v-model="startMinute"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="59"
					step="1"
					placeholder="00"
					@keyup.up="startMinute++"
					@keyup.down="startMinute > 0 ? startMinute-- : null"
					@input="handleTimeInput"
				>
			</div>
			<div
				v-if="mode === 'range'"
				class="input__separator"
			>
				Até
			</div>
			<div v-if="mode === 'range'">
				<input
					:id="`${id}-end-hour`"
					v-model="endHour"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="23"
					step="1"
					placeholder="00"
					@keyup.up="endHour++"
					@keyup.down="endHour > 0 ? endHour-- : null"
					@input="handleTimeInput"
				>
				:
				<input
					:id="`${id}-end-minute`"
					v-model="endMinute"
					v-facade="'##'"
					:class="computedInputClass"
					:disabled="disabled"
					type="text"
					min="0"
					max="59"
					step="1"
					placeholder="00"
					@keyup.up="endMinute++"
					@keyup.down="endMinute > 0 ? endMinute-- : null"
					@input="handleTimeInput"
				>
			</div>
		</div>
		<div
			v-if="state === 'invalid' && !disabled"
			class="input__message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { facade } from 'vue-input-facade';
import { Interval, DateTime } from 'luxon';
import { hourFormat, isAfter } from '../utils/validators/time';

const valueValidator = (value) => {
	if (value === '' || value === []) {
		return true;
	}

	if (typeof value === 'string') {
		return hourFormat(value);
	}

	return value.length === 2
		&& isAfter(value[1], value[0]);
};

export default {
	directives: {
		facade,
	},

	props: {
		/**
		* Prop used as v-model. Sets the displayed time.
		*
		* `single` mode: Must be sent as a String containing the time.
		*
		* `range` mode: Must be sent as an Array containing two times (start and end).
		*
		* Can be sent as an empty Array or empty String.
		*
		* All times must be in the format `HH:mm`.
		*
		*/
		modelValue: {
			type: [String, Array],
			default: '',
			validator: valueValidator,
		},
		/**
		 * The id to be used by the HTML element.
		 */
		id: {
			type: String,
			default: 'time-input',
		},
		/**
		 * The label to be displayed above the input.
		 */
		label: {
			type: String,
			required: true,
		},
		/**
		 * Property used to define the component label style.
		 * If yes, display a * indicating that the field is mandatory.
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Property used to set the component to be disabled
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Property used to define the component's display mode.
		 *
		 * `single`: Just one time input;
		 *
		 * `range`: Two time inputs (start and end).
		 */
		mode: {
			type: String,
			default: 'single',
			validator: (value) => ['single', 'range'].includes(value),
		},
		/**
		 * Property used to indicate the validation status of the component.
		 */
		state: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'valid', 'invalid'].includes(value),
		},
		/**
		 * Message to be displayed in case of invalid status.
		 */
		errorMessage: {
			type: String,
			default: 'Invalid time',
		},
	},

	data() {
		return {
			startHour: '',
			startMinute: '',
			endHour: '',
			endMinute: '',
		};
	},

	computed: {
		computedInputClass() {
			if (this.disabled) {
				return 'input__time--disabled';
			}

			switch (this.state) {
				case 'valid':
					return 'input__time--valid';
				case 'invalid':
					return 'input__time--invalid';
				default:
					return 'input__time';
			}
		},
	},

	watch: {
		modelValue(newValue, oldValue) {
			if (newValue === oldValue || newValue == null) {
				return;
			}

			this.buildTimeElements(newValue);
		},
	},

	mounted() {
		this.buildTimeElements(this.modelValue);
	},

	methods: {
		handleTimeInput() {
			this.startHour = this.startHour ? this.resolveTimeElement(this.startHour, 23) : '';
			this.startMinute = this.startMinute ? this.resolveTimeElement(this.startMinute, 59) : '';
			this.endHour = this.endHour ? this.resolveTimeElement(this.endHour, 23) : '';
			this.endMinute = this.endMinute ? this.resolveTimeElement(this.endMinute, 59) : '';

			if (
				!(this.startHour && this.startMinute)
				|| (this.range && !(this.endHour && this.endMinute))
			) {
				this.$emit('update:modelValue', null);
				return;
			}

			if (this.mode === 'range') {
				this.resolveRangeInterval();
				return;
			}

			/**
			* Event indicating that the input has been filled.
			* Returns a string with the time, if the component is in `single` mode,
			* or an array containing start and end times, when in `range` mode.
			*
			* If the field value is invalid, the event is emitted with a `null` value,
			* take this into account in possible formatting.
			*
			* Dates are always returned in the format `HH:mm`.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', `${this.startHour}:${this.startMinute}`);
		},

		resolveRangeInterval() {
			const interval = Interval.fromDateTimes(
				DateTime.fromFormat(`${this.startHour}:${this.startMinute}`, 'HH:mm'),
				DateTime.fromFormat(`${this.endHour}:${this.endMinute}`, 'HH:mm'),
			);

			if (interval.invalid) {
				this.$emit('update:modelValue', null);
				return;
			}

			this.$emit('update:modelValue', [
				interval.start.toFormat('HH:mm'),
				interval.end.toFormat('HH:mm'),
			]);
		},

		formatTimeElement(element) {
			return parseInt(element, 10).toLocaleString(undefined, {
				minimumIntegerDigits: 2,
				maximumFractionDigits: 0,
			});
		},

		resolveTimeElement(element, maxValue) {
			const internalElement = this.formatTimeElement(element);

			if (internalElement > maxValue) {
				return maxValue;
			}

			if (internalElement < 0) {
				return '00';
			}

			return internalElement;
		},

		buildTimeElements(time) {
			if (this.mode === 'single') {
				if (typeof time !== 'string') {
					return;
				}

				[this.startHour, this.startMinute] = time.split(':');
				return;
			}

			if (typeof time === 'string') {
				this.startHour = '';
				this.startMinute = '';
				this.endHour = '';
				this.endMinute = '';

				return;
			}

			[this.startHour, this.startMinute] = time[0].split(':');
			[this.endHour, this.endMinute] = time[1].split(':');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__content {
		margin: mb(1);
	}
}

.input {
	&__container {
		color: $n-400;
		display: flex;
		align-items: center;
	}

	&__separator {
		@include caption;
		margin: mx(3);
		color: $n-600;
	}

	&__time {
		@include caption;
		border: 1px solid $n-50;
		border-radius: $border-radius-lil;
		width: 36px;
		height: 40px;
		text-align: center;
		color: $n-600;

		&::placeholder {
			color: $n-200;
		}

		&:focus-visible {
			outline-color: $bn-300;
		}

		&--disabled {
			@extend .input__time;
			background-color: $n-20 !important;
			pointer-events: none;
		}

		&--valid {
			@extend .input__time;
			border: 1px solid $gp-500;

			&:focus-visible {
				outline-color: $gp-500;
			}
		}

		&--invalid {
			@extend .input__time;
			border: 1px solid $rc-500;

			&:focus-visible {
				outline-color: $rc-500;
			}
		}
	}

	&__label {
		@include label;
		display: flex;
	}

	&__message {
		@include caption;
		color: $rc-500;
		margin: mt(2);
	}
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type=number] {
	-moz-appearance: textfield;
}
</style>
