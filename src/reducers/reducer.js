import { nanoid } from 'nanoid';
import { RESET_UID } from '../context/actions';

const reducer = (state, action) => {
  switch (action.type) {
    case RESET_UID:
      return {
        ...state,
        uid: nanoid(),
      };

    default:
      break;
  }
  throw new Error(`No matching "${action.type}" = action type`);
};

export default reducer;
