<template>
	<div
		v-if="internalShow"
		class="toolbar__container"
	>
		<div
			:class="{
				'toolbar--fixed': float,
				'toolbar--light': light,
				'toolbar--dark': !light,
			}"
		>
			<!-- @slot Slot used for rendering text in the component.-->
			<slot
				name="description"
			/>

			<div
				v-if="hasActionSlot"
				class="toolbar__buttons-container"
			>
				<!-- @slot Slot for rendering buttons on the ActionBar.-->
				<slot
					name="actions"
				/>
			</div>

			<div
				v-else
				class="toolbar__buttons-container"
			>
				<div
					v-for="(action, index) in actions"
					:key="index"
					class="toolbar__button"
				>
					<!--
						Event emitted when buttons are clicked.
						@event click
						@type {Event}
					-->
					<rds-button
						:id="`btn-${index + 1}`"
						:secondary="light"
						variant="dark"
						@click="$emit('click', action)"
					>
						<span>{{ action }}</span>
					</rds-button>
				</div>
			</div>

			<div
				v-if="dismissible"
				:class="light ? 'toolbar__icon--light' : 'toolbar__icon--dark'"
				@click="handleClose"
			>
				<rds-icon
					name="x-outline"
					height="20"
					width="20"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import RdsIcon from '../components/Icon.vue';
import RdsButton from '../components/Button.vue';

export default {
	components: {
		RdsIcon,
		RdsButton,
	},

	props: {
		/**
		 *  Controls the display of the modal.
		 */
		show: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Makes the ActionBar float above the view content, 
		* placing it at the bottom of the page
		*/
		float: {
			type: Boolean,
			default: false,
		},
		/**
		 * Prop that displays the ActionBar's close button.
		 */
		dismissible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Specifies whether the ActionBar version is light.
		 */
		light: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indicates the buttons to be displayed on the ActionBar.
		 */
		actions: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			internalShow: false,
		}
	},

	computed: {
		hasActionSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'actions');
		},
	},

	watch: {
		show(value) {
			this.internalShow = value;
		},
	},

	mounted() {
		this.internalShow = this.show;
	},

	methods: {
		handleClose() {
			this.internalShow = false;

			/**
			* Event emitted when the "X" button is clicked.
			* @event close
			* @type {Event}
			*/
			this.$emit('close', true);
		},
	}
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.toolbar {
	align-items: center;
	border-radius: $border-radius-small;
	bottom: 72px;
	box-shadow: $shadow-md;
	display: flex;
	justify-content: space-between;
	min-width: 400px;
	padding: pYX(3, 4);
	width: fit-content;
	z-index: $z-index-toolbar;
	
	&__container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	
	&__buttons-container {
		display: flex;
		justify-content: space-between;
		margin: ml(3);
	}

	&__button {
		margin: mx(1);
		padding: px(2);
	}

	&--dark {
		background-color: $n-800;
		border: 1px solid $n-700;
		color: $n-10;
		
		@extend .toolbar;
	}

	&--light {
		background-color: $n-10;
		border: 1px solid $n-30;
		color: $n-800;
		
		@extend .toolbar;
	}

	&--fixed {
		position: fixed;
	}

	&__icon {
		&--dark {
			align-items: center;
			background-color: $n-800;
			border-radius: $border-radius-circle;
			cursor: pointer;
			display: flex;
			justify-content: center;
			margin: ml(1);
			padding: pa(1);
		}
		
		&--dark:hover {
			background-color: $n-900;
		}
		
		&--light {
			align-items: center;
			background-color: $n-30;
			border-radius: $border-radius-circle;
			cursor: pointer;
			display: flex;
			justify-content: center;
			margin: ml(1);
			padding: pa(1);
		}
		
		&--light:hover {
			background-color: $n-40;
		}
	}
}

// .button--dark--active, .button--secondary--active {
// 	background-image: linear-gradient(to right, rgba(239,68,68,1) 0%, rgba(190,24,93,1) 100%);
// 	transition: all .3s ease;
// 	&:hover{
// 		animation: bg-shift 2s linear infinite;
// 		transform: scale(1.1);
// 	}
// }

// @keyframes bgshift {
// 	0%, 100% {
// 		background-position: 0 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// }

</style>
