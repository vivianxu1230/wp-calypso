/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { isSectionNameEnabled } from 'calypso/sections-filter';
import {
	getAllPartners,
	hasFetchedPartners,
	isPartnerPortal,
} from 'calypso/state/partner-portal/selectors';
import QueryJetpackPartnerPortalPartners from 'calypso/components/data/query-jetpack-partner-portal-partners';
import SectionNav from 'calypso/components/section-nav';
import NavTabs from 'calypso/components/section-nav/tabs';
import NavItem from 'calypso/components/section-nav/item';

/**
 * Style dependencies
 */
import './style.scss';

interface Props {
	className: string;
}

function PortalNav( { className }: Props ) {
	const translate = useTranslate();
	const partnersFetched = useSelector( hasFetchedPartners );
	const partners = useSelector( getAllPartners );
	const isManagingSites = ! useSelector( isPartnerPortal );
	const selectedText = isManagingSites
		? translate( 'Manage Sites' )
		: translate( 'Partner Portal' );
	const show = partnersFetched && partners.length > 0;

	if ( ! isSectionNameEnabled( 'jetpack-cloud-partner-portal' ) ) {
		return null;
	}

	return (
		<>
			<QueryJetpackPartnerPortalPartners />

			{ show && (
				<SectionNav
					selectedText={ selectedText }
					className={ classnames( 'portal-nav', className ) }
				>
					<NavTabs label={ translate( 'Portal' ) }>
						<NavItem path="/" selected={ isManagingSites }>
							{ translate( 'Manage Sites' ) }
						</NavItem>
						<NavItem path="/partner-portal" selected={ ! isManagingSites }>
							{ translate( 'Partner Portal' ) }
						</NavItem>
					</NavTabs>
				</SectionNav>
			) }
		</>
	);
}

PortalNav.defaultProps = {
	className: '',
};

export default PortalNav;
