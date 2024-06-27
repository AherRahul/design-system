<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<Line
				:data="localChartData"
				:options="chartOptions"
			/>
		</div>
	</span>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';
import 'chartjs-adapter-luxon';

// Register the "point" element in the registry (It becomes necessary for point markings)
Chart.register(...registerables);

export default {
	components: {
		// eslint-disable-next-line vue/no-reserved-component-names
		Line,
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
		* Sets the maximum and minimum suggested ranges for the X axis.
		* If the dataset values ​​exceed the suggested ranges, 
		* these will be disregarded, with the dataset prevailing.
		*/
		xAxisRange: {
			type: Array,
			default: () => [0, 100],
		},
		/**
		* Sets the suggested maximum and minimum ranges for the Y axis.
		* If the dataset values ​​exceed the suggested ranges, 
		* these will be disregarded, with the dataset prevailing.
		*/
		yAxisRange: {
			type: Array,
			default: () => [0, 100],
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
				return ['green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			}
		},
		/**
		* Define o tema do gráfico.
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
		 * Set the text to be displayed for the caption. When set to true
		 * (true), expected to display the name of the data. When set
		 * as false, the name of the dataset will be defined
		*/
		showLabelName: {
			type: Boolean,
			required: true,
			default: true,
		},
		/**
		 * Define whether to apply fill to the chart.
		*/
		fill: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define whether to transform the graph from solid lines to dashed lines.
		*/
		isDashed: {
			type: Boolean,
			default: false,
		},
		/**
		 * Set dashed line effect. Specifically, the value [a, b] defines the pattern
		 * of line strokes, where `a` represents the length of each solid stroke and `b`
		 * represents the length of each space between the dashes.
		 */
		borderDash: {
			type: Array,
			default: () => [],
		},
		/**
		 * Set the smoothing level for the graph lines.
		 */
		smoothing: {
			type: Number,
			default: 0.3,
		},
		/**
		* Objeto de configuação de animation. O objeto sobrescreve a configuração padrão.
		*/
		scales: {
			type: Object,
			default: () => ({}),
		},
		/**
		* Objeto de configuação de animation. O objeto sobrescreve a configuração padrão.
		*/
		animation: {
			type: Object,
			default: () => ({}),
		},
		/**
		* Objeto de configuação de plugins. O objeto sobrescreve a configuração padrão.
		*/
		plugins : {
			type: Object,
			default: () => ({}),
		}
	},

	data() {
		return {
			sassColorVariables,
			localChartData: {},
			localLabels: [],
			palletColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsible for ensuring that the gray and dark colors of the palette do not remove the first two elements
			chartOptions: {
				interaction: {
					intersect: false,
				},
				scales: {
					x: {
						suggestedMin: this.xAxisRange[0],
						suggestedMax: this.xAxisRange[1],
						display: true,
						title: {
							display: true
						},
					},
					y: {
						suggestedMin: this.yAxisRange[0],
						suggestedMax: this.yAxisRange[1],
						display: true,
						title: {
							display: true,
						},
					},
					...this.scales,
				},
				tension: this.smoothing,
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
					...this.plugins,
				},
				fill: this.fill,
				animation: {
					...this.animation,
				}
			},
		}
	},

	watch: {
		labels: {
			handler(newValue) {
				this.localLabels = newValue
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

		isDashed: {
			handler(newValue) {
				if (newValue === true) {
					this.checkDashed();
				}
			},
			immediate: true,
		},
	},

	mounted() {
		this.chartOptions = {
			...this.chartOptions,
			...this.scales,
		}
	},

	methods: {
		paleteBuilder,

		palete() {
			if (this.theme.length) {
				this.palletColors = this.paleteBuilder(this.sassColorVariables.chartThemes);
			} else {
				this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
				this.removeFirstTwoElements();
			}
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
						label: this.showLabelName ? state.name :state.label,
						data: state.data,
						name: state.name,
						borderRadius: 6,
					};
					mergedData.datasets.push(dataset);
				});
			});
			this.palete();
			const backgroundColor = this.generateBackgroundColor();
			this.setColors(mergedData.datasets, backgroundColor);
			this.localChartData = mergedData;
		},

		// NOTE: Function responsible for searching the color in the palette
		// To define opacity, hexadecimal is applied (80 = 50%)
		generateBackgroundColor() {
			let variantLowercase = this.variant.toLowerCase();
			if (this.theme.length) {
				variantLowercase = this.theme.toLowerCase();
			}
			const palletColor = this.palletColors.find(color => {
				return color.variantName.toLowerCase() === variantLowercase
			});

			if (palletColor) {
				if (this.fill) {
					const withOpacity = palletColor.colorShades.map(color => color + '80');
					return withOpacity;
				}
				return palletColor.colorShades;
			}
			return [];
		},

		// NOTE: Function responsible for setting backgroundColor
		// This check occurs to ensure that the same set of data for more than one selected item has the same color
		setColors(datasets, backgroundColor) {
			const colors = {};

			datasets.forEach((dataset, index) => {
				const objectName = dataset.name;

				if (!colors[objectName]) {
					colors[objectName] = backgroundColor.slice();
				}

				if (dataset.data.length > 0) {
					dataset.backgroundColor = colors[objectName][index % colors[objectName].length];
					dataset.borderColor = colors[objectName][index % colors[objectName].length];
				}

				dataset.borderRadius = 6;
			});
		},

		checkDashed() {
			this.chartOptions.borderDash = [this.borderDash[0], this.borderDash[1]];
		}
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