<template>
	<div
		id="inner-tabs"
	>
		<div class="inner-tabs__header-container">
			<ul class="inner-tabs__header">
				<li
					v-for="(tab, index) in tabs"
					:key="`${index}-${tab.name}-tab`"
					role="presentation"
				>
					<a
						role="tab"
						href="javascript:void(0)"
						target="_self"
						class="inner-tabs__tab"
						:class="isActive(tab) ? 'inner-tabs__tab--active' : 'inner-tabs__tab--inactive'"
						@click="(event) => handleClick(event, tab)"
					>
						{{ tab.title }}
					</a>
	
					<div
						:class="indicatorClass(tab)"
						:style="activeBorderStyle"
					/>
				</li>
			</ul>
		</div>

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

import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
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
		 * The active item among the tabs
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

		handleClick(event, item) {
			/**
			 * Event emitted when the active tab is changed
			* @event change
			* @type {Event}
				*/
			this.$emit('change', { event, item });
			this.internalActiveTab = item;
		},

		isActive(item) {
			return isEqual(this.internalActiveTab, item);
		},

		indicatorClass(item) {
			return this.isActive(item) ? `tab__indicator--active--${this.variant}` : '';
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

#inner-tabs {
	.inner-tabs {
		&__header {
			display: flex;
			justify-content: flex-start;
			gap: spacer(4);
			padding: pl(0);
			margin: mb(0);
			list-style: none;
			transition: $opening;
			width: 100%;

			&-container {
				overflow-x: scroll;
				margin-bottom: -1px;
				width: 100%;

				/* width */
				&::-webkit-scrollbar {
					height: 5px;
					border-radius: 8px;
				}

				/* Track */
				&::-webkit-scrollbar-track {
					background: transparent;
				}

				/* Handle */
				&::-webkit-scrollbar-thumb {
					background: $n-40;
					border-radius: 8px;
				}

				/* Handle on hover */
				&::-webkit-scrollbar-thumb:hover {
					background: $n-50;
				}
			}
		}

		&__tab {
			flex: 1;
			min-width: 0;
			@include caption;
			font-weight: $font-weight-regular;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			text-align: center;
			text-decoration: none !important;
			margin: mTRBL(0, 2, 2, 0);
			padding: pYX(2, 5);
			cursor: pointer;

			&--active {
				cursor: default;
				color: $n-800;
				font-weight: $font-weight-semibold;
			}
			
			&--active:hover {
				color: $n-800;
			}
			
			&--inactive {
				color: $n-500;
				font-weight: $font-weight-regular;
			}
			
			&--inactive:hover {
				color: $n-500;
			}
		}

		&__content {
			background-color: $n-0;
			padding: pa(5);
			border-bottom-right-radius: 8px;
			border-bottom-left-radius: 8px;
			width: 100%;
		
			> .content__pane--inactive {
				display: none;
			}
		
			> .content__pane--active {
				display: block;
			}
		}
	}

	.tab__indicator--active {
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			height: 4px;
			width: 100%;
			border-top-right-radius: 4px;
			border-top-left-radius: 4px;
			background-color: $base-color;
			transition: all 0.3s ease-out;
		}
	}

	@media (max-width: 768px) {
		.inner-tabs__header {
			gap: spacer(2);
		}

		.inner-tabs__tab {
			min-width: 100px;
			font-size: 0.875rem;
			padding: pYX(2, 3);
		}
	}

	@media (max-width: 480px) {
		.inner-tabs__header {
			gap: spacer(1);
		}

		.inner-tabs__tab {
			min-width: 80px;
			font-size: 0.75rem;
			padding: pYX(1, 2);
		}
	}
}
</style>