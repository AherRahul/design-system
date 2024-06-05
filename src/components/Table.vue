<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<table class="table__container">
		<tr class="table__header">
			<th
				v-if="allowSelection"
				class="table__select-item"
				:class="resolveHeaderItemClass(0)"
			>
				<cds-checkbox
					id="select-all-rows"
					v-model="selectAll"
					class="table__select-checkbox"
					no-text
					:variant="selectionVariant"
					@update:model-value="handleSelectAll"
				/>
			</th>
			<th
				v-for="(field, index) in computedFields"
				:key="index"
				:class="resolveHeaderItemClass(index)"
			>
				<div class="table__header-item-content">
					<!--
						@slot Slot used to render custom items for the table header. Item data relating to the column can be accessed through the `data` property. Slot scope data can be accessed in the following format: slot-scope={ data }
					-->
					<slot
						v-if="hasSlot($slots, 'header-item')"
						name="header-item"
						:data="field"
					/>
					<cds-clickable
						v-else
						:id="`sort-icon-${field.key}`"
						:clickable="sortable"
						@click.stop="handleSortBy(field.key)"
					>
						{{ field.label }}
						<cds-icon
							v-if="sortable && field.key !== localSortBy"
							class="table__sort-icon"
							height="13"
							width="13"
							name="swap-vertical-arrows-outline"
						/>
						<cds-icon
							v-else-if="sortable && localSortDesc"
							class="table__sort-icon"
							height="13"
							width="13"
							name="sort-descending-duotone"
						/>
						<cds-icon
							v-else-if="sortable"
							class="table__sort-icon"
							height="13"
							width="13"
							name="sort-ascending-duotone"
						/>
					</cds-clickable>
				</div>
			</th>
		</tr>
		<tr
			v-for="(item, itemIndex) in localItems"
			:key="itemIndex"
			:class="resolveItemClass()"
		>
			<td
				v-if="allowSelection"
				class="table__select-item"
				:class="resolveContentItemClass(itemIndex, 0)"
			>
				<cds-checkbox
					:id="`select-row-${itemIndex}`"
					v-model="select[itemIndex]"
					class="table__select-checkbox"
					no-text
					:variant="selectionVariant"
					@update:model-value="handleSelectRow"
				/>
			</td>
			<td
				v-for="(field, fieldIndex) in computedFields"
				:key="fieldIndex"
				:class="resolveContentItemClass(itemIndex, fieldIndex)"
			>
				<!--
					@slot Slot used to render custom items for table content. Item data for the row can be accessed through the `data` property, while the key for the column can be accessed through the `field` property. Slot scope data can be accessed in the following format: slot-scope={ `data`, `field`, `rowIndex` and `colIndex` }
				-->
				<slot
					name="table-item"
					:data="item"
					:field="field.key"
					:row-index="itemIndex"
					:col-index="fieldIndex"
				>
					{{ item[field.key] }}
				</slot>
			</td>
		</tr>
	</table>
</template>

<script>
import {
	startCase,
	findIndex,
	orderBy,
	isEqual,
} from 'lodash';
import hasSlot from '../utils/methods/hasSlot';
import CdsCheckbox from './Checkbox.vue';
import CdsIcon from '../components/Icon.vue';
import CdsClickable from '../components/Clickable.vue';

export default {
	components: {
		CdsCheckbox,
		CdsIcon,
		CdsClickable,
	},

	props: {
		/**
		 * Saves the selected items from the table.
		 */
		modelValue: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * Array containing the items to be displayed in the table. Items must be in the following format:
		 *
		 *
		 * ``{ 'exampleKey1': 'exampleValue1', 'exampleKey2': 'exampleValue2' }``
		 *
		 * With the 'key' being the same as the table field where the value should be displayed
		 */
		items: {
			type: Array,
			required: true,
			default: () => ([]),
		},
		/**
		 * Array containing the fields to be displayed in the table header. Fields must be in the following format:
		 *
		 * ``{ key: 'exampleKey1', label: 'exampleLabel1' }``
		 *
		 * Or in simple string format (``'fieldkey'``). In this case, the value displayed in the table header will be the string converted to [Start Case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialized_usage).
		 *
		 * If this property is not sent, the table header will be assembled according to the `keys` of the first object in the array sent through the `items` prop.
		 */
		fields: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * Boolean, informs whether the style will be changed on line hover.
		 */
		hover: {
			type: Boolean,
			default: false,
		},
		/**
		 * Boolean, informs whether checkboxes should be displayed to select lines.
		 */
		allowSelection: {
			type: Boolean,
			default: false,
		},
		/**
		 * The checkboxes variant. There are 10 variants: 'teal', 'green', 'blue',
		 * 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' and 'dark'.
		 */
		selectionVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * Boolean, informs whether the sorting UI should be displayed on items
		 * from header
		 */
		sortable: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies the property (column key) used for sorting.
		 * By default, items are displayed in the sequence defined by the `items` array
		 */
		sortBy: {
			type: String,
			default: null,
		},
		/**
		 * Boolean, informs that the ordering must be descending, by default
		 * sorting is ascending (`sortDesc: false`).
		 */
		sortDesc: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			selectAll: false,
			select: [],
			localSortDesc: this.sortDesc,
			localSortBy: this.sortBy,
			localItems: this.items,
		};
	},

	computed: {
		computedFields() {
			if (this.fields.length > 0) {
				return this.fields.map(field => {
					if (typeof field === 'object') {
						return field;
					}

					return {
						key: field,
						label: startCase(field),
					};
				});
			}

			return this.items.length > 0
				? Object.keys(this.items[0]).map(key =>{
					return {
						key: key,
						label: startCase(key),
					}
				})
				: [];
		},
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					if (!newValue.length) {
						this.resetSelect();
						return;
					}

					newValue.forEach((item) => {
						const index = findIndex(this.localItems, item);
						if (index > -1) {
							this.select[index] = true;
						}
					});
				}
			},
			immediate: true,
		},

		items(newValue, oldValue) {
			if (!isEqual(newValue, oldValue)) {
				this.localItems = newValue;
				this.resetSelect();
			}
		},

		sortBy: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.handleSortBy(newValue);
				}
			},
			immediate: true,
		},

		select:{
			handler(newValue) {
				const selectedItems = this.localItems.filter((item, index) => newValue[index]);

				/**
				* Event that indicates that the Select value has changed
				* @event update:modelValue
				* @type {Event}
				*/
				this.$emit('update:modelValue', selectedItems);
			},
			deep: true,
		},
	},

	methods: {
		hasSlot,

		resetSelect() {
			this.selectAll = false;
			for (let index = 0; index < this.localItems.length; index++) {
				this.select[index] = false;
			}
		},

		handleSelectAll() {
			for (let index = 0; index < this.localItems.length; index++) {
				this.select[index] = this.selectAll;
			}
		},

		handleSelectRow(value) {
			if (this.selectAll && !value) {
				this.selectAll = false;
				return;
			}
			this.selectAll = this.select.reduce((allSelected, itemSelected ) => allSelected && itemSelected);
		},

		handleSortBy(sortBy) {
			this.resetSelect();
			if (this.localSortBy === sortBy && this.localSortDesc) {
				this.localSortBy = null;
				this.localItems = this.items;
				return;
			}
			const orders = this.localSortDesc ? 'asc' : 'desc';
			this.localSortDesc = this.localSortBy === sortBy ? !this.localSortDesc : false;
			this.localSortBy = sortBy;
			this.localItems = orderBy(this.items, [this.localSortBy], [orders]);
		},

		resolveHeaderItemClass(index) {
			if (index !== 0 && index !== (this.fields.length - 1)) {
				return 'table__header-item';
			}

			return index === 0 ? 'table__header-item--first' : 'table__header-item--last';
		},

		resolveContentItemClass(itemIndex, index) {
			if (!(itemIndex === this.items.length - 1)) {
				return 'table__item';
			}

			if (index !== 0 && index !== (this.fields.length - 1)) {
				return 'table__item--common';
			}

			return index === 0 ? 'table__item--first' : 'table__item--last';
		},

		resolveItemClass() {
			return this.hover ? 'table__content--hoverable' : '';
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.table {
	&__container {
		border: 1px solid $n-30;
		border-collapse: separate;
		border-radius: $border-radius-extra-small;
		border-spacing: 0px;
		width: 100%;
	}

	&__select-item {
		width: 50px;
	}

	&__select-checkbox {
		scale: 0.75;
		margin-top: 1px;
	}

	&__sort-icon {
		color: $n-200;
		margin-left: 6px;
	}

	&__header {
		background-color: $n-10;

		&-item {
			@include body-2;
			border-bottom: 1px solid $n-30;
			font-weight: 700;
			padding: spacer(3) spacer(4);
			text-align: inherit;
			overflow: auto;
			word-wrap: break-word;
			white-space: pre-line;

			&--first {
				border-top-left-radius: $border-radius-extra-small;

				@extend .table__header-item;
			}

			&--last {
				border-top-right-radius: $border-radius-extra-small;

				@extend .table__header-item;
			}
		}

		&-item-content {
			display: flex;
			align-items: center;
		}
	}

	&__content--hoverable {
		&:hover {
			background-color: rgba($n-10, .7);
		}
	}

	&__item {
		@include body-2;
		border-bottom: 1px solid $n-30;
		font-size: 14px;
		max-width: 400px;
		padding: pa(4);
		vertical-align: top;
		overflow: auto;
		word-wrap: break-word;
		white-space: pre-line; 

		&--first {
			border-bottom: none;
			border-bottom-left-radius: $border-radius-extra-small;

			@extend .table__item;
		}

		&--common {
			border-bottom: none;

			@extend .table__item;
		}

		&--last {
			border-bottom: none;
			border-bottom-right-radius: $border-radius-extra-small;

			@extend .table__item;
		}
	}
}

</style>
