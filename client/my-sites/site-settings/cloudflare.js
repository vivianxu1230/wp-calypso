/**
 * External dependencies
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslate } from 'i18n-calypso';
import { Button, CompactCard } from '@automattic/components';

/**
 * Internal dependencies
 */
import SettingsSectionHeader from 'calypso/my-sites/site-settings/settings-section-header';
import { composeAnalytics, recordTracksEvent } from 'calypso/state/analytics/actions';

const Cloudflare = () => {
	const translate = useTranslate();
	const dispatch = useDispatch();

	const recordClick = () => {
		dispatch(
			composeAnalytics( recordTracksEvent( 'calypso_performance_settings_cloudflare_click' ) )
		);
	};

	return (
		<>
			<SettingsSectionHeader title={ translate( 'Cloudflare CDN' ) } />

			<CompactCard>
				<p>
					{ translate(
						'Use the Cloudflare global server network to optimize your site content and create a faster experience for your users regardless of their device or location.'
					) }
				</p>

				<Button
					primary
					onClick={ recordClick }
					href="https://www.CLOUDFLARELINK.com"
					target="_blank"
				>
					{ translate( 'Learn more' ) }
				</Button>
			</CompactCard>
		</>
	);
};

export default Cloudflare;
