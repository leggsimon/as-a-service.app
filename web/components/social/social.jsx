import React from 'react';
import { GitHubIcon, TwitterIcon } from '../icons/icons';

const SocialLink = props => {
	const { icon, href } = {
		github: {
			icon: <GitHubIcon />,
			href: 'https://github.com/leggsimon',
		},
		twitter: {
			icon: <TwitterIcon />,
			href: 'https://twitter.com/simonleggsays',
		},
	}[props.social];

	return (
		<a
			alt={`Visit Simon on ${props.social}`}
			class={`${props.social}-link`}
			href={href}
		>
			{icon}
		</a>
	);
};

export default SocialLink;
