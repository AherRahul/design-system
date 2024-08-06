<template>
	<span id="callout-card">
		<div :class="resolveClass('callout-card__container')">
			<div class="image__container">
				<img
					:class="resolveClass('image__content')"
					:src="image"
					:alt="imageDescription"
				>
			</div>
			<div :class="resolveClass('content__container')">
				<div :class="resolveClass('content')">
					<p class="content__title">
						{{ title }}
					</p>
  
					<span class="content__text">
						<slot name="text">
							{{ text }}
						</slot>
					</span>
				</div>
				<div>
					<slot name="action">
						<rds-button
							id="content-button"
							:variant="actionButtonVariant"
							:text="actionButtonText"
							:secondary="actionButtonSecondary"
							:disabled="actionButtonDisabled"
							@click="$emit('action-button-click', true)"
						/>
					</slot>
				</div>
			</div>
		</div>
	</span>
</template>
  
<script>
import RdsButton from './Button.vue';
  
export default {
	components: {
		RdsButton,
	},
  
	props: {
		title: {
			type: String,
			default: 'AlertCard title',
			required: true,
		},
		text: {
			type: String,
			default: 'AlertCard Subtitle',
		},
		image: {
			type: String,
			default: '',
			required: true,
		},
		imageDescription: {
			type: String,
			default: 'Image by CalloutCard',
		},
		actionButtonVariant: {
			type: String,
			default: 'green',
		},
		actionButtonText: {
			type: String,
			default: 'Ok',
		},
		actionButtonSecondary: {
			type: Boolean,
			default: false,
		},
		actionButtonDisabled: {
			type: Boolean,
			default: false,
		},
		compact: {
			type: Boolean,
			default: false,
		},
	},
  
	methods: {
		resolveClass(element) {
			return this.compact ? `${element}--compact` : element;
		},
	},
};
</script>
  
  <style lang="scss">
  @import '../assets/sass/tokens.scss';
  
  #callout-card .callout-card {
	align-items: center;
	display: flex;
	border: 1px solid $n-40;
	border-radius: 16px;
	padding: pa(7);
  
		&__container {
			@extend .callout-card;
			width: 700px;
  
		&--compact {
			@extend .callout-card;
			padding: pYX(2,6);
		}
	}
  
	&__content-container {
		width: 100%;
	}
  }
  
  #callout-card .image {
	&__container {
		margin: mr(7);
	}
  
	&__content {
		max-height: 150px;
		max-width: 150px;
	
		&--compact {
			max-height: 90px;
			max-width: 120px;
		}
	}
  }
  
  #callout-card .content {
	margin: mb(4);
  
	&--compact {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 529px;
	}
  
	&__title {
		color: $n-700;
		display: block;
		@include subheading-3;
		margin: mb(2);
	}
  
	&__text {
		color: $n-700;
		@include body-2;
	}
  
	&__container {
		&--compact {
			align-items: center;
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
	}
  }
  
  @media screen and (max-width: 768px) {
	#callout-card .callout-card {
		flex-direction: column;
		align-items: flex-start;
	
		&__container {
			width: 100%;
		}
	
		&__content-container {
			width: 100%;
			margin-top: 1rem;
		}
	
		.image__content {
			max-height: 100px;
			max-width: 100px;
		}
	}
  }
  
  @media screen and (max-width: 480px) {
	#callout-card .callout-card {
		&__container {
			padding: pa(4);
		}
	
		.content__title {
			@include subheading-3;
		}
	
		.image__content {
			max-height: 75px;
			max-width: 75px;
		}
	}
  }
  </style>
  