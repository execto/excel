import {TABLE_RESIZE} from './actionTypes';

export const resizeTable = (data) => {
    return {
        type: TABLE_RESIZE,
        data,
    };
};
