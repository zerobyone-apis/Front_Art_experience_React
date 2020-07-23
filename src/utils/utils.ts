export const getPageName = () => {
    let urlSections = window.location.toString().split('/');
    return urlSections[urlSections.length - 1];
}