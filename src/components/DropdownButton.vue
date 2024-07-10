<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<span
			:id="id"
			:class="dropDownButtonClasses"
			class="dropdown-button__container"
			@click="activeSelection"
		>
			<span class="dropdown-button__text">{{ text }} </span>

			<rds-chevron
				animate
				size="sm"
				:light="!secondary"
				:direction="isActive ? 'bottom' : 'top'"
			/>
		</span>

		<div
			v-if="isActive"
			v-on-click-outside="hide"
			:style="dynamicStyle"
			class="dropdown-button__dropdown"
		>
			<div
				v-for="(item, index) in items"
				:key="index"
			>
				<!--
                    Event emitted when Dropdown actions are clicked.
					@event action-click
					@type {Event}
				-->
				<div
					class="dropdown__container"
					@click="handleOptionClick(item.name, index)"
				>
					<rds-icon
						class="dropdown__icon"
						height="22"
						width="22"
						:name="item.icon"
					/>
					<span class="dropdown__text">{{ item.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import vClickOutside from 'click-outside-vue3';
import RdsChevron from './Chevron.vue';
import RdsIcon from './Icon.vue';
export default {
	components: {
		RdsIcon,
		RdsChevron,
	},
	directives: {
		'on-click-outside': vClickOutside.directive,
	},
	props: {
		/**
		* Defines the list of DropdownButton items to be
		* shown. The list items must be
		* objects with path or route, and with a label
		*/
		items: {
			type: Array,
			default: () => ([]),
			required: true,
		},
		/**
		* The DropdownButton variant. There are 9 variants: 'turquoise', 'green', 'blue',
		* 'violet', 'pink', 'red', 'orange', 'amber' and 'gray'.
		*/
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		* Specifies whether the DropdownButton version is the secondary one. This property has
		* higher prevalence than the `variant` prop.
		*/
		secondary: {
			type: Boolean,
			default: false,
		},
		/**
		* Dropdown content.
		*/
		text: {
			type: String,
			default: 'Content',
			required: true,
		},
		/**
		* Controls the size of the Dropdown popover (in pixels).
		* The size is never smaller than the width of the button.
		*/
		dropdownWidth: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			id: null,
			isActive: false,
		};
	},
	computed: {
		dynamicStyle() {
			const filterPillDomReference = document.getElementById(this.id);
			if (!filterPillDomReference) {
				return null;
			}
			const filterWidth = parseFloat(window.getComputedStyle(filterPillDomReference).width);
			if (filterWidth > this.dropdownWidth) {
				return {
					'--width': `${filterWidth}px`,
				};
			}
			return {
				'--width': `${this.dropdownWidth}px`,
			};
		},
		dropDownButtonClasses() {
			if (this.secondary) {
				return 'dropdown-button__container--secondary ';
			}
			return `dropdown-button__container--${this.variant}`;
		}
	},
	mounted() {
		this.id = `dropdown-button$-${this._uid}`;
	},
	methods: {
		activeSelection() {
			if (this.disabled) {
				return;
			}
			this.isActive = !this.isActive;
			/**
			* Event indicating that the DropdownButton was clicked
			* @event click
			* @type {Event}
			*/
			this.$emit('button-click', true);
		},
		hide() {
			this.isActive = !this.isActive;
		},
		handleOptionClick(actionName, index) {
			this.isActive = !this.isActive;
			this.$emit('action-click', [actionName, index]);
		}
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.dropdown-button {
	&__container {
		display: inline-flex;
		align-items: center;
		padding: px(5);
		border-radius: $border-radius-extra-small;
		cursor: pointer;
		height: 40px;
		background-color: $n-10;
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $n-0;
			background-color: $base-color;
			outline: 1px solid $shade-500;
		}
		&--secondary {
			color: $n-700;
			outline: 1px solid $n-100;
			background-color: $n-10;
		}
	}
	&__text {
		@include body-2;
		font-weight: $font-weight-semibold;
		margin: mr(2);
	}
	&__dropdown {
		min-width: var(--width);
		background-color: $n-0;
		padding: pa(2);
		border-radius: $border-radius-extra-small;
		box-shadow: 0px 0px 8px rgba($n-900, .08);
		outline: 1px solid $n-30;
		z-index: 999999999;
		color: $n-700;
		position: absolute;
		margin: mt(2);
		display: flex;
		flex-direction: column;
		gap: 8px;
		
	}
}
.dropdown {
	&__container {
		display: flex;
		gap: 12px;
		align-items: center;
		cursor: pointer;
		border-radius: 6px;
		padding: pa(2);
	
		&:hover {
			background-color: $n-20;
		}
	}
	
	&__text {
		color: $n-600;
		@include body-2;
		padding: py(1)
	}
	
	&__icon {
		color: $n-600;
	}
}
</style>
