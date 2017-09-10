// JavaScript Document

checkBrowser(params = {
     warning: [string],     // окончание шаблонной фразы "Версия Вашего браузера BBBBB (ver ХХ.ХХ) {warning}"
     message: [string],     // основное сообщение
     question: [string],    // сам вопрос "Не желаете ли?" (у каждого свой подход к людям) :)      
     chrome: [float],       // минимально-допустимые версии браузеров
     safari: [float],            
     msie: [float],          
     opera: [float],
     firefox: [float],
     chromeLink: [string],  // ссылки на обновление
     safariLink: [string],
     msieLink: [string],
     operaLink: [string],
     firefoxLink: [string]
})

function checkBrowser()
{
    if (!params.chromeLink) params.chromeLink = 'http://www.google.com/chrome/eula.html';
    if (!params.safariLink) params.safariLink = 'http://www.apple.com/ru/safari/download/';
    if (!params.msieLink) params.msieLink = 'http://www.microsoft.com/rus/windows/internet-explorer/';
    if (!params.operaLink) params.operaLink = 'http://ru.opera.com/download/';
    if (!params.firefoxLink) params.firefoxLink = 'http://www.mozilla-russia.org/products/firefox/';
    if (!params.warning) params.warning = 'устарела!\r\n\r\n'
        else params.warning += '\r\n\r\n';
    if (!params.question) params.question = 'Хотите ли обновить версию своего браузера?';
    if (!params.message) params.message = ''
        else params.message += '\r\n\r\n';
    if (!params.chrome) params.chrome = 6;
    if (!params.safari) params.safari = 5;
    if (!params.msie) params.msie = 6;  
    if (!params.opera) params.opera = 10.5;
    if (!params.firefox) params.firefox = 3.5;
    var browser = getBrowser(1),
    browserName = browser[0],
    browserVer = browser[1],
    browserVerPoints = browser[2],
    browserVer = parseFloat(browserVer+"."+browserVerPoints),
    systemMessage = 'Версия Вашего браузера '+browserName+'(ver '+browserVer+') '+params.warning+params.message+params.question,
    bLink = '';
	alert(systemMessage);
    switch (browserName)
    {
        case 'Chrome':
            if (browserVer >= params.chrome) return false
            else bLink = params.chromeLink; break;
        case 'Safari':
            if (browserVer >= params.safari) return false
            else bLink = params.safariLink; break;
        case 'MSIE':
            if (browserVer >= params.msie) return false
            else bLink = params.msieLink; break;
        case 'Opera':
            if (browserVer >= params.opera) return false
            else bLink = params.operaLink; break;
        case 'Firefox':
            if (browserVer >= params.firefox) return false
            else bLink = params.firefoxLink; break;
    };
    var conf = confirm(systemMessage);
    if (conf == true) document.location.href = bLink
    else return false;
};      
