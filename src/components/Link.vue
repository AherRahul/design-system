<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="link__container"
		:class="{
			'link__container--sm': size === 'sm',
			'link__container--md': size === 'md',
			'link__container--lg': size === 'lg',
			'link__container--bold': bold,
		}"
	>
		<a
			:href="href"
			:target="newTab ? '_blank' : false"
		>
			<!-- @slot Default slot for rendering custom link text content. -->
			<slot class="link__text">
				{{ text }}
			</slot>
		</a>
	</div>
</template>

<script>
export default {
	props: {
		/**
		* Redirect URL.
		*/
		href: {
			type: String,
			required: true,
		},
		/**
		* Prop used to redirect the link from a new tab.
		*/
		newTab: {
			type: Boolean,
			default: false,
		},
		/**
		* Text used in the URL address for the user.
		*/
		text: {
			type: String,
			required: true,
		},
		/**
		* Text used in the URL address for the user.
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		* Text used in the URL address for the user.
		*/
		bold: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.link__container {
	display: inline;
	width: auto;

	a {
		color: $bn-400;
		text-decoration: none;
		transition: $interaction;
		border-bottom: 1px solid transparent;
	}

	a:visited {
		color: $bn-500;
	}

	a:hover {
		color: $bn-500;
		border-bottom: 1px solid $bn-500;
		transition: $interaction;
		cursor: pointer;
	}

	&--sm > a {
		@include caption;
	}

	&--md > a {
		@include body-2;
	}

	&--lg > a {
		@include body-1;
	}

	&--bold > a {
		font-weight: $font-weight-bold;
	}
}
</style>
