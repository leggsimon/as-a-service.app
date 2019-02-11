import React from 'react';
import Head from '../components/head/head';
import AnalyticsTag from '../components/analytics-tag/analytics-tag';
import SocialLink from '../components/social/social';
import '../scss/index.scss';

const Home = () => {
	return (
		<>
			<Head title="As A Service | Coming Soon" />
			<main>
				<h1>Things… as services.</h1>
				<p>Coming Soon</p>
			</main>
			<footer>
				<div class="footer-content">
					<p>A project by Simon</p>
					<span class="icons">
						<SocialLink social="github" />
						<SocialLink social="twitter" />
					</span>
				</div>
			</footer>
			<AnalyticsTag />
		</>
	);
};

export default Home;
