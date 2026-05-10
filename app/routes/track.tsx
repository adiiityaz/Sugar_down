import type {MetaFunction} from 'react-router';
import sugarDownPagesStyles from '~/styles/sugar-down-pages.css?url';
import {SugarDownTrack} from '~/components/sugar-down/SugarDownTrack';

export const meta: MetaFunction = () => {
  return [{title: 'Track Your Order — Sugar Down'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownPagesStyles}];
}

export default function TrackRoute() {
  return <SugarDownTrack />;
}
