<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<div class="legend__container">
				<div
					v-for="legend in localChartData.datasets"
					:key="legend.label"
					class="legend__item"
					@click="handleLegendClick(legend)"
				>
	
					<div
						class="legend__square"
						:style="`background-color: ${legend.backgroundColor}`"
					/>
					<span
						:class="{
							'legend__text--strikethrough' : legend.hidden
						}">
						{{ legend.label }}
					</span>
				</div>
			</div>

			<Doughnut
				ref="radial-bar-chart"
				:key="key"
				:data="localChartData"
				:options="chartOptions"
				@click="clickHandler"
			/>
		</div>
	</span>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

export default {
	components: {
		Doughnut,
	},

	props: {
		/**
		* Defines the set of data to be shown in the chart.
		* The object must contain the `name` parameter (to identify the data set)
		* and `datasets`, array of objects that will present `label` (indicate the label of the data) and
		* `data` (array with numeric values).
		*/
		data: {
			type: Object,
			required: true,
			default: () => ({
				datasets: [
					{
						label: '',
						data: [],
					}
				]
			})
		},
		/**
		* Customizes the chart's color palette. There are 11 variants implemented:
		* `green`, `teal`, `turquoise`, `blue`, `indigo`, `violet`, `pink`, `red`, `orange`, `amber`, `gray`, `dark`.
		*/
		variant: {
			type: String,
			required: true,
			default: 'green',
			validator: (value) => {
				return ['green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			},
		},
		/**
		* Sets the theme of the chart.
		*/
		theme: {
			type: String,
			required: false,
			default: '',
			validator: (value) => {
				return ['green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			},
		},
		/**
		* Define the chart labels
		*/
		labels: {
			type: Array,
			required: true,
			default: () => [],
		},
		/**
		* Set the chart colors. This prop overrides the variant's shades.
		* The prop expects an Array of color variants. Ex.: ['green', 'turquoise']
		*/
		colors: {
			type: Array,
			default: () => [],
			validator: (value) => {
				const variants = ['green', 'teal', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'];
				return value.every((color) => variants.includes(color));
			},
		},
	},

	data() {
		return {
			sassColorVariables,
			localChartData: {
				datasets: [
					{hidden: false,}
				],
				labels: [],
			},
			localLabels: [],
			palletColors: [],
			themeColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsible for ensuring that the gray and dark colors of the palette do not remove the first two elements
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false, // NOTE: If true it will maintain the original aspect ratio, if false it will be scaled to completely fill the container (This may cause the graphic to appear distorted if the container has a different aspect ratio than the original graphic)
				pieceLabel: {
					mode: 'percentage',
					precision: 1
				},
				// cutout: `${90 - (this.data.length * 15)}%`,
				plugins: {
					legend: {
						display: false,
						labels: {
							usePointStyle: true,
							pointStyle: 'rectRounded',
						},
					},
				}
			},
			key: 0,
			largestValue: 100,
			largestValueDegree: 360 - ((15 / 100) * 360),
		}
	},

	computed: {
		isColorsSet() {
			return this.colors && this.colors.length > 0;
		},

		// NOTE: Function responsible for searching the color in the palette
		computedBackgroundColors() {
			return this.colors.map((bgColor) => {
				const palletColor = this.palletColors.find(color => color.variantName.toLowerCase().includes(bgColor));
				if (palletColor) {
					return palletColor.color400;
				}
			});
		},
	},

	watch: {
		labels: {
			handler(newValue) {
				this.localLabels = newValue;
			},
			immediate: true,
		},

		variant: {
			handler(newValue) {
				if (newValue === 'gray' || newValue === 'dark')  {
					this.deleteFirstTwoColors = true;
				} else {
					this.deleteFirstTwoColors = false;
				}
			},
			immediate: true,
		},

		data: {
			handler(newValue) {
				this.mergeChartDataNoSelect(newValue);
			},
			immediate: true,
		},
	},

	mounted() {

		this.data.forEach(item => {
			if (item.datasets[0].data[0] > this.largestValue) {
				this.largestValue = item.datasets[0].data[0];
			}
			
		})

		this.mergeChartDataNoSelect(this.data);
	},

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstTwoElements();
		},

		computedCutout() {
			let cutout;
			let length = this.localChartData.datasets.reduce((acc, curr) => {
				return acc + (curr.hidden !== true ? 1 : 0);
			}, 0);

			switch (length) {
				case 1:
					cutout = 82;
					break;
				case 2:
					cutout = 55;
					break;
				case 3:
					cutout = 40;
					break;
				case 4:
					cutout = 30;
					break;
				default:
					cutout = 20;
					break;
			}

			this.localChartData.datasets.forEach(dataset => {
				dataset.cutout = `${cutout}%`;
			});
		},

		themeResolver() {
			this.themeColors = this.paleteBuilder(this.sassColorVariables.chartThemes);
		},

		// NOTE: Function responsible for removing the first two elements from the palette when it is not gray or Dark Neutrals
		removeFirstTwoElements() {
			for (let i = 0; i < this.palletColors.length; i++) {
				const color = this.palletColors[i];

				if (this.deleteFirstTwoColors === false) {
					color.colorShades.splice(0, 2);
					color.colorTokens.splice(0, 2);
					color.colorData.splice(0, 2);
				}
			}
		},

		

		// NOTE: Function that receives an array of graph data.
		mergeChartDataNoSelect(chartData) {
			const mergedData = { labels: this.localLabels, datasets: [] };

			chartData.forEach(radialBarData => {
				radialBarData.datasets.forEach(state => {
					const dataset = {
						label: state.label,
						data: state.data,
						circumference: (this.largestValueDegree * state.data / this.largestValue),
						borderRadius: 16,
						hidden: false,
					};

					mergedData.datasets.push(dataset);
					this.computedCutout();
					this.key++;
				});
			});

			if (this.theme.length && this.colors.length === 0) {
				this.themeResolver();
				const backgroundColor = this.isColorsSet ? this.computedBackgroundColors : this.generateBackgroundColorWithTheme();
				this.setColors(mergedData.datasets, backgroundColor);
			} else {
				this.palete();
				const backgroundColor = this.isColorsSet ? this.computedBackgroundColors : this.generateBackgroundColor();
				this.setColors(mergedData.datasets, backgroundColor);
			}
	
			this.localChartData = mergedData;
		},

		// NOTE: Function responsible for searching the color in the palette
		generateBackgroundColor() {
			const variantLowercase = this.variant.toLowerCase();
			const palletColor = this.palletColors.find(color => color.variantName.toLowerCase().includes(variantLowercase));
			if (palletColor) {
				return palletColor.colorShades;
			}
			return [];
		},

		generateBackgroundColorWithTheme() {
			const variantLowercase = this.theme.toLowerCase();
			const palletColor = this.themeColors.find(color => color.variantName.toLowerCase().includes(variantLowercase));
			if (palletColor) {
				return palletColor.colorShades;
			}
			return [];
		},

		// NOTE: Function responsible for setting backgroundColor
		// This check occurs to ensure that the same set of data for more than one selected item has the same color
		setColors(datasets, backgroundColor) {
			const colors = {};

			datasets.forEach(dataset => {
				const objectName = dataset.name;

				if (!colors[objectName]) {
					colors[objectName] = backgroundColor.slice();
				}

				dataset.backgroundColor = colors[objectName].splice(0, dataset.data.length);
				dataset.borderRadius = 16;
			});
		},

		clickHandler(e) {
			const donutChartInstance = this.$refs['radial-bar-chart'].chart;
			const elementClicked = donutChartInstance.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)

			const sanitizedChartData = {
				index: elementClicked[0].index,
				data: elementClicked[0].element.$context.raw,
				x: elementClicked[0].element.x,
				y: elementClicked[0].element.y,
				backgroundColor: elementClicked[0].element.$context.element.options.backgroundColor.trim(),
			};
			
			this.$emit('chart-click', sanitizedChartData);
		},

		handleLegendClick(legend) {
			this.localChartData.datasets.forEach(dataset => {
				if (dataset.label === legend.label) {
					dataset.hidden = !dataset.hidden;
				}
			});

			this.computedCutout();
			this.key++;
		}
	}
}
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';
.responsive-container{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
}

.legend {
	&__square {
		height: 16px;
		width: 16px;
		border-radius: 4px;
		outline: 3px solid $n-0;
	}
	
	&__item {
		display: flex;
		gap: 8px;
		align-items: center;
		@include caption;
		font-weight: $font-weight-regular;
		color: $n-500;
		cursor: pointer;
	}
	
	&__container{
		display: flex;
		gap: 12px;
	}
	
	&__text--strikethrough  {
		text-decoration: line-through;
		text-decoration-thickness: 2px;
	}
}

</style>
