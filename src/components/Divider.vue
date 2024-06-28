<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="divider__container"
		:class="{'divider__container--inline': inline}"
	>
		<div v-if="!vertical">
			{{ text }}
		</div>

		<hr
			class="divider"
			:class="{
				'divider--vertical': vertical,
				'divider--light': light,
				'divider--dimmed': dimmed,
			}"
		>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Text rendered on top or next to the Divider
		 */
		text: {
			type: String,
			default: null,
		},
		/**
		 * When true, shows the Divider vertically
		 */
		vertical: {
			type: Boolean,
			default: false,
		},
		/**
		 * When unspecified or 0, the behavior of the
		 * component is fluid, with width 100%.
		 */
		width: {
			type: [String, Number],
			default: null,
		},
		/**
		 * Makes the divider white
		 */
		dimmed: {
			type: Boolean,
			default: false,
		},
		/**
		 * Makes the divider white
		 */
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * When specified, determines the width of the Divider.
		 */
		inline: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		sanitizedWidth() {
			if (this.width) {
				return `${this.width}px`;
			}

			return '100%';
		}
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.divider__container > div {
	margin: mb(1);
}
.divider {
	background-color: $n-200;
	border: 0;
	height: 1px;
	width: v-bind(sanitizedWidth);
	margin: 0;

	&__container {
		&--inline {
			display: flex;
			align-items: center;
		}

		&--inline > div {
			@include overline;
			color: $n-500;
			width: max-content;
			white-space: nowrap;
			margin: mTRBL(0, 2, 1, 0);
		}
	}

	&--vertical {
		@extend .divider;
		transform: rotate(90deg);
	}

	&--light {
		@extend .divider;
		background-color: $n-0;
	}

	&--dimmed {
		@extend .divider;
		background-color: $n-40;
	}
}
</style>
