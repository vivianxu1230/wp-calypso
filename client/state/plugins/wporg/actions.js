/**
 * External dependencies
 */
import { get } from 'lodash';
import debugFactory from 'debug';
const debug = debugFactory( 'calypso:wporg-data:actions' );

/**
 * Internal dependencies
 */
import { fetchPluginInformation } from 'calypso/lib/wporg';
import { normalizePluginData } from 'calypso/lib/plugins/utils';
import {
	PLUGINS_WPORG_PLUGIN_RECEIVE,
	PLUGINS_WPORG_PLUGIN_REQUEST,
} from 'calypso/state/action-types';

import 'calypso/state/plugins/init';

// TODO: fix the selector in `selectors.js` to not return `true` by default
function isFetching( state, pluginSlug ) {
	return get( state, [ 'plugins', 'wporg', 'fetchingItems', pluginSlug ], false );
}

export function fetchPluginData( pluginSlug ) {
	return async ( dispatch, getState ) => {
		if ( isFetching( getState(), pluginSlug ) ) {
			return;
		}

		dispatch( {
			type: PLUGINS_WPORG_PLUGIN_REQUEST,
			pluginSlug,
		} );

		try {
			const data = await fetchPluginInformation( pluginSlug );

			debug( 'plugin details fetched from .org', pluginSlug, data );
			dispatch( {
				type: PLUGINS_WPORG_PLUGIN_RECEIVE,
				pluginSlug,
				data: normalizePluginData( { detailsFetched: Date.now() }, data ),
			} );
		} catch ( error ) {
			debug( 'plugin details failed to fetch from .org', pluginSlug, error );
			dispatch( {
				type: PLUGINS_WPORG_PLUGIN_RECEIVE,
				pluginSlug,
				error,
			} );
		}
	};
}
