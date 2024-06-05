<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<vue-slider 
		v-bind="attrs"
		v-model="innerValue"
		:enable-cross="false"  
		:min="min"
		:max="max"
		:tooltip="showMergeTooltip ? 'none' : 'always'"
		:class="`slider--${variant}`"
	>
		<template #process="{ style }">
			<div 
				class="vue-slider-process" 
				:style="style"
			>
				<div 
					v-if="showMergeTooltip"
					:class="[
						'merge-tooltip',
						'vue-slider-dot-tooltip-inner',
						'vue-slider-dot-tooltip-inner-top',
					]"
				>
					<span
						v-if="innerValue[0] !== innerValue[1]"
					>
						{{ innerValue[0] }} - {{ innerValue[1] }}
					</span>
					<span
						v-else
					>
						{{ innerValue[0] }}
					</span>
				</div>
			</div>
		</template>
		<template #tooltip="tooltip">
			<!-- @slot Scoped slot for custom rendering of tooltips.
				The 'tooltip' property, which can be accessed through the slot,
				contains pos (component position in %), index (the slider index),
				value (the value of the slider), focus (whether the slider is in the focus state or not),
				disabled (whether the slider is disabled or not)
			-->
			<slot
				name="tooltip"
				:tooltip="tooltip"
			/>
		</template>
	</vue-slider>
</template>
<script>
import vueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css';

export default {
	components: {
		vueSlider,
	},

	props: {
		/**
		* The minimum value of the slider.
		*/
		min: {
			type:Number,
			default: 0,
			required: true,
		},
		/**
			* The maximum value of the slider.
		*/
		max: {
			type:Number,
			default: 100,
			required: true,
		},
		/**
			* Prop used as v-model. Returns the selected positions in the slider.
		*/
		modelValue: {
			type: Array,
			default: () => [0, 100],
			required: true,
		},
		/**
		 * The color variant. There are 10 variants implemented: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' and 'white'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
	},

	data() {
		return {
			innerValue: [0, 100],
		};
	},

	computed: {
		attrs() {
			const {
				min,
				max,
				...attrs
			} = this.$attrs;

			return attrs;
		},

		showMergeTooltip() {
			return this.innerValue[1] - this.innerValue[0] < 10
		},
	},

	watch: {
		modelValue(value) {
			this.innerValue = value;
		},

		innerValue(value) {
			this.$emit('update:modelValue', value);
		},
	},

	mounted() {
		this.innerValue = this.modelValue;
	},
}
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.vue-slider-dot {
	width: 18px !important;
	height: 18px !important;
}

.vue-slider {
	height: 3px !important;
}

.vue-slider-dot-tooltip-top {
	top: spacer(n1);
}

.vue-slider-dot-tooltip-inner {
	@include caption;
	background-color: transparent;
	border-color: transparent;
	color: $n-800;
}

.merge-tooltip {
	position: absolute;
	left: 50%;
	bottom: 100%;
	transform: translate(-50%, -15px);
}

.vue-slider-rail {
	background-color: $n-50;
}

.slider {
	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {

		& > .vue-slider-rail > .vue-slider-process {
			background-color: $shade-300 !important;
		}

		& > .vue-slider-rail > .vue-slider-dot > .vue-slider-dot-handle {
			background-color: $base-color !important;
			box-shadow: none;
		}
	}
}
</style>
