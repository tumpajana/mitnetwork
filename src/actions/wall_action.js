import { wallConstants } from '../constants';
import { wallService } from '../_services';

export const wallActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        wallService.getAll()
            .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error))
            );
    };

    function request() { return { type: wallConstants.GETALL_REQUEST } }
    function success(users) { return { type: wallConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: wallConstants.GETALL_FAILURE, error } }
}
