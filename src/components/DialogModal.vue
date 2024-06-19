<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-if="innerValue"
		class="rds-modal__backdrop"
	>
		<div
			v-if="innerValue"
			class="rds-modal"
		>
			<header
				:class="`rds-modal__header--${variant}`"
			>
				<div class="rds-modal__header-content">
					<div
						v-if="variant === 'warning'"
						class="rds-modal__header-title"
					>
						<rds-icon
							:class="`rds-modal__header-icon--${variant}`"
							height="40"
							width="40"
							name="warning-outline"
						/>
						Attention
					</div>

					<div
						v-else-if="variant === 'error'"
						class="rds-modal__header-title"
					>
						<rds-icon
							:class="`rds-modal__header-icon--${variant}`"
							height="40"
							width="40"
							name="alert-outline"
						/>
						Error
					</div>

					<div
						v-else-if="variant === 'info'"
						class="rds-modal__header-title"
					>
						<rds-icon
							:class="`rds-modal__header-icon--${variant}`"
							height="40"
							width="40"
							name="info-outline"
						/>
						Informative
					</div>
				</div>

				<rds-icon
					v-if="variant === 'warning'"
					:class="`rds-modal__header-detail--${variant}`"
					height="60"
					width="60"
					name="warning-outline"
				/>

				<rds-icon
					v-else-if="variant === 'error'"
					:class="`rds-modal__header-detail--${variant}`"
					height="60"
					width="60"
					name="alert-outline"
				/>

				<rds-icon
					v-else-if="variant === 'info'"
					:class="`rds-modal__header-detail--${variant}`"
					height="60"
					width="60"
					name="info-outline"
				/>
			</header>

			<div
				class="rds-modal__body"
			>
				<span class="rds-modal__body-title">
					{{ title }}
				</span>
				<span class="rds-modal__body-description">
					{{ description }}
				</span>
			</div>

			<footer
				class="rds-modal__footer"
			>
				<rds-button
					v-if="variant === 'warning'"
					:text="cancelButtonText"
					secondary
					@click="closeHandle()"
				/>

				<rds-button
					class="footer__ok-button"
					:text="okButtonText"
					:variant="actionButtonVariant"
					@click="okHandle()"
				/>
			</footer>
		</div>
	</div>
</template>

<script>
import RdsIcon from '../components/Icon.vue';
import RdsButton from '../components/Button.vue';
import vClickOutside from 'click-outside-vue3';

const predefinedColors = [
	'teal',
	'green',
	'blue',
	'indigo',
	'violet',
	'pink',
	'red',
	'orange',
	'amber',
];

const predefinedVariants = ['warning', 'error', 'info'];

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	components: {
		RdsIcon,
		RdsButton,
	},
	props: {
		/**
		 *  Defines the Dialog Modal variant.
		 */
		variant: {
			type: String,
			default: 'warning',
			validator: (value) => predefinedVariants.includes(value),
		},
		/**
		 *  Defines the description of the Modal Dialog.
		 */
		description: {
			type: String,
			required: true,
		},
		/**
		 *  Controls the display of the Modal Dialog.
		 */
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Defines the title of the Modal Dialog displayed in the header
		 */
		title: {
			type: String,
			required: true,
		},
		/**
		 *  Sets text for the Modal Dialog action button
		 */
		okButtonText: {
			type: String,
			default: 'Continue',
		},
		/**
		 *  Defines text for the Modal Dialog cancel button
		 */
		cancelButtonText: {
			type: String,
			default: 'Cancel',
		},
		/**
		 * Sets the Dialog Modal action button variant (follows RDS button component variants)
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
			validator: (value) => predefinedColors.includes(value),
		},
	},

	data() {
		return {
			innerValue: false,
			tmp: '',
		}
	},

	watch: {
		modelValue(value) {
			this.innerValue = value;
		},
	},

	mounted() {
		this.innerValue = this.modelValue;
	},

	methods: {

		closeHandle() {
			/**
			 * Event that indicates whether the modal was hidden.
			 * @event close
			 * @type {Event}
			*/
			this.innerValue = !this.innerValue;
			this.$emit('close', true);
			this.$emit('update:modelValue', false);
		},

		okHandle() {
			/**
			 * Event that indicates whether the modal action button was clicked.
			* @event ok
			* @type {Event}
			*/
			this.innerValue = !this.innerValue;
			this.$emit('ok', true);
			this.$emit('update:modelValue', false);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.rds-modal {
	display: flex;
	flex-direction: column;
	max-height: 90%;
	position: absolute;
	width: 500px;
	height: auto;
	border-radius: $border-radius-medium;
	overflow: hidden;
	background-color: white;
	border-radius: $border-radius-medium;
	box-shadow: 0px 0px 8px rgba(40, 90, 185, 0.2);
	overflow-x: visible;
	z-index: 1060;
	animation: zoom-in .5s;

	&__backdrop {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		padding: px(4);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: 1060;
		animation: zoom-in ease .3s;
	}

	&__header {
		overflow: hidden;
		display: flex;
		max-height: 80px;
		align-items: center;
		@include subheading-1;
		color: $n-800;
		font-weight: $font-weight-semibold;
		justify-content: space-between;

		&--warning {
			@extend .rds-modal__header;
			background: linear-gradient(90deg, #FFF1D9 0%, #FFE5B8 100%);
		}

		&--info {
			@extend .rds-modal__header;
			background: linear-gradient(90deg, #DFEBFF 0%, #BDD5FF 100%);
		}

		&--error {
			@extend .rds-modal__header;
			background: linear-gradient(90deg, #FFE7E1 0%, #FFD6CC 100%);
		}
	}

	&__header-title {
		display: flex;
		align-items: center;
		gap: spacer(2);
	}

	&__header-content {
		display: flex;
		align-items: center;
		gap: spacer(2);
		padding: pYX(6,5)
	}

	&__header-icon {

		&--warning {
			color: $al-500;
		}

		&--info {
			color: $bn-500;
		}

		&--error {
			color: $rc-500;
		}
	}

	&__header-detail {
		zoom: 2.4;
		margin: spacer(n6);

		&--warning {
			@extend .rds-modal__header-detail;
			color: rgba(242, 154, 0, 0.16)
		}

		&--error {
			@extend .rds-modal__header-detail;
			color: rgba(238, 45, 69, 0.11)
		}

		&--info {
			@extend .rds-modal__header-detail;
			color: rgba(47, 123, 255, 0.11)
		}
	}

	&__body {
		margin: ma(4);
		display: flex;
		flex-direction: column;
		gap: spacer(3);

		&-title {
			@include subheading-1;
			color: $n-800;
			font-weight: $font-weight-bold;
		}

		&-description {
			@include body-1;
			font-weight: $font-weight-regular;
			color: $n-800;
		}
	}

	&__footer {
		display: flex;
		gap: spacer(4);
		justify-content: center;
		padding: pYX(6, 0);

	}
}

@keyframes zoom-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@media (min-width: 576px) {
	.rds-modal--md {
		max-width: 500px;
		width: 500px;
		right: calc(50% - 500px / 2);
	}
	.rds-modal--sm {
		max-width: 300px;
		width: 300px;
		right: calc(50% - 300px / 2);
	}
}

@media (min-width: 992px) {
	.rds-modal--lg {
		max-width: 800px;
		width: 800px;
		right: calc(50% - 800px / 2);
	}
}

@media (min-width: 1500px) {
	.rds-modal--xl {
		max-width: 1200px;
		width: 1200px;
		right: calc(50% - 1200px / 2);
	}
}
</style>