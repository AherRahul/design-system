<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span>
		<div
			class="responsive-container"
		>
			<Bar
				:is="'bar'"
				:data="localChartData"
				:options="chartOptions"
				:plugins="plugins"
			/>
		</div>
	</span>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs'
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

// Register the "point" element in the registry (It becomes necessary for point markings)
Chart.register(...registerables);

export default {
	components: {
		Bar,
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
				return ['green', 'turquoise', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray', 'dark'].includes(value);
			}
		},
		/**
		 * Defina as labels do gráfico
		 */
		labels: {
			type: Array,
			required: true,
			default: () => [],
		},
		/**
		 * Configures the percentage occupied by the graph bar. (0.1-1).
		 */
		barWidth: {
			type: Number,
			default: 1,
		},
	},

	data() {
		return {
			sassColorVariables,
			localChartData: {},
			localLabels: [],
			palletColors: [],
			deleteFirstTwoColors: false, //NOTE: Responsible for ensuring that the gray and dark colors of the palette are not removed, the first two elements
			chartOptions: {
				scales: {
					x: {
						stacked: true,
						grid: {
							color: 'transparent',
						},
					},
					y: {
						stacked: true,
						grid: {
							color: '#DFE5EC',
						},
					},
				},
				responsive: true,
				maintainAspectRatio: false, // NOTE: If true it will maintain the original aspect ratio, if false it will be scaled to completely fill the container (This may cause the graphic to appear distorted if the container has a different aspect ratio than the original graphic)
				categoryPercentage: null, //NOTE: Configures the percentage occupied by the graph bar. (0-1)
				plugins: {
					tooltip: {
						callbacks: {
							beforeTitle: function (context) {
								return `${context[0].dataset.name}`;
							}
						}
					},
					legend: {
						display: true,
						labels: {
							usePointStyle: true,
							pointStyle: 'rectRounded',
							padding: 50,
						},
					},
				},
			},
			plugins: [{
				id: 'custom_legend_margin',
				beforeInit: function(chart) {
					const originalFit = chart.legend.fit;
					chart.legend.fit = function() {
						originalFit.call(this);
						this.height += 12;
					};
				}
			}],
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

		barWidth: {
			handler(newValue) {
				if (newValue >= 0.1 && newValue <= 1) {
					this.chartOptions.categoryPercentage = newValue;
				} else {
					this.chartOptions.categoryPercentage = 1;
				}
			},
			immediate: true,
		},
	},

	methods: {
		paleteBuilder,

		palete() {
			this.palletColors = this.paleteBuilder(this.sassColorVariables.palete);
			this.removeFirstElement();
		},

		// NOTE: Function responsible for removing the first two elements from the palette when it is not gray or Dark Neutrals
		removeFirstElement() {
			for (let i = 0; i < this.palletColors.length; i++) {
				const color = this.palletColors[i];

				if (this.deleteFirstTwoColors === false) {
					color.colorShades.splice(0, 1);
					color.colorTokens.splice(0, 2);
					color.colorData.splice(0, 1);
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
						variant: state.variant,
						borderRadius: 6,
					};
					mergedData.datasets.push(dataset);
				});
			});

			const isMulticolored = typeof this.data[0].datasets[0]?.variant !== 'undefined';

			this.palete();

			if (isMulticolored) {
				this.setMultiColors(mergedData.datasets);
				this.localChartData = mergedData;
			} else {
				const backgroundColor = this.getPalete();
				this.setColors(mergedData.datasets, backgroundColor);
				this.localChartData = mergedData;
			}

		},

		getPalete(variant = this.variant) {
			const variantLowercase = variant.toLowerCase();
			const palletColor = this.palletColors.find(color => color.variantName.toLowerCase().includes(variantLowercase));

			if (palletColor) {
				return palletColor.colorShades;
			}
		},

		setMultiColors(datasets) {
			const colors = {};
			let shadePosition = 0;

			this.chartOptions.plugins.legend.display = true;

			datasets.forEach((dataset, index) => {
				const objectName = dataset.name;
				let colorIndex = 1;

				if (index % 5 === 0) {
					shadePosition = 0;
				}

				colorIndex += shadePosition;
				shadePosition++;

				colors[objectName] = this.getPalete(dataset.variant)[colorIndex];

				dataset.backgroundColor = colors[objectName];
				dataset.borderRadius = 6;
			});
		},

		// NOTE: Function responsible for setting backgroundColor
		// This check occurs to ensure that the same set of data for more than one selected item has the same color
		setColors(datasets, backgroundColor) {
			const colors = {};
			this.chartOptions.plugins.legend.display = true;

			datasets.forEach(dataset => {
				const objectName = dataset.name;
				let colorIndex;

				if (datasets.length === 1) {
					colorIndex = 2;
					colors[objectName] = backgroundColor[colorIndex];
					this.chartOptions.plugins.legend.display = false;
				}

				if (!colors[objectName]) {
					colorIndex = Object.keys(colors).length % backgroundColor.length;
					colors[objectName] = backgroundColor[colorIndex];
				}

				dataset.backgroundColor = colors[objectName];
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