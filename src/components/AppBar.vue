<template>
	<div class="app-bar__container">
		<img
			v-if="raBrand"
			class="app-bar__logo--cs"
			src="https://rahulaher.netlify.app/img/logo/word-white-colored.svg"
			alt="Rahul Aher logo"
		>

		<img
			v-else-if="rdsBrand"
			class="app-bar__logo--sv"
			src="https://rahulaher.netlify.app/img/logo/glyph-white-colored.svg"
			alt="rahul aher logo"
		>

		<!-- @slot Slot used to render the logo on the AppBar.-->
		<slot
			class="app-bar__logo"
			name="brand"
		/>

		<div class="app-bar__icons-grid">
			<rds-clickable
				v-if="!hideNotification"
				clickable
				@click="handleClick('notification')"
			>
				<rds-icon
					height="24"
					width="24"
					light
					name="notification-bell-outline"
				/>
			</rds-clickable>

			<rds-clickable
				v-if="!hideHelp"
				clickable
				@click="handleClick('help')"
			>
				<rds-icon
					height="24"
					width="24"
					light
					name="help-outline"
				/>
			</rds-clickable>

			<rds-clickable
				v-if="!hideSettings"
				clickable
				@click="handleClick('settings')"
			>
				<rds-icon
					height="24"
					width="24"
					light
					name="settings-outline"
				/>
			</rds-clickable>

			<!-- @slot Slot used to add information about the user to the AppBar.-->
			<slot
				v-if="hasUserInfoSlot"
				name="user-info"
				class="user-info__container"
			/>

			<div
				v-else
				class="user-info__avatar-container"
			>
				<div class="user-info__container">
					<span class="user-info__name">{{ userName }}</span>
					<span class="user-info__description">{{ userDescription }}</span>
				</div>

				<rds-avatar
					:name="userName"
					variant="white"
					size="md"
					:clickable="clickable"
					@click="handleClick('avatar')"
				>
					<template
						v-if="clickable"
						#dropdown-content
					>
						<!-- @slot Slot used for rendering Avatar dropdown content.-->
						<slot name="dropdown-content" />
					</template>
				</rds-avatar>
			</div>

			<div
				v-if="!hideAppSwitcher"
				class="app-switcher__container"
			>
				<rds-divider
					vertical
					width="30"
				/>

				<rds-clickable
					clickable
					@click="handleClick('app-switcher')"
				>
					<rds-icon
						height="24"
						width="24"
						light
						name="grid-outline"
					/>
				</rds-clickable>
			</div>

			<rds-clickable
				v-if="!hideLogout"
				clickable
				@click="handleClick('logout')"
			>
				<rds-icon
					height="24"
					width="24"
					light
					name="logout-outline"
				/>
			</rds-clickable>
		</div>

		<!-- @slot Slot used for module icon rendering.-->
		<div
			v-if="hasAppSlot"
			class="app-switcher"
		>
			<slot name="app-info" />
		</div>
	</div>
</template>

<script>
import RdsIcon from './Icon.vue';
import RdsDivider from './Divider.vue';
import RdsAvatar from './Avatar.vue';
import RdsClickable from './Clickable.vue';

export default {
	components: {
		RdsIcon,
		RdsAvatar,
		RdsDivider,
		RdsClickable,
	},

	props: {
		/**
		 * Controls the display of the settings icon.
		 */
		hideSettings: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the display of the help icon.
		 */
		hideHelp: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls notification icon display.
		 */
		hideNotification: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls notification icon display.
		 */
		hideAppSwitcher: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controls the display of the Logout icon.
		 */
		hideLogout: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indicates whether the logo to be displayed is from RDS.
		 */
		rdsBrand: {
			type: Boolean,
			default: false,
		},
		/**
		 * Indicates whether the logo to be displayed is from Cidade Saudável.
		 */
		raBrand: {
			type: Boolean,
			default: false,
		},
		/**
		 * User name displayed on Avatar.
		 */
		userName: {
			type: String,
			default: null,
		},
		/**
		 *User description shown under name.
		 */
		userDescription: {
			type: String,
			default: null,
		},
		/**
		 * Enables or disables clicking on the Avatar component.
		 */
		clickable: {
			type: Boolean,
			default: false,
		}
	},

	computed: {
		hasAppSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'app-info');
		},

		hasUserInfoSlot(){
			return Object.keys(this.$slots).some(slot => slot === 'user-info');
		},

		gridTemplateColumnsResolver() {
			return this.hasAppSlot ? '1fr 1fr 1fr' : '1fr 1fr';
		},

		gridTemplateAreasResolver() {
			// eslint-disable-next-line quotes
			return this.hasAppSlot ? "'app logo icons'" : "'logo icons'";
		},

		logoAlignmentResolver() {
			return this.hasAppSlot ? 'center' : 'flex-start';
		},
	},

	methods: {
		handleClick(element) {
			/**
			* Event emitted when AppBar elements are clicked.
			* This emit is dynamic, generating the events:
			*
			* `settings-click`
			*
			* `help-click`
			*
			* `notification-click`
			*
			* `avatar-click`
			*
			* `app-switcher-click`
			*
			* `logout-click`
			* @event `${element}-click`
			* @type {Event}
			*/
			this.$emit(`${element}-click`, true);
		},
	},
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.app-bar {
	&__container {
		align-items: center;
		background-color: $appbar-color;
		display: grid;
		grid-template-areas: v-bind(gridTemplateAreasResolver);
		grid-template-columns: v-bind(gridTemplateColumnsResolver);
		height: 60px;
		padding: px(4);
	}

	&__logo {
		grid-area: logo;
		height: 40px;
		justify-self: v-bind(logoAlignmentResolver);

		&--cs {
			@extend .app-bar__logo;
		}

		&--sv {
			@extend .app-bar__logo;
			height: 28px;
		}
	}

	&__icons-grid {
		align-items: center;
		display: flex;
		gap: spacer(2);
		grid-area: icons;
		justify-self: end;
	}
}

.user-info {
	&__avatar-container {
		display: contents;
	}

	&__container{
		align-items: flex-end;
		color: $n-0;
		display: flex;
		flex-direction: column;
		margin: ml(4)
	}

	&__name {
		@include caption;
		font-weight: $font-weight-semibold;
	}

	&__description {
		@include overline;
		font-weight: $font-weight-regular;
	}
}

.app-switcher {
	& > div {
		align-items: center;
		display: flex;
		grid-area: app;
	}

	&__container {
		display: contents;
	}
}

.app-name {
	color: $n-0;
	font-weight: $font-weight-regular;
	margin: mTRBL(1, 0, 0, 2);
	@include caption;
}
</style>