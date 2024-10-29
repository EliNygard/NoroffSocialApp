export function getUrlParameter(param) {
    const searchParameters = new URLSearchParams(window.location.search)
    return searchParameters.get(param)
}