<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-rdstip="text"
		class="tooltip"
		:data-tippy-placement="position"
		:data-tippy-content="content"
		:data-tippy-allowHTML="true"
	>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * The positioning of the Tooltip. The prop accepts the options: top, right, bottom and left.
		 */
		position: {
			type: String,
			default: 'top',
		},
		/**
		 * Tooltip text
		 */
		text: {
			type: String,
			default: null,
		},
		/**
		 * When set to true, it makes the text and tooltip size smaller.
		 */
		slim: {
			type: Boolean,
			default: false,
		}
	},

	computed: {
		content() {
			return this.slim ? `<span style="font-size: 11px; padding: 0px;">${this.text}</span>`
				: `<span style="font-size: 13px; padding: 0px 2px">${this.text}</span>`;
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';
.tooltip {
	width: fit-content;
}

.tippy-box {
	border-radius: $border-radius-extra-large !important;
	background-color: $n-900 !important;
	color: $n-0 !important;
	display: flex;
	align-items: center;
	font-weight: $font-weight-semibold !important;
	font-family: Satoshi, Inter, Avenir, Helvetica, Arial, sans-serif;
}
</style>