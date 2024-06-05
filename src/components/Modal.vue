<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-if="innerValue"
		class="cds-modal__backdrop"
	>
		<div
			v-if="innerValue"
			v-on-click-outside="noCloseOnBackdrop ? () => {} : closeHandle"
			class="cds-modal"
			:class="`cds-modal--${size}`"
		>
			<header
				v-if="!noHeader"
			>
				<!-- @slot Slot used to use custom headers. -->
				<slot name="header">
					<div class="cds-modal__header">
						<h3>{{ title }}</h3>
						<div
							v-if="!noCloseButton"
							class="cds-modal__close-icon"
							@click="closeHandle"
						>
							<cds-icon
								name="x-outline"
								height="20"
								width="20"
								color="#29333D"
							/>
						</div>
					</div>
				</slot>
			</header>

			<!-- @slot Slot used to insert content into the Modal. -->
			<section>
				<cds-scrollable
					v-if="scrollable"
					class="cds-modal__body"
				>
					<slot />
				</cds-scrollable>
				<div
					v-else
					class="cds-modal__body"
				>
					<slot />
				</div>
			</section>

			<footer
				v-if="!noFooter"
				class="cds-modal__footer"
			>
				<!-- @slot Slot used to insert custom footers. -->
				<slot name="footer">
					<cds-button
						v-if="!noCancelButton"
						:text="cancelButtonText"
						secondary
						:disabled="disableCancelButton"
						@click="!disableCancelButton ? closeHandle() : false"
					/>

					<cds-button
						class="footer__ok-button"
						:text="okButtonText"
						:variant="actionButtonVariant"
						:disabled="disableOkButton"
						@click="!disableOkButton ? okHandle() : false"
					/>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
import CdsIcon from '../components/Icon.vue';
import CdsButton from '../components/Button.vue';
import vClickOutside from 'click-outside-vue3';
import CdsScrollable from '../components/Scrollable.vue';

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

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	components: {
		CdsIcon,
		CdsButton,
		CdsScrollable
	},
	props: {
		/**
		 *  Controls the display of the modal.
		 */
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Defines the title of the modal displayed in the header
		 */
		title: {
			type: String,
			default: 'Title',
		},
		/**
		 * Specifies the size of the modal. There are 3 sizes implemented: 'sm', 'md', 'lg' and 'xl'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Sets the state of the modal action button.
		 */
		disableOkButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Defines the state of the modal's cancel button.
		 */
		disableCancelButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the action of closing the modal when clicking outside.
		 */
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the action of closing the modal when clicking the action button.
		 */
		noCloseOkButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the display of the modal's close button.
		 */
		noCloseButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the display of the modal's cancel button.
		 */
		noCancelButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the display of the modal footer.
		 */
		noFooter: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the display of the modal header.
		 */
		noHeader: {
			type: Boolean,
			default: false,
		},
		/**
		 * Defines modal action button text
		 */
		okButtonText: {
			type: String,
			default: 'Confirm',
		},
		/**
		 * Defines text for the modal cancel button
		 */
		cancelButtonText: {
			type: String,
			default: 'Cancel',
		},
		/**
		 * Sets the Modal action button variant (follows RDS button component variants)
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
			validator: (value) => predefinedColors.includes(value),
		},
		/**
		 * Defines whether the modal content needs to be "scrolled" and adds a vertical scroll when the maximum height is reached
		 */
		scrollable: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			innerValue: false,
			tmp: '',
		}
	},

	computed: {
		maxBodyHeight() {
			// 90% of the width minus the vertical padding (32 * 2) and minus the footer (68) and header (64)
			return `${ window.innerHeight * 0.9 - 32 * 2 - 68 - 64 }px`;
		},
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
			if (!this.noCloseOkButton) {
				this.innerValue = !this.innerValue;
				this.$emit('update:modelValue', false);
			}
			this.$emit('ok', true);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.cds-modal {
	display: flex;
	flex-direction: column;
	max-height: 90%;
	position: absolute;
	width: calc(100% - 2 * 16px);
	height: auto;
	background-color: white;
	padding: pYX(5, 5);
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
		display: flex;
		justify-content: space-between;
		padding: pb(2);

		h3 {
			@include subheading-1;
			color: $n-900;
			margin: mb(2);
		}
	}

	&__close-icon {
		display: flex;
		cursor: pointer;
	}

	&__body {
		padding-right: 4.4px;
		padding-left: 0.8px;
	}

	&__footer {
		display: flex;
		justify-content: end;
		margin-top: auto;
		padding: pt(7);

	}
}

.footer__ok-button {
	margin: ml(6);
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
	.cds-modal--md {
		max-width: 500px;
		width: 500px;
		right: calc(50% - 500px / 2);
	}
	.cds-modal--sm {
		max-width: 300px;
		width: 300px;
		right: calc(50% - 300px / 2);
	}
}

@media (min-width: 992px) {
	.cds-modal--lg {
		max-width: 800px;
		width: 800px;
		right: calc(50% - 800px / 2);
	}
}

@media (min-width: 1500px) {
	.cds-modal--xl {
		max-width: 1200px;
		width: 1200px;
		right: calc(50% - 1200px / 2);
	}
}
</style>