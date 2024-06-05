<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<div
				class="gauge-chart"
				:style="progressStyle"
			>
				<svg
					:class="`svg--${variant}`"
					viewBox="0 0 110 100"
				>
					<linearGradient
						id="gradient"
						x1="0"
						y1="0"
						x2="0"
						y2="100%"
						gradientTransform="rotate(-340)"
					>
						<stop
							class="stop"
							offset="1%"
						/>
						<stop
							class="stop-2"
							offset="99%"
						/>
					</linearGradient>

					<g transform="scale(1.20) translate(-9.5 -12)">
						<path
							class="indicator-bar"
							d="M30,90 A40,40 0 1,1 80,90"
							fill="none"
						/>

						<path
							fill="none"
							class="indicator-progress"
							d="M30,90 A40,40 0 1,1 80,90"
						/>
					</g>

					<text
						x="50%"
						y="50%"
						dominant-baseline="middle"
						text-anchor="middle"
						class="value"
					>
						{{ formatedValue }}
					</text>

					<text
						x="50%"
						y="62%"
						dominant-baseline="middle"
						text-anchor="middle"
						class="subtitle"
					>
						{{ subtitle }}
					</text>
				</svg>
			</div>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * Sets the progress indicator value of the GaugeChart.
		 * The value must be between 0 and 100.
		 */
		value: {
			type:Number,
			default: 0,
			validator: (value) => value >= 0 && value <= 100,
		},
		/**
		 * The color variant. There are 9 variants implemented: 'green', 'teal', 'turquoise',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' and 'amber'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		 * Size, in pixels, of the component on the screen.
		 */
		size: {
			type:Number,
			default: 300,
		},
		/**
		 * Progress indicator legend.
		 */
		subtitle: {
			type: String,
			default: '',
		},
	},

	computed: {
		progressStyle() {
			return {
				'--value': this.value,
				'--size': this.size,
			};
		},

		chartProgressValue() {
			return 198 * (1 - this.value / 100);
		},

		formatedValue() {
			return `${this.value.toLocaleString('pt-br', {minimumFractionDigits: 1})}%`;
		},
	},
}
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

$stroke-progress: v-bind(chartProgressValue);

.responsive-container {
	height: 100%;
	width: 100%;
}

@keyframes dash {
	from {
		--percentage: 198;
	}

	to {
		--percentage: #{$stroke-progress};
	}
}

@property --percentage {
  syntax: '<number>';
  inherits: true;
  initial-value: 198;
}

.gauge-chart {
	--percentage: #{$stroke-progress};

	svg {
		&.svg {
			@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				--variant: #{$shade-300};
				--variant-dark: #{$shade-500};
			}
		}

		height: calc(var(--size) * 1px);
		margin: auto;
		display: block;
	}

	path {
		stroke-linecap: round;
		stroke-width: 7.5;
	}

	path.indicator-bar {
		stroke: $n-30;
	}

	path.indicator-progress {
		stroke: url(#gradient);
		stroke-dasharray: 198;
		stroke-dashoffset: var(--percentage);
		animation: dash 1s ease-out;
	}

	text.value {
		@include heading-3;
		fill: $n-700;
		font-size: 11px;
		font-weight: 800;
	}

	text.subtitle {
		@include subheading-1;
		font-size: 7px;
		fill: $n-500;
		max-width: 50px;
		overflow-wrap: break-word;
	}

	.stop {
		stop-color: var(--variant);
	}

	.stop-2 {
		stop-color: var(--variant-dark);
	}
}
</style>
