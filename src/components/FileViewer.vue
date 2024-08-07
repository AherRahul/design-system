<template>
	<div
		ref="fileViewer"
		class="file-viewer"
		:class="`file-viewer--${variant}`"
		tabindex="0"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@click="handleClick"
		@keyup.esc="handleClose"
	>
		<div class="file-viewer__image">
			<div
				v-if="!isHovered"
				class="file-viewer__extension"
			>
				{{ fileExtension }}
			</div>
			<div
				v-else
				class="file-viewer__icon"
				:class="`file-viewer__icon--${variant}`"
			>
				<rds-icon
					height="32"
					width="32"
					name="image-outline"
				/>
			</div>
		</div>
		<div class="file-viewer__info">
			<div class="file-viewer__label">
				<rds-truncate
					width="246"
				>
					{{ trimmedLabel }}
				</rds-truncate>
			</div>
			<div class="file-viewer__file-name">
				<rds-truncate
					width="246"
				>
					{{ fileUrl }}
				</rds-truncate>
			</div>
			<div>
				<a
					class="file-viewer__download"
					:class="`file-viewer__download--${variant}`"
					@click.stop="emit('download-click', true)"
				>
					Download file
				</a>
			</div>
		</div>
	</div>
	<div
		v-if="openVisualizer"
		class="file-viewer__backdrop"
	>
		<div class="file-viewer__visualizer-header">
			<div class="file-viewer__visualizer-label">
				{{ trimmedLabel }}
			</div>
			<div class="file-viewer__visualizer-actions">
				<div
					class="file-viewer__visualizer-download"
					@click="emit('download-click', true)"
				>
					<rds-icon
						height="24"
						width="24"
						name="download-cloud-outline"
					/>
					Download file
				</div>
				<rds-icon
					class="file-viewer__visualizer-close"
					height="24"
					width="24"
					name="x-outline"
					@click="handleClose"
				/>
			</div>
		</div>
		<div
			class="file-viewer__visualizer-image-container"
			@click="handleClose"
		>
			<rds-image
				v-if="allowedExtensions.includes(fileExtension)"
				class="file-viewer__visualizer-image"
				:src="fileUrl"
				@click.stop=""
			/>
			<div
				v-else
				class="file-viewer__visualizer-empty-state"
			>
				<rds-image
					src="https://i.imgur.com/d842Bek.png"
					width="100"
					height="100"
				/>
				Unable to generate a preview of the file.
			</div>
		</div>
	</div>
</template>

<script setup>
import RdsIcon from '../components/Icon.vue';
import { get, last } from 'lodash';
import { computed, ref } from 'vue';
import { colors } from '../utils/constants/colors';
import RdsImage from '../components/Image.vue';
import RdsTruncate from '../components/Truncate.vue';

const emit = defineEmits(
	[
		/**
		* Event that indicates that the backdrop was closed.
		* @event close
		* @type {Event}
		*/
		'close',

		/**
		* Event that indicates that the download action was triggered. The component does not implement the logic
		* download. The logic must be implemented by the developer.
		* @event download-click
		* @type {Event}
		*/
		'download-click'
	]
);

const props = defineProps({
	/**
	 * Specifies the file label. The label must have a maximum of 50 characters.
	 */
	label: {
		type: String,
		required: true,
		default: 'Proof of address',
	},

	/**
	 * Specifies the URL of the file. The URL must contain the file extension
	 * for the preview to be generated.
	 */
	fileUrl: {
		type: String,
		required: true,
		default: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
	},

	/**
	 * Specifies the color variant of the component.
	 */
	variant: {
		type: String,
		default: 'green',
		validator: (value) => colors.find((color) => color.name === value),
	},
})

const isHovered = ref(false);
const openVisualizer = ref(false);
const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

const fileExtension = computed(() => {
	if (props.fileUrl) {
		const fileNameParts = last(props.fileUrl.split('/'));
		const matchedExtension = fileNameParts.match(/\.([A-Za-z]{3,4})/);
		const extension = get(matchedExtension, '1', null);
		if (extension) {
			return extension.toLowerCase();
		}
	}

	return 'file';
})

const trimmedLabel = computed(() => {
	if (props.label.length > 50) {
		return props.label.substring(0, 50);
	}

	return props.label;
})

const handleMouseEnter = () => {
	isHovered.value = true;
}

const handleMouseLeave = () => {
	isHovered.value = false;
}

const handleClick = () => {
	openVisualizer.value = !openVisualizer.value;
	mustDisableExternalScrolls(openVisualizer.value);
}

const handleClose = () => {
	openVisualizer.value = false;
	mustDisableExternalScrolls(openVisualizer.value);
	emit('close', true);
}

const mustDisableExternalScrolls = (value) => {
	document.body.style.overflow = value ? 'hidden' : 'auto';
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.file-viewer {
	width: fit-content;
	min-width: 280px;
	max-width: 350px;
	padding: pa(3);
	border-radius: 12px;
	border: 1px solid $n-30;
	background: $n-0;
	display: flex;
	gap: spacer(3);
	transition: 0.3s ease;

	&:focus {
		outline: none;
	}

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {

				&:hover {
					border: 1px solid $shade-300;
					cursor: pointer;
					transition: 0.3s ease;

				}
		}

	&__image {
		width: 66px;
		height: 66px;
		background-color: $n-20;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__extension {
		@include body-1;
		color: $n-700;
		font-weight: $font-weight-bold;
		justify-items: center;
	}

	&__icon {
		display: flex;
		align-items: center;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				color: $base-color;
			}
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: spacer(1);
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-800;
	}

	&__file-name {
		@include body-2;
		color: $n-700;
		width: 100%;
		max-width: 246px;
	}

	&__download {
		@include body-2;
		cursor: pointer;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $base-color;
		}

		&:hover {
			text-decoration: underline;
		}
	}

	&__backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: $z-index-modal;
		background: rgba(0,0,0, 0.85);
		animation: ease .3s;
	}

	&__visualizer-header {
		height: 64px;
		width: 100%;
		padding: pYX(5, 8);
		background-color: rgba(0,0,0, 0.5);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__visualizer-label {
		@include subheading-2;
		font-weight: $font-weight-bold;
		color: $n-0;
		max-width: 1000px;
	}

	&__visualizer-actions {
		display: flex;
		align-items: center;
		gap: spacer(4);
	}

	&__visualizer-download {
		display: flex;
		align-items: center;
		padding: pYX(2, 4);
		border-radius: $border-radius-lil;
		gap: spacer(2);
		@include body-1;
		font-weight: $font-weight-semibold;
		color: $n-0;
		cursor: pointer;

		&:hover {
			background-color: $n-900;
		}
	}

	&__visualizer-image-container {
		width: 100%;
		height: 90vh;
		padding: pa(5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__visualizer-image {
		max-height: 100%;
		object-fit: cover;
	}

	&__visualizer-close {
		cursor: pointer;
		color: $n-0;
	}

	&__visualizer-empty-state {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		gap: spacer(3);
		max-width: 250px;
		color: $n-0;
		@include subheading-3;
		font-weight: $font-weight-regular;
	}
}

</style>