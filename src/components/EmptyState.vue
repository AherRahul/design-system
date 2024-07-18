<template>
	<div
		class="empty-state"
	>
		<!-- @slot Slot used for inserting graphic content
		customized as an alternative to the empty-state image. -->
		<slot name="graphic-element">
			<img
				class="empty-state__image"
				:src="image"
				:alt="imageDescription"
			>
		</slot>
		<div class="empty-state__title">
			{{ title }}
		</div>

		<div class="empty-state__text">
			<!-- @slot Slot used to insert customized content into the body text of the
				empty state. -->
			<slot name="text">
				{{ text }}
			</slot>
		</div>

		<!--
			Evento issued when the Empty State button is clicked
			@event action-button-click
			@type {Event}
		-->
		<rds-button
			v-if="!hideActionButton"
			class="empty-state__button"
			:text="actionButtonText"
			:variant="actionButtonVariant"
			@click="$emit('action-button-click', true)"
		/>
	</div>
</template>

<script>
import RdsButton from './Button.vue';

const predefinedColors = [
	'teal',
	'green',
	'blue',
	'indigo',
	'violet',
	'pink',
	'red',
	'orange',
	'amber',
];

export default {
	components: {
		RdsButton,
	},

	props: {
		/**
		 * The image to be shown in Empty State. Note: the Storybook Controls 
		 * addon does not yet allow file selection. Therefore, it is not 
		 * possible to test the operation of this prop here.
		 */
		image: {
			type: String,
			default: '',
		},
		/**
		 * Empty State image descriptor added to tag 'alt'
		 */
		imageDescription: {
			type: String,
			default: 'Image of empty state',
		},
		/**
		 * The Empty State title.
		 */
		title: {
			type: String,
			default: 'Empty State Title',
			required: true,
		},
		/**
		 * The Empty State instructional text
		 */
		text: {
			type: String,
			default: 'To exit this empty state situation, perform the action below',
		},
		/**
		 * Prop used to hide the Empty State action button.
		 */
		hideActionButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * The text shown on the Empty State action button
		 */
		actionButtonText: {
			type: String,
			default: 'Finish',
		},
		/**
		 * The Empty State action button variant (follows the RDS button component variants)
		 */
		actionButtonVariant: {
			type: String,
			default: 'green',
			validator: (value) => predefinedColors.includes(value),
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.empty-state {
	align-items: center;
	display: flex;
	flex-direction: column;
	margin: mYX(12, 5);
	position: relative;

	&__image {
		height: auto;
		max-height: 180px;
		max-width: 180px;
		width: auto;
	}

	&__title {
		color: $n-600;
		margin: mt(8);
		@include subheading-2;
	}

	&__text {
		color: $n-500;
		margin: mt(1);
		max-width: 50%;
		text-align: center;
		@include body-1;
	}

	&__button {
		margin: mt(4);
	}
}

@media (max-width: 932px) {
	.empty-state__text {
		max-width: 100%;
	}
}
</style>
