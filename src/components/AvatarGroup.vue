<template>
	<div class="avatar-group__container">
		<cds-tooltip
			v-for="(avatarData, index) in listAvatars"
			:key="index"
			position="bottom"
			:text="avatarData.name"
			slim
		>
			<cds-avatar
				v-bind="avatarData"
				:size="size"
				:clickable="false"
			/>
		</cds-tooltip>

		<cds-clickable
			v-if="showAvatarCounter"
			id="avatar-counter"
			clickable
			@click="showPopover = true"
		>
			<cds-avatar
				:size="size"
				:clickable="false"
				:name="avatarCounterText"
				variant="gray"
				class="avatar-group__counter"
			/>
		</cds-clickable>

		<cds-popover
			v-model="showPopover"
			target-id="avatar-counter"
			width="180"
			right-aligned
			vertical-fluid
		>
			<div
				v-for="(avatarData, index) in popoverAvatars"
				:key="index"
				class="avatar__data"
			>
				<cds-avatar
					v-bind="avatarData"
					size="sm"
					:clickable="false"
				/>

				<cds-truncate width="180">
					<span class="avatar__name">{{ avatarData.name }}</span>
				</cds-truncate>
			</div>
		</cds-popover>
	</div>
</template>
<script>
import CdsAvatar from './Avatar.vue';
import CdsClickable from './Clickable.vue';
import CdsPopover from './Popover.vue';
import CdsTruncate from './Truncate.vue';
import CdsTooltip from './Tooltip.vue';

export default {
	components: {
		CdsAvatar,
		CdsClickable,
		CdsPopover,
		CdsTruncate,
		CdsTooltip,
	},

	props: {
		/**
		 * Size of AvatarGroup avatars
		 */
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Array of objects containing the properties of Avatars. 
		 * The props accepted here are the same as those in the Avatar component API.
		 */
		avatars: {
			type: Array,
			default: () => [],
		},
		/**
		 * The maximum number of avatars to be displayed in the list.
		 */
		maxCount: {
			type: Number,
			default: 4,
		},
	},

	data() {
		return {
			listAvatars: this.avatars.slice(0, this.maxCount),
			popoverAvatars: this.avatars.slice(this.maxCount, this.avatars.length),
			showPopover: false,
		};
	},

	computed: {
		showAvatarCounter() {
			return this.maxCount < this.avatars.length;
		},

		avatarCounterText() {
			return `+ ${this.avatars.length - this.maxCount}`;
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.avatar-group {
	&__container {
		display: flex;
	
		//FIXME: Fixed number. If we find a solution
		// that is not hardcoded, it's worth changing here
		@for $i from 20 to 0 {
			& > .tooltip:nth-child(#{$i - 1}) {
				z-index: ($i - 20) * -1;
			}
		}
	
		& > .tooltip:not(:first-child) {
			margin: ml(n1);
		}
	
		& > * {
			outline: 4px solid $n-0;
		}
	}

	&__counter {
		margin: ml(n1);
	}
}

.avatar__data {
	display: flex;
	align-items: center;
}

.avatar__name {
	margin: ml(3);
}

.tooltip {
	border-radius: $border-radius-circle;
}

.scrollable__container {
	& > .avatar__data:not(:first-child) {
		margin: mt(4);
	}
}

.popover {
	& > .avatar__data:not(:first-child) {
		margin: mt(4);
	}
}
</style>
