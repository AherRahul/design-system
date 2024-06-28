<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<rds-clickable
		id="avatar-dropdown"
		:clickable="clickable"
		@click="toggleDropdown"
	>
		<div class="avatar__container">
			<div
				:class="`avatar__container--${variant} avatar__container--${size}`"
			>
				<span
					v-if="!src"
					:class="`avatar__initials--${size}`"
				>
					{{ computedInitials }}
				</span>

				<img
					v-else
					:src="src"
					:alt="name"
					:class="`avatar__image--${size}`"
				>
			</div>

			<rds-chevron
				v-if="clickable"
				size="sm"
				class="avatar__chevron"
				direction="bottom"
			/>
		</div>

		<rds-popover
			v-model="showPopover"
			target-id="avatar-dropdown"
			width="180"
			right-aligned
			vertical-fluid
		>
			<slot name="dropdown-content" />
		</rds-popover>
	</rds-clickable>
</template>
<script>
import RdsChevron from './Chevron.vue';
import RdsClickable from './Clickable.vue';
import RdsPopover from './Popover.vue';

export default {

	components: {
		RdsChevron,
		RdsClickable,
		RdsPopover
	},

	props: {
		/**
		 * The color variant. There are 10 variants implemented: 'green', 'teal', 
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' and 'white'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Specifies the size of the avatar. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * src of the avatar image. It has higher priority than name initial props.
		 */
		src: {
			type: String,
			default: '',
		},
		/**
		 * Receives the initials of the user whose information will be shown in the Avatar. 
		 * Initials are only displayed when no image is specified.
		 */
		initials: {
			type: String,
			default: null,
		},
		/**
		 * Receives the name of the user whose information will be shown in the Avatar. 
		 * The first two initials are extracted from the name for display in the component 
		 * when no image is specified.
		 */
		name: {
			type: String,
			default: null,
		},
		/**
		 * Enables or disables clicking on the component
		 */
		clickable: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			showPopover: false,
		};
	},

	computed: {
		computedInitials() {
			if (this.initials) {
				return this.initials;
			}

			if (this.name) {
				return this.name.replace(/(\S+)(\s*)/gi, (p1) => p1[0].toUpperCase()).slice(0, 2);
			}

			return 'UND';
		},
	},

	methods: {
		toggleDropdown() {
			if (!this.clickable) {
				return;
			}
			this.showPopover = !this.showPopover;
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.avatar {
	&__chevron {
		margin: ml(1);
	}

	&__container {
		align-items: center;
		border-radius: $border-radius-circle;
		display: flex;
		justify-content: center;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;

			@if ($color-name == 'white' or $color-name == 'gray') {
				color: $n-700;
			} @else {
				color: $n-0;
			}
		}

		&--sm {
			height: 28px;
			width: 28px;

			@extend .avatar__container;
		}

		&--md {
			height: 36px;
			width: 36px;

			@extend .avatar__container;
		}

		&--lg {
			height: 44px;
			width: 44px;

			@extend .avatar__container;
		}

		&--xl {
			height: 76px;
			width: 76px;
			@extend .avatar__container;
		}
	}

	&__image {
		clip-path: circle(50%);
		object-fit: cover;

		&--sm {
			height: 29px;
			width: 29px;

			@extend .avatar__image;
		}

		&--md {
			height: 37px;
			width: 37px;

			@extend .avatar__image;
		}

		&--lg {
			height: 45px;
			width: 45px;

			@extend .avatar__image;
		}		
		
		&--xl {
			height: 76px;
			width: 76px;
			@extend .avatar__image;
		}
	}

	&__initials {
		&--sm {
			@include caption;
		}

		&--md {
			@include caption;
			font-weight: $font-weight-semibold;
		}

		&--lg {
			@include subheading-2;
		}

		&--xl {
			@include heading-3;
		}
	}
}
</style>
