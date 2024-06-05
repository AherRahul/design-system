<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<cds-box
		padding="0"
		:clickable="clickable"
		@boxClick="handleClick"
	>
		<div class="card__extra-container">
			<div class="card__extra">
				<!-- @slot Slot to include additional content in the upper right corner of the card.-->
				<slot name="extra" />
			</div>
		</div>

		<div :class="{'card--horizontal': this.horizontal}">
			<div
				v-if="hasSlot($slots, 'image')"
			>
				<!-- @slot Slot used to include images on the Card.-->
				<slot name="image" />
			</div>
	
			<div
				v-else-if="imageSrc"
				class="card__image"
			>
				<cds-image
					:src="imageSrc"
					:width="imageWidth"
					:height="imageHeight"
					:alt="imageAlt"
				/>
			</div>
			
			<div
				v-else-if="hasSlot($slots, 'icon')"
				class="card__icon"
			>
				<!-- @slot SSlot used to include icons on the Card.-->
				<slot name="icon" />
			</div>

			<div
				class="card__spacer"
			>
				<div
					v-if="hasSlot($slots, 'header')"
					class="card__header"
				>
					<!-- @slot Slot for custom Header content.-->
					<slot name="header" />
				</div>

				<div v-else="title">
					<p class="card__header">{{ title }}</p>
				</div>
		
				<div
					v-if="hasSlot($slots, 'body')"
					class="card__body"
				>
					<!-- @slot Slot for custom Body content.-->
					<slot name="body" />
				</div>

				<div v-else="content">
					<p class="card__body">{{ content }}</p>
				</div>
		
				<div
					v-if="hasSlot($slots, 'footer')"
					class="card__footer"
				>
					<!-- @slot Footer custom content slot.-->
					<slot name="footer" />
				</div>
			</div>
		</div>
	</cds-box>
</template>

<script>
import CdsBox from './Box.vue';
import CdsImage from './Image.vue';

import hasSlot from '../utils/methods/hasSlot';

export default {
	components: {
		CdsBox,
		CdsImage,
	},

	props: {
		/**
		* Specifies the card title. When content is sent to the `Header` slot the content of this prop is not displayed.
		*/
		title: {
			type: String,
			default: '',
		},
		/**
		* Specifies Card text. When content is sent to the `Body` slot the content of this prop is not displayed.
		*/
		content: {
			type: String,
			default: '',
		},
		/**
		* Path of the image that will be rendered. When content is sent to the `Image` slot the content of this prop is not displayed.
		*/
		imageSrc: {
			type: String,
			default: '',
		},
		/**
		* Text description of the image.
		*/
		imageAlt: {
			type: String,
			default: 'card image',
		},
		/**
		* Width of the card image.
		*/
		imageWidth: {
			type: [String, Number],
			default: 300,
		},
		/**
		* Height of the card image.
		*/
		imageHeight: {
			type: [String, Number],
			default: 180,
		},
		/**
		* Width of card content.
		*/
		bodyWidth: {
			type: [String, Number],
			default: 300,
		},
		/**
		* Makes the Card alignment horizontal.
		*/
		horizontal: {
			type: Boolean,
			default: false,
		},
		/**
		* Enables or disables clicking on the component
		*/
		clickable: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		imageWidthResolver() {
			return this.horizontal ? 'fit-content' :  `${this.imageWidth}px`;
		},

		bodyWidthResolver() {
			return `${this.bodyWidth}px`;
		},
	},

	methods: {
		hasSlot,

		handleClick() {
			if (this.clickable) {
				/**
				* Event that indicates whether the card was clicked.
				* @event cardClick
				* @type {Event}
				*/
				this.$emit('cardClick', true);
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.card {
	&__icon {
		padding: pTRBL(5, 0, 5, 5);
	}
	
	&__extra-container {
		position: relative;
	}
	
	&__extra {
		margin-top: 20px;
		position: absolute;
		right: 16px;
		z-index: 9999;
	}
	
	&__image {
		display: flex;
	}
	
	&--horizontal {
		align-items: center;
		display: flex;
	}
	
	&__header {
		@include subheading-2;
		color: $n-700;
		margin: ma(0);
	}
	
	&__body {
		@include body-2;
		color: $n-500;
		line-height: 150%;
		margin: mt(3);
		max-width: v-bind(bodyWidthResolver);
	}
	
	&__spacer {
		padding: pa(5);
		max-width: v-bind(imageWidthResolver);
	}
	
	&__footer {
		margin: mt(0);
	}
}
</style>
