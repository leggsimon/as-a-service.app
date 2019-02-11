import React from 'react';

const analyticsJS = `
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'UA-134175591-1');`;

const AnalyticsTag = () => (
	<>
		<script
			async
			src="https://www.googletagmanager.com/gtag/js?id=UA-134175591-1"
		/>
		<script dangerouslySetInnerHTML={{ __html: analyticsJS }} />
	</>
);

export default AnalyticsTag;
