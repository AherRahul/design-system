<template>
	<div
		class="inline-date-input__container"
		:class="dateInputClassContainer"
	>
		<span>
			<span
				v-if="hasSlots"
			>
				<!-- @slot Slot for custom label rendering. -->
				<slot name="label" />
			</span>

			<label
				v-else
				class="inline-date-input__label"
			>
				<div
					class="label__content"
					for="rds-text-input"
				>
					<span>
						{{ capitalizedLabel }}:
					</span>
				</div>
			</label>
		</span>

		<v-date-picker
			id="rds--inline-date-input"
			v-model="internalDate"
			locale="pt-BR"
			:min-date="minDate ? new Date(minDate) : null"
			:max-date="maxDate ? new Date(maxDate) : null"
			:attributes="showTodayDot ? attributes: {}"
			:color="variant"
			:is-range="range"
			@update:model-value="handleUpdateInput"
		>
			<template #header-left-button="{ page }">
				<rds-chevron
					direction="left"
					@click="page.movePrevMonth()"
				/>
			</template>
			<template #header-right-button="{ page }">
				<rds-chevron
					direction="right"
					@click="page.moveNextMonth()"
				/>
			</template>

			<template #default="{ inputValue, togglePopover, inputEvents }">
				<div
					:class="inputClass"
				>
					<input
						:value="resolveInputValue(inputValue)"
						:disabled="disabled"
						:placeholder="placeholder"
						type="text"
						v-on="inputEvents"
						@click="togglePopover"
						@focus="isBeingFocused = true"
						@blur="isBeingFocused = false"
					>
					<div class="inline-date-input__icon">
						<rds-icon
							height="20"
							width="20"
							name="calendar-outline"
						/>
					</div>
				</div>
			</template>
		</v-date-picker>
	</div>
</template>

<script>
import { DateTime } from 'luxon';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { isEmpty } from 'lodash';
import RdsChevron from './Chevron.vue';
import RdsIcon from './Icon.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';
const dateStringValidator = (value) => /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
export default {
	components: {
		VDatePicker: DatePicker,
		RdsChevron,
		RdsIcon,
	},
	props: {
		/**
		* Prop used as v-model. Must be a string in the format `yyyy-MM-dd`
		* or an object with the `start` and `end` properties, in the same format.
		*/
		modelValue: {
			type: [String, Object],
			default: '',
			validator: (value) => value === '' || typeof value === 'object' || dateStringValidator(value),
		},
		/**
		* Specifies the input label.
		*/
		label: {
			type: String,
			default: 'Date',
		},
		/**
		* Disables input.
		*/
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		* Controls the input mode.
		*/
		range: {
			type: Boolean,
			default: false,
		},
		/**
		* Specifies whether the width of the DateInput should be fluid.
		*/
		fluid: {
			type: Boolean,
			default: false,
		},
		/**
		* The minimum date selectable in DateInput. It must be a string in the format `yyyy-MM-dd`.
		*/
		minDate: {
			type: String,
			default: '',
			validator: (value) => value === '' || dateStringValidator(value),
		},
		/**
		* The maximum date selectable in DateInput. It must be a string in the format `yyyy-MM-dd`.
		*/
		maxDate: {
			type: String,
			default: '',
			validator: (value) => value === '' || dateStringValidator(value),
		},
		/**
		* Placeholder text for DateInput.
		*/
		placeholder: {
			type: String,
			default: 'Select a date',
		},
		/**
		* Controls the marking of the current day on the calendar.
		*/
		showTodayDot: {
			type: Boolean,
			default: false,
		},
		/**
		* The color variant. There are 9 variants implemented: 'green', 'teal',
		* 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' and 'amber'.
		*/
		variant: {
			type: String,
			default: 'green',
		},
	},
	data() {
		return {
			sassColorVariables,
			internalDate: DateTime.now(),
			isBeingFocused: false,
			inputControl: 0,
			attributes: [
				{
					dates: new Date(),
					dot: true,
				},
			],
			variantColorData: {},
		};
	},
	computed: {
		errorState() {
			return this.state === 'invalid';
		},
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},
		capitalizedLabel() {
			return this.label.charAt(0).toUpperCase() + this.label.slice(1);
		},
		dateInputClassContainer() {
			let returningClass = '';
			if (this.disabled) {
				return this.fluid
					? 'inline-date-input--disabled inline-date-input--fluid'
					: 'inline-date-input--disabled';
			}
			returningClass += this.fluid ? ' date-input--fluid' : ' date-input';
			return returningClass;
		},
		inputClass() {
			let returningClass = '';
			if (this.disabled) {
				return this.fluid
					? 'date-input--disabled date-input--fluid'
					: 'date-input--disabled';
			}
			returningClass += this.fluid ? ' date-input--fluid' : ' date-input';
			return returningClass;
		},
		inlineCalendarDotColor() {
			return this.variantColorData.colorData[4].shade;
		},
		inlineCalendarTextColor() {
			return this.variantColorData.colorData[7].shade;
		},
		inlineCalendarTrailColor() {
			return this.variantColorData.colorData[1].shade;
		},
	},
	watch: {
		modelValue(newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}
			this.resolveInternalDate();
		},
		variant(newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}
			this.updateColorData();
		},
	},
	created() {
		this.updateColorData();
	},
	mounted() {
		this.resolveInternalDate();
	},
	methods: {
		paleteBuilder,
		updateColorData() {
			this.variantColorData = this.paleteBuilder(sassColorVariables.palete).find((item) => item.variantName.toLowerCase() === this.variant);
		},
		handleUpdateInput(date) {
			if (this.range) {
				this.$emit(
					'update:modelValue',
					date.start && date.end
						? {
							start: DateTime.fromJSDate(date.start).toFormat('yyyy-MM-dd'),
							end: DateTime.fromJSDate(date.end).toFormat('yyyy-MM-dd'),
						}
						: ''
				);
				return;
			}
			/**
			* Event emitted when a date is selected. Used to implement the v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', date ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : '');
		},
		resolveInternalDate() {
			if (!this.modelValue) {
				this.internalDate = this.range ? null : '';
				return;
			}
			if (this.range) {
				this.internalDate = dateStringValidator(this.modelValue.start) && dateStringValidator(this.modelValue.end)
					? {
						start: DateTime.fromFormat(this.modelValue.start, 'yyyy-MM-dd'),
						end: DateTime.fromFormat(this.modelValue.end, 'yyyy-MM-dd'),
					}
					: {
						start: DateTime.now(),
						end: DateTime.now(),
					}
				return;
			}
			this.internalDate = dateStringValidator(this.modelValue)
				? DateTime.fromFormat(this.modelValue, 'yyyy-MM-dd')
				: DateTime.now();
		},
		resolveInputValue(value) {
			if (typeof value !== 'object') {
				return value;
			}
			if ((!value.start && !value.end) || isEmpty(value)) {
				return null;
			}
			return `${value.start} to ${value.end}`;
		}
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.inline-date-input {
	outline: 1px solid $n-50;
	min-width: 266px;
	width: fit-content;
	color: $n-600;
	border-radius: $border-radius-extra-small !important;
	cursor: pointer;
	&__icon {
		display: grid;
		place-items: center;
		margin: mr(3);
	}
	&--fluid {
		@extend .inline-date-input;
		width: 100%;
	}
	&--disabled {
		@extend .inline-date-input;
		background-color: $n-20 !important;
		pointer-events: none;
		border: none;
	}
	&__container {
		@extend .inline-date-input;
		display: flex;
		align-items: center
	}
	&__label {
		@include label;
		display: flex;
		justify-content: space-between;
		margin: ml(3)
	}
}
.date-input {
	display: flex;
	height: 40px;
	color: $n-600;
	cursor: pointer;
	input {
		border: none;
		outline: 0;
		padding: pl(3);
	}
	&--fluid {
		@extend .date-input;
		width: 100%;
	}
	&--disabled {
		@extend .date-input;
		background-color: $n-20 !important;
		pointer-events: none;
		border: none;
	}
}
.vc-popover-caret {
	display: none !important;
}
.vc-container {
	outline: 1px solid $n-30 !important;
	border: none !important;
	border-radius: $border-radius-extra-small !important;
}
.vc-popover-content {
	box-shadow: none !important;
	box-shadow: 0px 0px 8px rgba($n-900, .08) !important;
}
.vc-arrows-container {
	padding: 12px 10px !important
}
.vc-title {
	line-height: 23px !important;
	background-color: transparent;
	font-size: 17px;
	text-transform: capitalize;
}
.vc-weeks {
	margin: mt(5);
}
.vc-header {
	.vc-arrow {
		border-radius: 10px;
	}
}
.vc-nav-title {
	@include body-1;
	font-weight: 800;
	background-color: transparent;
}
.vc-nav-arrow {
	border-radius: 10px;
}
.vc-nav-item {
	@include body-1;
	background-color: transparent;
	text-transform: capitalize;
	font-weight: 430;
}
.vc-highlight-bg-light {
	color: v-bind(inlineCalendarTrailColor);
	background-color: v-bind(inlineCalendarTrailColor);
}
.vc-highlight-content-light, .vc-highlight-content-outline, .vc-highlight-content-none {
	color: v-bind(inlineCalendarTextColor);
}
.vc-highlight-bg-solid {
	background-color: v-bind(inlineCalendarDotColor);
}
.vc-highlight-bg-outline, .vc-highlight-bg-none {
	border-color: v-bind(inlineCalendarDotColor);
}
</style>