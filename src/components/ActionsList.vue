<template>
	<span class="action-list">
		<div
			class="action-list--right"
		>
			<div
				v-for="(action, i) in actions"
				:key="action.title"
			>
				<transition name="action-list__slide-fade">
					<!--
						Evento emitido quando uma das ações é clicada.
						The data associated with the action will be sent to the parent component.
						@event action-clicked
						@type {Event}
					-->
					<div
						v-if="i <= internalNumberOfExpandedActions - 1"
						:class="{
							'action-list__item': i === 0, 
							'action-list__item--left-bordered': i !== 0,
							'action-list__item--disabled': action.disabled,
						}"
						@click.stop="handleClick(action)"
					>
						<!-- @slot Scoped slot for custom rendering of 'actions'.							
							The 'list' property, which can be accessed through the slot,
							represents the array of actions to be displayed.
						-->
						<slot
							name="action"
							:list="action"
						/>
					</div>
				</transition>
			</div>
			
			<div
				v-if="actions.length > numberOfExpandedActions"
				class="action-list__item--left-bordered"
				@click.stop="toggleCollapseState"
			>
				<!-- @slot Slot for custom rendering of item content
					to expand/collapse the list
				-->
				<slot name="action-trigger">
					{{ itsBeingShown ? 'Hide' : 'Show More' }}
				</slot>
			</div>
		</div>
	</span>
</template>

<script>
import cloneDeep from 'lodash.clonedeep';

export default {
	props: {
		/**
		* The list of actions to be rendered. If you want an item in the list 
		* to be disabled, just set the prop disabledto true for that item in the array.
		*/
		actions: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		 * The number of items that will be shown when the component is rendered.
		 */
		numberOfExpandedActions: {
			type: Number,
			default: 2,
			required: false,
		},
	},

	data() {
		return {
			action: cloneDeep(this.actions),
			internalNumberOfExpandedActions: this.numberOfExpandedActions,
			itsBeingShown: false,
		};
	},

	methods: {
		toggleCollapseState() {
			this.internalNumberOfExpandedActions = this.itsBeingShown
				? this.numberOfExpandedActions : this.action.length;
			this.itsBeingShown = !this.itsBeingShown;
			/**
			* Event emitted when the list is expanded ('true') or contracted ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('expanded', this.itsBeingShown);
		},

		handleClick(action) {
			if(!action.disabled) {
				/**
				* Event emitted when the list item is clicked.
				* @event action-clicked
				* @type {Event}
				*/
				this.$emit('action-clicked', action);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.action-list {
	&--right {
		color: $n-500;
		display: flex;
		font-weight: 600;
		justify-content: flex-end;
	}

	&--left {
		justify-content: flex-start;
		@extend .action-list--right;
	}

	&__item {
		border-radius: 1px;
		cursor: pointer;
		padding: 24px;
		
		&:hover {
			background-color: $n-10;
		}

		&--disabled {
			@extend .action-list__item;
			color: $n-200;
			cursor: not-allowed;

			&:hover {
				background-color: unset;
			}
		}

		&--right-bordered {
			border-right: 1px solid $n-40;
			@extend .action-list__item;
		}

		&--left-bordered {
			border-left: 1px solid $n-40;
			@extend .action-list__item;
		}
	}

	&__slide-fade-enter-active {
		transition: all .3s ease;
	}

	&__slide-fade-leave-active {
		transition: all .1s ease;
	}

	&__slide-fade-enter,
	&__slide-fade-leave-to {
		opacity: 0;
		transform: translateX(10px);
	}
}
</style>
