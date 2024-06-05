<template>
	<span id="callout-card">
		<div :class="resolveClass('callout-card__container')">
			<div class="image__container">
				<img
					:class="resolveClass('image__content')"
					:src="image"
					:alt="imageDescription"
				>
			</div>
			<div :class="resolveClass('content__container')">
				<div :class="resolveClass('content')">
					<p class="content__title">
						{{ title }}
					</p>

					<span class="content__text">
						<!-- @slot Slot used to insert customized content into the text. -->
						<slot name="text">
							{{ text }}
						</slot>
					</span>
				</div>
				<div>
					<!-- @slot Slot used to insert customized content in place of the action button. -->
					<slot name="action">
						<!--
							Event that indicates that the Button was clicked
							@event action-button-click
							@type {Event}
						-->
						<cds-button
							id="content-button"
							:variant="actionButtonVariant"
							:text="actionButtonText"
							:secondary="actionButtonSecondary"
							:disabled="actionButtonDisabled"
							@click="$emit('action-button-click', true)"
						/>
					</slot>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import CdsButton from './Button.vue';

export default {
	components: {
		CdsButton,
	},

	props: {
		/**
		 * The title of the card. The title can also be used with the slot.
		 */
		title: {
			type: String,
			default: 'AlertCard title',
			required: true,
		},
		/**
		 * The text of the card. Text can also be used with slot.
		 */
		text: {
			type: String,
			default: 'AlertCard Subtitle',
		},
		/**
		 * The card image.
		 */
		image: {
			type: String,
			default: '',
			required: true,
		},
		/**
		 * The description of the card image.
		 */
		imageDescription: {
			type: String,
			default: 'Image by CalloutCard',
		},
		/**
		 * The color of the card button.
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * The card button text.
		 */
		actionButtonText: {
			type: String,
			default: 'Ok',
		},
		/**
		 * The minor version of the button.
		 */
		actionButtonSecondary: {
			type: Boolean,
			default: false,
		},
		/**
		 * The disabled version of the button.
		 */
		actionButtonDisabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Card display mode.
		 */
		compact: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		resolveClass(element) {
			return this.compact ? `${element}--compact` : element;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

#callout-card .callout-card {
	align-items: center;
	display: flex;
	border: 1px solid $n-40;
	border-radius: 16px;
	padding: pa(7);

	&__container {
		@extend .callout-card;
		width: 700px;

		&--compact {
			@extend .callout-card;
			padding: pYX(2,6);
		}
	}

	&__content-container {
		width: 20%;
	}
}

#callout-card .image {
	&__container {
		margin: mr(7);
	}

	&__content {
		max-height: 150px;
		max-width: 150px;

		&--compact {
			max-height: 90px;
			max-width: 120px;
		}
	}
}

#callout-card .content {
	margin: mb(4);

	&--compact {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 529px;
	}

	&__title {
		color: $n-700;
		display: block;
		@include subheading-3;
		margin: mb(2);
	}

	&__text {
		color: $n-700;
		@include body-2;
	}

	&__container {
		&--compact {
			align-items: center;
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
	}
}
</style>
