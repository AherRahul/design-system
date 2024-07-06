<template>
	<div :class="colClasses">
		<slot />
	</div>
</template>
  
<script>
export default {
	name: 'RdsCol',
	props: {
		cols: {
			type: Number,
			required: true,
			validator: value => value >= 1 && value <= 12,
		},
		offset: {
			type: Number,
			default: 0,
			validator: value => value >= 0 && value <= 11,
		},
		colsAtS: {
			type: Number,
			default: null,
			validator: value => value >= 1 && value <= 12,
		},
		colsAtM: {
			type: Number,
			default: null,
			validator: value => value >= 1 && value <= 12,
		},
		colsAtL: {
			type: Number,
			default: null,
			validator: value => value >= 1 && value <= 12,
		},
		colsAtXl: {
			type: Number,
			default: null,
			validator: value => value >= 1 && value <= 12,
		},
	},
	computed: {
		colClasses() {
			return {
				[`col-${this.cols}`]: this.isCurrentBreakpoint('default'),
				[`offset-${this.offset}`]: this.offset > 0,
				[`col-s-${this.colsAtS}`]: this.colsAtS !== null && this.isCurrentBreakpoint('s'),
				[`col-m-${this.colsAtM}`]: this.colsAtM !== null && this.isCurrentBreakpoint('m'),
				[`col-l-${this.colsAtL}`]: this.colsAtL !== null && this.isCurrentBreakpoint('l'),
				[`col-xl-${this.colsAtXl}`]: this.colsAtXl !== null && this.isCurrentBreakpoint('xl'),
				'rds-col': true,
			};
		},
	},
	methods: {
		isCurrentBreakpoint(breakpoint) {
			const width = window.innerWidth;
			switch (breakpoint) {
				case 's':
					return width <= 576;
				case 'm':
					return width > 576 && width <= 768;
				case 'l':
					return width > 768 && width <= 992;
				case 'xl':
					return width > 992;
				case 'default':
				default:
					return true;
			}
		},
	},
};
</script>
  
  <style scoped>
	.rds-col {
		box-sizing: border-box;
		padding: 0 8px; /* Default gutter size */
	}

	/* Styles for s (600px and wider) */
	@media (min-width: 600px) {
		.rds-col {
			padding: 0 8px; /* Adjust as needed for s breakpoint */
		}
	}

	/* Styles for m (768px and wider) */
	@media (min-width: 768px) {
		.rds-col {
			padding: 0 8px; /* Adjust as needed for m breakpoint */
		}
	}

	/* Styles for l (1000px and wider) */
	@media (min-width: 1000px) {
		.rds-col {
			padding: 0 8px; /* Adjust as needed for l breakpoint */
		}
	}

	/* Styles for xl (1200px and wider) */
	@media (min-width: 1200px) {
		.rds-col {
			padding: 0 8px; /* Adjust as needed for xl breakpoint */
		}
	}
  
  .col-1 { flex: 0 0 8.33%; max-width: 8.33%; }
  .col-2 { flex: 0 0 16.66%; max-width: 16.66%; }
  .col-3 { flex: 0 0 25%; max-width: 25%; }
  .col-4 { flex: 0 0 33.33%; max-width: 33.33%; }
  .col-5 { flex: 0 0 41.66%; max-width: 41.66%; }
  .col-6 { flex: 0 0 50%; max-width: 50%; }
  .col-7 { flex: 0 0 58.33%; max-width: 58.33%; }
  .col-8 { flex: 0 0 66.66%; max-width: 66.66%; }
  .col-9 { flex: 0 0 75%; max-width: 75%; }
  .col-10 { flex: 0 0 83.33%; max-width: 83.33%; }
  .col-11 { flex: 0 0 91.66%; max-width: 91.66%; }
  .col-12 { flex: 0 0 100%; max-width: 100%; }
  
  .offset-1 { margin-left: 8.33%; }
  .offset-2 { margin-left: 16.66%; }
  .offset-3 { margin-left: 25%; }
  .offset-4 { margin-left: 33.33%; }
  .offset-5 { margin-left: 41.66%; }
  .offset-6 { margin-left: 50%; }
  .offset-7 { margin-left: 58.33%; }
  .offset-8 { margin-left: 66.66%; }
  .offset-9 { margin-left: 75%; }
  .offset-10 { margin-left: 83.33%; }
  .offset-11 { margin-left: 91.66%; }
  .offset-12 { margin-left: 100%; }
  
  /* Responsive classes */
  @media (max-width: 576px) {
	.col-s-1 { flex: 0 0 8.33%; max-width: 8.33%; }
	.col-s-2 { flex: 0 0 16.66%; max-width: 16.66%; }
	.col-s-3 { flex: 0 0 25%; max-width: 25%; }
	.col-s-4 { flex: 0 0 33.33%; max-width: 33.33%; }
	.col-s-5 { flex: 0 0 41.66%; max-width: 41.66%; }
	.col-s-6 { flex: 0 0 50%; max-width: 50%; }
	.col-s-7 { flex: 0 0 58.33%; max-width: 58.33%; }
	.col-s-8 { flex: 0 0 66.66%; max-width: 66.66%; }
	.col-s-9 { flex: 0 0 75%; max-width: 75%; }
	.col-s-10 { flex: 0 0 83.33%; max-width: 83.33%; }
	.col-s-11 { flex: 0 0 91.66%; max-width: 91.66%; }
	.col-s-12 { flex: 0 0 100%; max-width: 100%; }
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
	.col-m-1 { flex: 0 0 8.33%; max-width: 8.33%; }
	.col-m-2 { flex: 0 0 16.66%; max-width: 16.66%; }
	.col-m-3 { flex: 0 0 25%; max-width: 25%; }
	.col-m-4 { flex: 0 0 33.33%; max-width: 33.33%; }
	.col-m-5 { flex: 0 0 41.66%; max-width: 41.66%; }
	.col-m-6 { flex: 0 0 50%; max-width: 50%; }
	.col-m-7 { flex: 0 0 58.33%; max-width: 58.33%; }
	.col-m-8 { flex: 0 0 66.66%; max-width: 66.66%; }
	.col-m-9 { flex: 0 0 75%; max-width: 75%; }
	.col-m-10 { flex: 0 0 83.33%; max-width: 83.33%; }
	.col-m-11 { flex: 0 0 91.66%; max-width: 91.66%; }
	.col-m-12 { flex: 0 0 100%; max-width: 100%; }
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
	.col-l-1 { flex: 0 0 8.33%; max-width: 8.33%; }
	.col-l-2 { flex: 0 0 16.66%; max-width: 16.66%; }
	.col-l-3 { flex: 0 0 25%; max-width: 25%; }
	.col-l-4 { flex: 0 0 33.33%; max-width: 33.33%; }
	.col-l-5 { flex: 0 0 41.66%; max-width: 41.66%; }
	.col-l-6 { flex: 0 0 50%; max-width: 50%; }
	.col-l-7 { flex: 0 0 58.33%; max-width: 58.33%; }
	.col-l-8 { flex: 0 0 66.66%; max-width: 66.66%; }
	.col-l-9 { flex: 0 0 75%; max-width: 75%; }
	.col-l-10 { flex: 0 0 83.33%; max-width: 83.33%; }
	.col-l-11 { flex: 0 0 91.66%; max-width: 91.66%; }
	.col-l-12 { flex: 0 0 100%; max-width: 100%; }
  }
  
  @media (min-width: 993px) {
	.col-xl-1 { flex: 0 0 8.33%; max-width: 8.33%; }
	.col-xl-2 { flex: 0 0 16.66%; max-width: 16.66%; }
	.col-xl-3 { flex: 0 0 25%; max-width: 25%; }
	.col-xl-4 { flex: 0 0 33.33%; max-width: 33.33%; }
	.col-xl-5 { flex: 0 0 41.66%; max-width: 41.66%; }
	.col-xl-6 { flex: 0 0 50%; max-width: 50%; }
	.col-xl-7 { flex: 0 0 58.33%; max-width: 58.33%; }
	.col-xl-8 { flex: 0 0 66.66%; max-width: 66.66%; }
	.col-xl-9 { flex: 0 0 75%; max-width: 75%; }
	.col-xl-10 { flex: 0 0 83.33%; max-width: 83.33%; }
	.col-xl-11 { flex: 0 0 91.66%; max-width: 91.66%; }
	.col-xl-12 { flex: 0 0 100%; max-width: 100%; }
  }
  </style>
  