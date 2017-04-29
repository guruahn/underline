import { dummy } from './MyUnderlines.dummy';

export const MyUnderlinesStore = {
	default: () => {},
	subscribe: () => {},
	dispatch: () => {},
	getState: () => {
		return { underlines: [dummy.underlines] };
	},
  replaceReducer: () => {},
};
