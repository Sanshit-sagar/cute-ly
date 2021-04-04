
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
}
/*
    Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    The following example provides the special encoding required within UTF-8 Content-Disposition 
    and Link server response header parameters (e.g., UTF-8 filenames):
*/
function encodeRFC5987ValueChars(str) {
    return encodeURIComponent(str).
        replace(/['()]/g, escape). 
        replace(/\*/g, '%2A').
            replace(/%(?:7C|60|5E)/g, unescape);
}


export default fixedEncodeURIComponent; 
