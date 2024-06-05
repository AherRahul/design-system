<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<!--TODO: Replace the img tag with the picture tag and modify the API to reflect this change. -->
	<img
		v-bind="$attrs"
		:src="innerSrc"
		:alt="alt"
		class="cds__image"
		@error="imageSrcResolver"
	>
</template>

<script>
import rounder from '../utils/methods/rounder';

export default {
	props: {
		/**
		* Path of the image that will be rendered.
		*/
		src: {
			type: String,
			required: true,
		},
		/**
		* Path of the image that will be rendered as a fallback, if the main image
		* presents a loading error.
		*/
		fallbackSrc: {
			type: String,
			required: false,
		},
		/**
		* Image width. When not specified, the `auto` value is applied.
		*/
		width: {
			type: [Number, String],
			default: null,
		},
		/**
		* Image height. When not specified, the `auto` value is applied.
		*/
		height: {
			type: [Number, String],
			default: null,
		},
		/**
		* Text description of the image.
		*/
		alt: {
			type: String,
			default: 'Image',
		},
		/**
		* Image opacity.
		*/
		opacity: {
			type: [Number, String],
			default: 1,
		},
		/**
		* When true, applies a 35% grayscale to the image.
		*/
		dimmed: {
			type: Boolean,
			default: false,
		},
		/**
		* Makes the image black and white.
		*/
		blackAndWhite: {
			type: Boolean,
			default: false,
		},
		/**
		* Rounds the edges of the image.
		*/
		roundedCorners: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			innerSrc: this.src,
		};
	},

	computed: {
		heightResolver() {
			return this.height ? `${this.height}px` : 'auto';
		},

		widthResolver() {
			return this.width ? `${this.width}px` : 'auto';
		},

		opacityResolver() {
			return this.width ? `${this.width}px` : 'auto';
		},

		radiusResolver() {
			return this.roundedCorners ? rounder(this.width) : '0px';
		},

		grayScaleResolver() {
			if (this.blackAndWhite) {
				return 'grayscale(100%)';
			} else if (this.dimmed) {
				return 'grayscale(35%)';
			} else {
				return 'grayscale(0%)';
			}
		},
	},

	methods: {
		rounder,

		imageSrcResolver() {
			this.innerSrc = this.fallbackSrc;
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.cds__image {
	border-radius: v-bind(radiusResolver);
	filter: v-bind(grayScaleResolver);
	height: v-bind(heightResolver);
	object-fit: cover;
	opacity: v-bind(opacity);
	width: v-bind(widthResolver);
	-webkit-filter: v-bind(grayScaleResolver);
}
</style>
