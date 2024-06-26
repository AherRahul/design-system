<template>
	<div
		v-if="modelValue"
		class="side-sheet__overlay"
		tabindex="0"
		@click="shouldCloseOnBackdrop"
	>
		<rds-box
			padding="5"
			class="side-sheet__container"
			elevated
			fluid
			@click.stop
		>
			<header>
				<!-- @slot Slot used to use custom headers. -->
				<slot name="header">
					<div class="side-sheet__header">
						<h3>{{ title }}</h3>
						<div
							class="side-sheet__close-icon"
							@click="closeHandle"
						>
							<rds-clickable
								clickable
							>
								<rds-icon
									height="20"
									width="20"
									name="x-outline"
									@click.stop="$emit('update:modelValue', !modelValue)"
								/>
							</rds-clickable>
						</div>
					</div>
				</slot>
			</header>

			<!-- @slot Slot used to display content within the component. -->
			<slot />
		</rds-box>
	</div>
</template>

<script>
import RdsIcon from '../components/Icon.vue';
import RdsClickable from '../components/Clickable.vue';
import RdsBox from '../components/Box.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
import hexToRgb from '../utils/methods/hexToRgb';
import { KeyCodes } from '../utils';

export default {
	components: {
		RdsIcon,
		RdsBox,
		RdsClickable,
	},
	props: {
		/**
		* Sets the title of the SideSheet.
		*/
		title: {
			type: String,
			default: null,
		},
		/**
		* Prop used as v-model. Controls the visibility of the SideSheet.
		*/
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		* Indicates whether an overlay will be used next to the SideSheet.
		*/
		withOverlay: {
			type: Boolean,
			default: false,
		},
		/**
		* Specifies the size of the SideSheet. There are 4 sizes implemented: 'sm', 'md', 'lg', 'xl'.
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		* Defines whether the SideSheet will be closed when clicking on the backdrop.
		*/
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
		},
		/**
		* Defines whether the SideSheet will be closed when the user presses 'ESC'.
		*/
		noCloseOnEsc: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			sassColorVariables,
		};
	},

	computed: {
		overlayColor() {
			const color = this.withOverlay ? this.sassColorVariables['n900'] : 'transparent';
			return `rgba(${this.hexToRgb(color)}, 0.4)`;
		},

		sideSheetWidth() {
			let width = '328px';

			switch(this.size) {
				case 'xl':
					width = '840px';
					break;
				case 'lg':
					width = '700px';
					break;
				case 'md':
					width = '500px';
					break;
				default:
					width = '340px';
					break;
			}

			return width;
		}
	},

	watch: {
		modelValue(newValue) {
			if (!newValue) {
				this.dettachKeyupEvent();
				return;
			}
			this.attachKeyupEvent();
		},
	},

	created() {
		this.attachKeyupEvent();
	},

	beforeUnmount() {
		this.dettachKeyupEvent();
	},

	methods: {
		hexToRgb,

		shouldCloseOnBackdrop() {
			if (!this.noCloseOnBackdrop) {
				/**
				* Event used to implement the v-model.
				* @event update:modelValue
				* @type {Event}
				*/
				this.$emit('update:modelValue', !this.modelValue);
			}
		},

		shouldCloseOnEsc() {
			if (!this.noCloseOnEsc) {
				this.$emit('update:modelValue', !this.modelValue);
			}
		},

		keyupListener(ev) {
			if (ev.keyCode === KeyCodes.ESC) { // esc
				this.shouldCloseOnEsc();
			}
		},

		attachKeyupEvent() {
			window.addEventListener('keyup', this.keyupListener);
		},

		dettachKeyupEvent() {
			window.removeEventListener('keyup', this.keyupListener);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.side-sheet {
	&__overlay {
		animation: fade;
		animation-duration: 0.4s;

		background-color: v-bind(overlayColor);
		bottom: 0;
		padding: 0;
		height: 100%;
		left: 0;
		position: fixed;
		right: 0;
		top: 1;
		width: 100%;
		z-index: 999;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		padding: pb(2);

		h3 {
			color: $n-900;
			@include subheading-1;
			margin: mb(2);
		}
	}

	&__container {
		animation: translate;
		animation-duration: 0.5s;

		background: $n-0;
		border-radius: 0px;
		float: right;
		height: 100%;
		width: v-bind(sideSheetWidth);
	}

	&__close-icon {
		color: $n-600;
		display: flex;
		justify-content: end;
		padding: pTRBL(0, 4, 4, 4);
		text-align: right;

		&:hover {
			color: $n-700;
		}
	}
}

@keyframes fade {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes translate {
  from {transform: translateX(40px);}
  to {transform: translateX(0px);}
}
</style>
