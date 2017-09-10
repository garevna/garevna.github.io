// JavaScript Document
var _ua = window.navigator.userAgent;
var browser = {
  version: (_ua.match( /.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
  opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
  msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
  msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
  msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
  msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
  msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
  msie10: (/MSIE 10/i.test(_ua) && !/opera/i.test(_ua)),
  msie11: (/MSIE 11/i.test(_ua) && !/opera/i.test(_ua)),
  mozilla: /firefox/i.test(_ua),
  chrome: /chrome/i.test(_ua),
  safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
  iphone: /iphone/i.test(_ua),
  ipod: /ipod/i.test(_ua),
  iphone4: /iphone.*OS 4/i.test(_ua),
  ipod4: /ipod.*OS 4/i.test(_ua),
  ipad: /ipad/i.test(_ua),
  android: /android/i.test(_ua),
  bada: /bada/i.test(_ua),
  mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
  msie_mobile: /iemobile/i.test(_ua),
  safari_mobile: /iphone|ipod|ipad/i.test(_ua),
  opera_mobile: /opera mini|opera mobi/i.test(_ua),
  opera_mini: /opera mini/i.test(_ua),
  mac: /mac/i.test(_ua),
  search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
};
// ===========================================================
function browser_name()
{
    if (browser.opera) return 'Opera';
	if (browser.opera_mobile) return 'opera mobi';
	if (browser.opera_mini) return 'opera mini';
	if (browser.chrome) return 'Google Chrome';
    if (browser.mozilla) return 'Mozilla Firefox';
    if (browser.safari) return 'Safari';
	if (browser.iphone) return 'iphone';
	if (browser.ipod) return 'ipod';
	if (browser.ipad) return 'ipad';
	if (browser.safari_mobile) return 'iphone|ipod|ipad';
    if (browser.msie) return 'Internet Explorer';
	if (browser.msie_mobile) return 'iemobile';
	if (browser.android) return 'android';
    if (browser.bada) return 'bada';
	if (browser.mac) return 'mac';
	if (browser.mac) return 'mac';
    return 'unknown browser';
}
