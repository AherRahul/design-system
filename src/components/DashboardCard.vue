<template>
	<div
		class="dashboard-card"
	>
		<div>
			<div
				class="dashboard-card__header"
			>
				<p
					v-if="title.length > 0"
					class="dashboard-card__title"
				>
					{{ title }}
				</p>

				<p
					v-else
					class="dashboard-card__title"
				>
					<slot name="title-slot" />
				</p>
	
				<div>
					<slot name="status-slot" />
				</div>
			</div>
	
			<p
				v-if="description.length > 0"
				class="dashboard-card__description"
			>
				{{ description }}
			</p>

			<p
				v-else
				class="dashboard-card__description"
			>
				<slot name="description-slot" />
			</p>
		</div>

		<div 
			class="dashboard-card__action"
			@click="$emit('action-button-click')"
		>
			<!-- @slot Slot for customized rendering of action content. Overrides the `showAction` prop.
			-->
			<slot name="action-slot">
				<div v-if="showAction">
					{{ action }}
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * The title of the alert. The title can also be used with the slot.
		 */
		title: {
			type: String,
			default: '',
			required: false,
		},
		/**
		 * Text that will be displayed below the title. Used for better
		 * describe the information displayed on the dashboard-card.
		 */
		description: {
			type: String,
			default: '',
			required: false,
		},
		/**
		 * Prop that displays the dashboard-card action button.
		 */
		showAction: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Prop that indicates the text of the dashboard-card action button.
		 */
		action: {
			type: String,
			default: 'Action',
			required: false,
		},
		/**
		 * Prop that indicates whether the component should occupy 100% of the available space.
		 */
		fluid: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.dashboard-card {
	box-sizing: border-box;
	background-color: $n-0;
	border: 1px solid $n-40;
	border-radius: $border-radius-small;
	padding: pa(4);
	width: fit-content;
	min-width: 272px;
	min-height: 120px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&--fluid {
		@extend .dashboard-card;
		width: 100%;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__title {
		font-weight: 700;
		color: $n-700;
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.15px;
		margin: mb(1);
	}

	&__description {
		font-weight: 400;
		color: $n-600;
		font-size: 13.5px;
		line-height: 17px;
		letter-spacing: 0.4px;
		max-width: 224px;
		margin: mb(0);
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

		&--fluid {
			@extend .dashboard-card__description;
			max-width: 80%;
		}
	}

	&__action {
		color: $n-800;
		font-weight: $font-weight-semibold;
		font-size: 12px;
		line-height: 17px;
		text-transform: uppercase;
		align-self: flex-end;
		cursor: pointer;
		display: inline;
		margin: my(2);
	}

	&__action > * {
		font-weight: $font-weight-semibold;
	}
}
</style>
