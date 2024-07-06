<template>
	<div
		v-if="internalShow"
		class="rds-modal__backdrop"
	>
		<div
			v-if="internalShow"
			v-on-click-outside="noCloseOnBackdrop ? () => {} : closeHandle"
			class="rds-modal"
			:class="`rds-modal--${size}`"
			:style="dynamicStyle"
		>
			<header 
				v-if="!noHeader"
			>
				<!-- @slot Slot used to use custom headers. -->
				<slot name="header">
					<div class="rds-modal__header">
						<h3>{{ title }}</h3>
						<div
							v-if="!noCloseButton"
							class="rds-modal__close-icon"
							@click="closeHandle"
						>
							<rds-icon
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
				<rds-scrollable
					:max-height="maxBodyHeight"
					auto-height
				>
					<slot />
				</rds-scrollable>
			</section>

			<footer
				v-if="!noFooter"
				class="rds-modal__footer"
			>
				<!-- @slot Slot used to insert custom footers. -->
				<slot name="footer">
					<rds-button
						v-if="!noCancelButton"
						:text="cancelButtonText"
						secondary
						:disabled="disabled"
						@click="closeHandle"
					/>

					<rds-button
						class="footer__ok-button"
						:text="okButtonText"
						variant="green"
						:disabled="disabled"
						@click="okHandle"
					/>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
import RdsIcon from '../components/Icon.vue';
import RdsButton from '../components/Button.vue';
import RdsScrollable from '../components/Scrollable.vue';
import vClickOutside from 'click-outside-vue3';

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	components: {
		RdsIcon,
		RdsButton,
		RdsScrollable,
	},
	props: {
		/**
		 *  Controls the display of the modal.
		 */
		show: {
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
		 * Specifies the size of the modal. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Defines the state of the modal's actions.
		 */
		disabled: {
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
	},

	data() {
		return {
			internalShow: false,
		}
	},

	computed: {
		maxBodyHeight() {
			// 90% of the width minus the vertical padding (32 * 2) and minus the footer and header
			return `${ window.innerHeight * 0.9 - 32 * 2 - 110 }px`;
		},
	},

	watch: {
		show(value) {
			this.internalShow = value;
		},
	},

	mounted() {
		this.internalShow = this.show;
	},

	methods: {
		closeHandle() {
			/**
			 * Event that indicates whether the modal was hidden.
			* @event close
			* @type {Event}
			*/
			this.$emit('close', true);
			this.internalShow = !this.internalShow;
		},

		okHandle() {
			/**
			 * Event that indicates whether the modal action button was clicked.
			* @event ok
			* @type {Event}
			*/
			this.$emit('ok', true);
			this.internalShow = !this.internalShow;
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
	width: calc(100% - 2 * 16px);
	height: auto;
	background-color: white;
	padding: pYX(8, 7);
	border-radius: $border-radius-medium;
	box-shadow: 0px 0px 8px rgba(40, 90, 185, 0.2);
	overflow-x: auto;
	z-index: 999999999;
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
		z-index: 99999999;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		padding: pb(7);

		h3 {
			@include subheading-1;
			color: $n-900;
		}
	}

	&__close-icon {
		display: flex;
		cursor: pointer;
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
		transform:scale(0);
	}
	100% {
		transform:scale(1);
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
</style>