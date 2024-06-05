<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		id="tabs"
	>
		<ul class="inner-tabs__header">
			<li
				v-for="(tab, index) in tabs"
				:id="`${index}-${tab.name}-tab`"
				:key="`${index}-${tab.name}-tab`"
				role="presentation"
				class="inner-tabs__header-item"
			>
				<a
					role="tab"
					href="javascript:void(0)"
					target="_self"
					class="inner-tabs__tab"
					:class="isActive(tab) ? 'inner-tabs__tab--active' : 'inner-tabs__tab--inactive'"
					:style="activeBorderStyle"
					@click="(event) => handleClick(event, tab)"
					@contextmenu.prevent.stop="(event) => handleRightClick(event, tab)"
				>
					<span class="inner-tabs__text">{{ tab.title }}</span>
				</a>
			</li>
			<li
				v-if="showAddAction"
				role="presentation"
				class="nav-item cds-tab__action"
			>
				<a
					role="tab"
					href="javascript:void(0)"
					target="_self"
					class="nav-link"
					@click.prevent="handleAddAction"
				>

					<cds-icon
						height="32"
						width="32"
						name="plus-outline"
					/>
				</a>
			</li>
		</ul>

		<div class="inner-tabs__content">
			<div
				v-for="(tab, index) in tabs"
				:key="`${index}-${tab.name}-tab`"
				role="tabpanel"
				class="content__pane"
				:class="isActive(tab) ? 'content__pane--active' : 'content__pane--inactive'"
			>
				<!-- @slot Slot for custom rendering of tab content
					slots are named according to the `name` of the tabs, each slot
					named is displayed according to the corresponding active tab
				-->
				<slot
					:name="getSlotName(tab)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import CdsIcon from '../components/Icon.vue';

import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	components: {
		CdsIcon,
	},

	props: {
		/**
		 * Defines the list of InnerTabs items to be shown.
		 * List items must be objects with `name` (to identify the slot)
		 * and `title` (tab title)
		 */
		tabs: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (values) => {
				const invalidValues = values.filter((value) => {
					return isEmpty(value.title) || isEmpty(value.name);
				});
				return !invalidValues.length;
			},
		},
		/**
		 *The active item among the tabs
		 */
		activeTab: {
			type: Object,
			default: () => ({}),
			required: true,
		},
		/**
		 * Border color indicating the active item.
		 * There are some predefined colors following the RDS guides, they are:
		 * `turquoise`, `green`, `blue`, `violet`, `pink`, `red`, `orange`, `amber` and `gray`.
		 */
		variant: {
			type: String,
			default: 'green',
			validator: (value) => {
				return colorOptions.includes(value);
			},
		},
		/**
		 * Defines whether the add button should be displayed or not, by default it will not be displayed
		 */
		showAddAction: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalActiveTab: this.activeTab,
			colorOptions,
		};
	},

	computed: {
		activeBorderStyle() {
			return {
				'--indicatorColor': this.colorHexCode(this.variant),
			};
		},
	},

	watch: {
		tabs: {
			handler(newValue) {
				const filtered = newValue.filter(tab => tab.name === this.activeTab.name);
				[this.internalActiveTab] = filtered.length ? filtered : newValue;
			},
			immediate: true,
		},
	},

	methods: {
		colorHexCode,

		getSlotName(tab) {
			return tab.name;
		},

		handleRightClick(event, item) {
			/**
			 * Event emitted when one of the tabs is right-clicked
			* @event right-click
			* @type {Event}
				*/
			this.$emit('right-click', { event, item });
		},

		handleClick(event, item) {
			/**
			 * Event emitted when the active tab is changed
			* @event tabs-change
			* @type {Event}
				*/
			this.$emit('tabs-change', { event, item });
			this.internalActiveTab = item;
		},

		handleAddAction(event) {
			/**
			 * Event emitted when clicking the add button
			* @event add-action
			* @type {Event}
			*/
			this.$emit('add-action', event);
		},

		isActive(item) {
			return isEqual(this.internalActiveTab, item);
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

#tabs {
	.inner-tabs {
		&__header {
			display: flex;
			justify-content: flex-start;
			padding: pl(0);
			margin: mb(0);
			list-style: none;
			gap: spacer(2);
		}

		&__header-item {
			width: fit-content;
		}

		&__tab {
			@include caption;
			width: 112px;
			font-weight: $font-weight-regular;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			text-align: center;
			text-decoration: none !important;
			padding: pYX(5, 4);
			cursor: pointer;
			background-color: $n-0;

			&--active {
				cursor: default;
				color: $n-800;
				font-weight: $font-weight-semibold;
				border-top: 5px solid var(--indicatorColor);
				height: 72px;
				border-top-left-radius: $border-radius-button;
				border-top-right-radius: $border-radius-button;
				transition: border-top 0.2s ease-in-out;
			}

			&--active:hover {
				color: $n-800;
			}

			&--inactive {
				color: $n-500;
				font-weight: $font-weight-semibold;
				border-radius: $border-radius-button;
				border: 1px solid $n-30;
				border-top: 5px solid $n-50;
				transition: border-top 0.2s ease-in-out;
			}

			&--inactive:hover {
				color: $n-500;
			}
		}

		&__text {
			width: 80px;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}


		&__content {
			background-color: $n-0;
			padding: pYX(6, 7);
			border-radius: $border-radius-button;

			> .content__pane--inactive {
				display: none;
			}

			> .content__pane--active {
				display: block;
			}
		}
	}

	.cds-tab__action {
		display: flex;
		align-items: center;
		height: 68px;

		.nav-link {
			display: flex;
			height: 30px;
			width: 30px;
			align-items: center;
			justify-content: center;
			color: $n-200;
			background-color: $n-0;
			border: 1px solid $n-30 !important;
			border-radius: $border-radius-extra-small;
			padding: pa(1);
			transition: $interaction;

			&:hover {
				border-color: $n-100 !important;
				color: $n-300 !important;
				transition: $interaction;
			}
		}
	}
}
</style>
