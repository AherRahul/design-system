<template>
	<span id="alert-card">
		<div
			class="alert-card__container"
			:class="alertCardContainerSelected"
		>
			<div
				v-if="withIcon"
				:class="iconClass"
			>
				<rds-icon
					height="24"
					width="24"
					:name="dynamicIcon"
					:class="`icon--${variant}`"
				/>
			</div>

			<div
				class="alert-card__content-container"
			>
				<span
					v-if="!noTitle"
					:class="`alert-card__title--${variant}`"
				>
					{{ title }}
				</span>

				<!-- @slot Slot used to insert customized content in the subtitle. -->
				<span
					class="alert-card__subtitle"
					:class="`${noTitle ? 'mt-0' : 'mt-2'}`"
				>
					<slot name="subTitle-slot">
						{{ subTitle }}
					</slot>
				</span>

				<!-- @slot Slot used to insert additional content into the AlertCard
					below the subtitle. -->
				<slot
					name="content-slot"
					class="alert-card__content"
				/>
			</div>
		</div>

	</span>
</template>

<script>
import RdsIcon from './Icon.vue';

export default {
	components: {
		RdsIcon,
	},

	props: {
		/**
		 * The Alert variant. There are 3 variants implemented: 'info', 'warning'
		 * and 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * The title of the alert. The title can also be used with the slot.
		 */
		title: {
			type: String,
			default: 'AlertCard Title',
		},
		/**
		 * The alert subtitle. Subtitle can also be used with slot.
		 */
		subTitle: {
			type: String,
			default: 'AlertCard Sub-Title',
		},
		/**
		 * Determines whether the Alert will have an icon or not.
		 */
		withIcon: {
			type: Boolean,
			default: false,
		},
		/**
		* Prop used as v-model. Controls the visibility of the popover.
		*/
		value: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isSelected: this.value,
		};
	},

	computed: {
		dynamicIcon() {
			switch (this.variant) {
				case 'info':
					return 'info-outline';
				case 'warning':
					return 'warning-outline';
				case 'danger':
					return 'alert-outline';
				default:
					return 'info-outline';
			}
		},

		alertCardContainerSelected() {
			let dynamicClass = '';

			if (!this.muted) {
				if (this.selectable) {
					dynamicClass = 'alert-card__container--selectable';
				}

				if (this.isSelected) {
					return `${dynamicClass} alert-card__container--selected-${this.variant}`;
				}
			} else {
				dynamicClass = 'alert-card__container--muted';
			}

			return dynamicClass;
		},

		iconClass() {
			return `icon__container--${this.variant} ${this.noTitle ? 'align-self-center' : ''}`;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

#alert-card .alert-card {
	display: flex;
	align-items: center;
	padding: pa(4);
	border-radius: 16px;

	&__container {
		@extend .alert-card;
		border: 1px solid $n-40;

		&--selectable {
			cursor: pointer;
		}

		&--muted {
			background-color: $n-10;
		}
	}

	&__container--selected-info {
		@extend .alert-card;
		border: 2px solid $bn-300;
		box-shadow: 1px 1px 4px rgba(32, 110, 217, 0.5);
	}

	&__container--selected-warning {
		@extend .alert-card;
		border: 2px solid $al-300;
		box-shadow: 1px 1px 4px rgba(253, 210, 145, 0.5);
	}

	&__container--selected-danger {
		@extend .alert-card;
		border: 2px solid $rc-300;
		box-shadow: 1px 1px 4px rgba(237, 59, 81, 0.5);
	}

	&__title {
		@include subheading-3;
		margin: my(3);
		display: block;

		&--info {
			@extend .alert-card__title;
			color: $bn-400;
		}

		&--warning {
			@extend .alert-card__title;
			color: $al-600;
		}

		&--danger {
			@extend .alert-card__title;
			color: $rc-500;
		}
	}

	&__subtitle {
		@include body-2;
		display: block;
		color: $n-600;
	}

	&__content {
		margin: mt(4);
	}

	&__content-container {
		width: 100%;
	}
}

#alert-card .icon {
	stroke-width: 2.4;

	&--info {
		@extend .icon;
		color: $bn-400;
	}

	&--warning {
		@extend .icon;
		color: $al-600;
	}

	&--danger {
		@extend .icon;
		color: $rc-400;
	}

	&__container {
		display: flex;
		padding: pa(2);
		border-radius: 100%;
		margin: mr(3);
		align-self: flex-start;

		&--info {
			@extend .icon__container;
			background-color: $bn-100;
		}

		&--warning {
			@extend .icon__container;
			background-color: $al-100;
		}

		&--danger {
			@extend .icon__container;
			background-color: $rc-100;
		}
	}
}

#alert-card .custom-checkbox {
	margin: mt(4);
	align-self: flex-start;
	width: 14px;
	position: relative;
	margin-right: spacer(8);
	margin-left: spacer(n2);

	label {
		cursor: pointer;
		position: absolute;
		width: 14px;
		height: 14px;
		top: 0;
		border-radius: 4px;
		border: 1px solid $n-200;

		&:after {
			border: 2px solid $n-0;
			border-top: none;
			border-right: none;
			content: "";
			height: 5px;
			left: 3.1px;
			opacity: 0;
			position: absolute;
			top: 4.4px;
			transform: rotate(-45deg);
			width: 8px;
			border-radius: 0.4px;
		}
	}

	input[type=checkbox]:checked + label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		filter: alpha(opacity=100);
		opacity: 1;
	}

	input[type=checkbox] {
		visibility: hidden;
	}
}

#alert-card .custom-checkbox--checked {
	background-color: $bn-500 !important;
	border: none !important;
}

</style>
