<!-- src/components/Grid/Col.vue -->
<template>
	<div :class="colClasses">
		<slot />
	</div>
</template>
  
<script>
import hasSlot from '../utils/methods/hasSlot';

export default {
	name: 'RdsCol',
	props: {
		/**
		 * Specifies whether the highlight will be static or animated.
		 */
		cols: {
			type: Number,
			required: true,
			validator: value => value >= 1 && value <= 12,
			default: 3,
		},
		/**
		 * Specifies whether the highlight will be static or animated.
		 */
		offset: {
			type: Number,
			default: 0,
			validator: value => value >= 0 && value <= 11,
		},
	},
	computed: {
		colClasses() {
			return {
				[`col-${this.cols}`]: true,
				[`offset-${this.offset}`]: this.offset > 0,
				'rds-col': true
			};
		},
	},
	methods: {
		hasSlot,
	},
};
</script>
  
  <style scoped>
  .rds-col {
    padding-right: 15px;
    padding-left: 15px;
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
  </style>
  