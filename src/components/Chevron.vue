<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		ref="chevron"
		:class="{
			'chevron--top': innerDirection === 'top',
			'chevron--right': innerDirection === 'right',
			'chevron--bottom': innerDirection === 'bottom',
			'chevron--left': innerDirection === 'left',
			'chevron--sm': size === 'sm',
			'chevron--md': size === 'md',
			'chevron--lg': size === 'lg',
			'chevron--light': light === true,
		}"
		@click="animationResolver"
	/>
</template>

<script>
export default {
	props: {
		/**
		 * Indicates which direction the Chevron will be rendered. The options are: 'Top', 'Right', 'Bottom' and 'Left'
		 */
		direction: {
			type: String,
			default: 'bottom',
		},
		/**
		 * When true, makes the chevron lighter
		 */
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the size of the Chevron. There are 3 sizes implemented: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Activates animation when transitioning Chevron positions
		 */
		animate: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			innerDirection: this.direction,
		};
	},

	methods: {
		animationResolver() {
			if (!this.animate) return;

			switch(this.innerDirection) {
				case 'top':
					this.innerDirection = 'bottom';
					break;
				case 'bottom':
					this.innerDirection = 'top';
					break;
				case 'right':
					this.innerDirection = 'left';
					break;
				case 'left':
					this.innerDirection = 'right';
					break;
				default:
					this.innerDirection = 'bottom';
			}
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.chevron {
	display: flex;
	height: 16px;
	width: 16px;
	justify-content: center;
	align-items: center;
	padding: pa(1);
	transition: all 300ms ease-in-out;

	&::before,
	&::after {
		content: '';
	}

	&::before {
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid $n-300;
		border-radius: $border-radius-small;
		transition: all 300ms ease-in-out;
	}

	&--sm {
		&::before {
			scale: 1;
		}
	}

	&--md {
		&::before {
			scale: 1.3;
		}
	}

	&--lg {
		&::before {
			scale: 1.6;
		}
	}

	&--light {
		&::before {
			border-bottom: 6px solid $n-100;
		}
	}

	&--top {
		@extend .chevron;

		&::before {
			transform: rotate(0deg);
		}
	}

	&--right {
		@extend .chevron;

		&::before {
			transform: rotate(90deg);
		}
	}

	&--bottom {
		@extend .chevron;

		&::before {
			transform: rotate(-180deg);
		}
	}

	&--left {
		@extend .chevron;

		&::before {
			transform: rotate(-90deg);
		}
	}
}
</style>
