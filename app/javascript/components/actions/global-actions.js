import ContentApi from '../../api/content-api';

export const SET_BLANK_NAVBAR = 'SET_BLANK_NAVBAR';
export const SET_FULLSCREEN = 'SET_FULLSCREEN';
export const SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE';
export const SET_HEADER_IMAGE = 'SET_HEADER_IMAGE';
export const STORE_WEBSITE_TITLE = 'STORE_WEBSITE_TITLE';

export function setBlankNavbar(isBlank) {
    return {
        type: SET_BLANK_NAVBAR,
        data: isBlank
    }
}

export function setFullscreen(isFullscreen) {
    return {
        type: SET_FULLSCREEN,
        data: isFullscreen
    }
}

export function setDocumentTitle(title) {
    return {
        type: SET_DOCUMENT_TITLE,
        data: title
    }
}

export function setHeaderImage(image) {
    return {
        type: SET_HEADER_IMAGE,
        data: image
    }
}

export function storeWebsiteTitle(websiteTitle) {
    return {
        type: STORE_WEBSITE_TITLE,
        data: websiteTitle
    }
}

export function fetchHeaderImage(identifier) {
    return function (dispatch) {
        ContentApi.get(identifier).then( data => {
            dispatch(setHeaderImage(data.content));
        });
    }
}

export function fetchWebsiteTitle() {
    return function (dispatch) {
        ContentApi.get('websiteTitle').then( data => {
            dispatch(storeWebsiteTitle(data.content.text));
        });
    }
}
