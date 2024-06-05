<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<Pie
				:data="localChartData"
				:options="chartOptions"
			/>
		</div>
	</span>
</template>

<script>
import { Pie } from 'vue-chartjs'
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';


export default {
	components: {
		Pie,
	},

	props: {
		/**
		 * Defines the set of data to be shown in the chart.
		 * The object must contain the `name` parameter (to identify the dataset)
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
			localChartData: {},
			localLabels: [],
			palletColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsible for ensuring that the gray and dark colors of the palette do not remove the first two elements
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false, // NOTE: If true it will maintain the original aspect ratio, if false it will be scaled to completely fill the container (This may cause the graphic to appear distorted if the container has a different aspect ratio than the original graphic)
				pieceLabel: {
					mode: 'percentage',
					precision: 1
				},
				plugins: {
					tooltip: {
						callbacks: {
							beforeTitle: function (context) {
								return `${context[0].dataset.name}`;
							},
						}
					},
					legend: {
						display: true,
						labels: {
							usePointStyle: true,
							pointStyle: 'rectRounded',
						},
					},
				}
			},
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

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstTwoElements();
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

		// NOTE: Add dataset.name field with the name of the respective object
		addDataSetNames() {
			this.data.forEach(item => {
				item.datasets.forEach(dataset => {
					dataset.name = item.name;
				});
			});
		},

		// NOTE: Function that receives an array of graph data.
		mergeChartDataNoSelect(data) {
			// data.labels = this.localLabels;
			const mergedData = { labels: this.localLabels, datasets: [] };
			this.addDataSetNames();
			data.forEach(obj => {
				obj.datasets.forEach(state => {
					const dataset = {
						label: state.label,
						data: state.data,
						name: state.name,
						borderRadius: 6,
					};
					mergedData.datasets.push(dataset);
				});
			});
			this.palete();
			const backgroundColor = this.isColorsSet ? this.computedBackgroundColors : this.generateBackgroundColor();
			this.setColors(mergedData.datasets, backgroundColor);
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
				dataset.borderRadius = 6;
			});
		},
	}
}
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';
.responsive-container{
	width: 100%;
	height: 100%;
}
</style>