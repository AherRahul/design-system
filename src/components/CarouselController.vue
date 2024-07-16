<template>
	<div>
		<div
			class="carousel-controller"
			:class="{ 'carousel-controller--fluid': fluid }"
		>
			<span
				:class="{
					'carousel-controller__previous-button--disabled': disabledBack,
					'carousel-controller__previous-button': !disabledBack
				}"
				@click="handleClickBack"
			/>

			<div>
				<span
					v-if="!simple"
					class="carousel-controller__text"
				>
					{{ currentNumberOfItemsMin }}-{{ currentNumberOfItemsMax }} of {{ total }}
				</span>
				<span
					v-else
					class="carousel-controller__text"
				>
					{{ currentNumberOfItemsMin }} of {{ numberOfPages }}
				</span>
	
				<span class="carousel-controller__property"> {{ propertyName }} </span>
			</div>

			<span
				:class="{
					'carousel-controller__next-button--disabled': disabledForward,
					'carousel-controller__next-button': !disabledForward
				}"
				@click="handleClickForward"
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * The name of the property to be used for displaying data.
		**/
		propertyName: {
			type: String,
			default: 'Data',
			required: false,
		},

		/**
		 * The number of items to display per page in the carousel.
		**/
		perPage: {
			type: Number,
			required: true,
		},

		/**
		 * The total number of items available in the carousel.
		**/
		total: {
			type: Number,
			required: true,
		},

		/**
		 * A boolean flag to enable a simple mode for the carousel.
		**/
		simple: {
			type: Boolean,
			default: false,
			required: false,
		},

		/**
		 * A boolean flag to enable fluid layout for the carousel.
		**/
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	data() {
		return {
			currentNumberOfItemsMin: 1,
			currentNumberOfItemsMax: this.perPage,
		};
	},

	computed: {
		numberOfPages() {
			return Math.ceil(this.total / this.perPage);
		},

		disabledForward() {
			return (this.currentNumberOfItemsMax >= this.total) 
			|| (this.simple && (this.currentNumberOfItemsMin >= this.numberOfPages));
		},

		disabledBack() {
			return this.currentNumberOfItemsMin === 1;
		}
	},

	// Event emitted when the user clicks the back button to navigate to the previous set of items.
	events: {
		'click-back': {
			description: 'Emitted when the user clicks the back button to navigate to the previous set of items.',
		},

		// Event emitted when the user clicks the forward button to navigate to the next set of items.
		'click-forward': {
			description: 'Emitted when the user clicks the forward button to navigate to the next set of items.',
		},
	},

	methods: {
		/**
		 * Emitted when the user clicks the back button to navigate to the previous set of items.
		 */
		handleClickBack() {
			if (this.disabledBack) return;

			if (this.simple && (this.currentNumberOfItemsMin > 1)) {
				this.currentNumberOfItemsMin -= 1;
				this.$emit('click-back', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
				return;
			} else if (this.simple && (this.currentNumberOfItemsMin === 1)) {
				return;
			}

			if (this.currentNumberOfItemsMin - this.perPage <= 0) {
				this.currentNumberOfItemsMin = 1;
				this.currentNumberOfItemsMax = this.perPage;
				this.$emit('click-back', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
			} else {
				this.currentNumberOfItemsMax -= this.currentNumberOfItemsMax - this.currentNumberOfItemsMin + 1;
				this.currentNumberOfItemsMin -= this.perPage;
				this.$emit('click-back', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax});
			}
		},

		/**
		 * Emitted when the user clicks the forward button to navigate to the next set of items.
		 */
		handleClickForward() {
			if (this.disabledForward) return;

			if (this.simple && (this.currentNumberOfItemsMin < this.numberOfPages)) {
				this.currentNumberOfItemsMin += 1;
				this.$emit('click-forward', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
				return;
			} else if (this.simple && (this.currentNumberOfItemsMin === this.numberOfPages)) {
				return;
			}

			if ((this.currentNumberOfItemsMax + this.perPage) > this.total) {
				this.currentNumberOfItemsMin = this.currentNumberOfItemsMax + 1;
				this.currentNumberOfItemsMax = this.total;
				this.$emit('click-forward', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
			} else {
				this.currentNumberOfItemsMin = this.currentNumberOfItemsMax + 1;
				this.currentNumberOfItemsMax += this.perPage;
				this.$emit('click-forward', { min: this.currentNumberOfItemsMin - 1, max: this.currentNumberOfItemsMax + 1 });
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.carousel-controller {
	position: relative;
	width: fit-content;
	display: flex;
	align-items: center;

	&--fluid {
		width: 100%;
		justify-content: space-between;
	}

	&__text {
		margin: ml(7);
		font-size: 14px;
		color: $n-500;
		font-weight: $font-weight-semibold;
	}

	&__property {
		margin: mTRBL(0, 7, 0, 2);
		font-size: 14px;
		color: $n-800;
		font-weight: $font-weight-semibold;
	}

	&__previous-button {
		display: block;
		height: 32px;
		width: 32px;
		cursor: pointer;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	
		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}
	
		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid $n-400;
			border-radius: $border-radius-small;
			transition: all 100ms ease-in-out;
			transform: rotate(-90deg);
		}

		&--disabled {
			@extend .carousel-controller__previous-button;

			&::before,
			&::after {
				content: '';
				width: 0;
				height: 0;
			}
	
			&::before {
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				border-bottom: 6px solid $n-100;
				border-radius: $border-radius-small;
				transition: all 100ms ease-in-out;
				transform: rotate(-90deg);
			}
		}
	}
	
	&__next-button {
		display: block;
		height: 32px;
		width: 32px;
		cursor: pointer;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	
		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}
	
		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid $n-400;
			border-radius: $border-radius-small;
			transition: all 100ms ease-in-out;
			transform: rotate(90deg);
		}

		&--disabled {
			@extend .carousel-controller__next-button;

			&::before,
			&::after {
				content: '';
				width: 0;
				height: 0;
			}
		
			&::before {
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				border-bottom: 6px solid $n-100;
				border-radius: $border-radius-small;
				transition: all 100ms ease-in-out;
				transform: rotate(90deg);
			}
		}
	}
}
</style>
