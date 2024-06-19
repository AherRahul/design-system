<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="rds-wizard">
		<div class="rds-wizard__container">
			<rds-box
				v-for="(step, index) in steps"
				:key="`wizard-step-${index}`"
				:class="{ 'rds-wizard__empty-state-box': currentStep < index }"
				:padding="5"
				:elevated="currentStep === index"
				fluid
				:clickable="clickable"
				@box-click="handleStepBoxClick(index)"
				@click.prevent
			>
				<span v-if="currentStep >= index">
					<slot :name="`step-${index + 1}-header`">
						<h3 class="rds-wizard__title">
							{{ step.title }}
						</h3>
						<h4 class="rds-wizard__subtitle">
							{{ step.subtitle }}
						</h4>
					</slot>
					<div class="rds-wizard__content">
						<slot :name="`step-${index + 1}`" />
					</div>
				</span>
				<div
					v-else
					class="rds-wizard__empty-state"
				>
					<img
						v-if="step.image"
						class="rds-wizard__empty-state-image"
						:src="step.image"
						:alt="`Imagem de ${step.title}`"
					>
					<div
						class="rds-wizard__empty-state-title"
					>
						{{ step.title }}
					</div>
					<div
						class="rds-wizard__empty-state-subtitle"
					>
						{{ emptyStateText(step.title) }}
					</div>
				</div>
			</rds-box>
		</div>
		<div class="rds-wizard__buttons">
			<rds-button
				:text="cancelButtonText"
				secondary
				@button-click="backActionClick"
				@click.prevent
			/>
			<rds-button
				:text="nextButtonText"
				:variant="nextButtonVariant"
				:disabled="disableNextButton"
				@button-click="nextActionClick"
				@click.prevent
			/>
		</div>
	</div>
</template>

<script>
import RdsBox from './Box.vue';
import RdsButton from './Button.vue';

export default {
	components: {
		RdsBox,
		RdsButton,
	},

	props: {
		/**
		 * An array with objects with the properties 'title' (required), 'subtitle' and 'image'.
		 * The 'title' and 'subtitle' are texts that describe the step, the 'image' is the path to
		 * the empty-state image;
		 */
		steps: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (value) => value.length >= 2 && value.length <= 3,
		},
		/**
		 * The index of the current step (0, 1, or 2)
		 */
		activeStep: {
			type: Number,
			default: 0,
			validator: (value) => (value >= 0 && value <= 2),
		},
		/**
		* Enables or disables clicking on the step (step) to go to this step
		*/
		clickable: {
			type: Boolean,
			default: false,
		},
		/**
		 * The text of the next button (main action).
		 */
		nextButtonText: {
			type: String,
			default: 'Next',
		},
		/**
		 * The text of the back button (secondary action).
		 */
		cancelButtonText: {
			type: String,
			default: 'Previous',
		},
		/**
		 * The main action button variant. There are 10 variants: 'teal', 'green', 'blue',
		 * 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' and 'dark'.
		 */
		nextButtonVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * Controls the availability of the main action button.
		 */
		disableNextButton: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			currentStep: this.activeStep,
		};
	},

	computed: {
		disabledBack() {
			return this.currentStep <= 0;
		},

		disabledNext() {
			return this.currentStep >= this.steps.length - 1;
		},
	},

	watch: {
		activeStep: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.currentStep = newValue;
				}
			},
			immediate: true,
		},

		currentStep(newValue, oldValue) {
			if (newValue !== oldValue) {
				/**
				 * Event emitted when the active step changes
				* @event step-change
				* @type {Event}
				*/
				this.$emit('step-change', newValue);
			}
		},
	},

	methods: {
		emptyStateText(title) {
			return `Fill in all the mandatory fields from the previous step to
				release the section ${title.toLowerCase()}`;
		},

		handleStepBoxClick(index) {
			this.currentStep = index;
		},

		backActionClick() {
			if (this.currentStep > 0) {
				this.currentStep--;
			} else {
				/**
				* Event that indicates that the cancel action was triggered.
				*Emitted when clicking the back button in the first step.
				* @event cancel-action
				* @type {Event}
				*/
				this.$emit('cancel-action', true);
			}
		},

		nextActionClick() {
			let nextStep = this.currentStep;
			if (this.currentStep < this.steps.length - 1) {
				nextStep++;
			}
			/**
			* Event that indicates that the next action was triggered
			* @event next-action
			* @type {Event}
			*/
			this.$emit('next-action', { nextStep });
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

::v-deep .rds-wizard__empty-state-box .box__container {
	height: 100% !important;
}
::v-deep .rds-wizard__empty-state-box .spacer {
	display: flex !important;
	height: 100% !important;
}

.rds-wizard {
	&__container {
		display: flex;
		gap: spacer(3);
	}

	&__empty-state {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		margin: mYX(0, 10);

		&-title {
			@include subheading-3;
			color: $n-600;
			margin: mb(2);
		}

		&-subtitle {
			@include caption;
			color: $n-400;
		}

		&-image {
			width: 75px;
			height: auto;
			margin: mb(5);
		}
	}

	&__buttons {
		display: flex;
		justify-content: flex-end;
		margin: mt(5);
		gap: spacer(3);
	}

	&__title {
		@include subheading-2;
		color: $n-700;
		margin: mb(1);
	}

	&__subtitle {
		@include body-2;
		color: $n-400;
		margin: ma(0);
	}

	&__content {
		margin: mYX(6, 0);
	}
}

@media (max-width: 992px) {
	.rds-wizard {
		&__container {
			flex-direction: column;
		}
	}
}
</style>
