function get_abbreviation_object ( abbreviation, text, $color ) {
    var ret = document.createElement ('div');
    ret.abbr = document.createElement('span');
    ret.abbr.style.display = 'inline-block';
    ret.abbr.style.fontWeight = 'bold';
    ret.abbr.innerHTML = abbreviation;
    ret.abbr.style.fontSize = '40px';
    ret.abbr.style.color = 'rgba(255,255,255,0.7)';
    ret.appendChild(ret.abbr);
    ret.letters = [];
    for (var j = 0; j < text.length; j++) {
        ret.letters[j] = document.createElement('span');
        ret.letters[j].style.display = 'inline-block';
        ret.letters[j].style.color = $color?$color:'rgba(255,255,255,0.75)';
        ret.letters[j].innerHTML = text.substr(j,1);
        if (ret.letters[j].innerHTML == " ") {
            ret.letters[j].style.width = '18px';
        }
        
        ret.appendChild(ret.letters[j]);
        
        ret.letters[j].style.fontSize = '20px';
        TweenLite.to(ret.letters[j], 0.1, { scale:'0.01' });
    }
    
    ret.onmouseover = function (event) {
        //
        TweenLite.to(ret.abbr, 2, { scale:'0%', rotation:"1.25rad", skewX:"30deg", marginLeft:'-10%' });
        //
        for (var i = 0; i < ret.letters.length; i++) {
            TweenLite.to(ret.letters[i], 2, { scale:'1.0', rotation:"0", skewX:"0" });
        }
        
    }
    ret.onmouseout = function (event) {
        // ret.innerHTML = this.abbr;
        // TweenLite.to(ret, 1, { scale:1.0 });
        //ret.abbr.style.display = 'inline-block';
        //ret.abbr.style.opacity = '0';
        for (var i = 0; i < ret.letters.length; i++) {
            TweenLite.to(ret.letters[i], 2, { scale:'0.01', rotation:"0.25rad", skewX:"10deg" });
        }
        TweenLite.to(ret.abbr, 4, { scale:'1.0', rotation:"0", skewX:"0", marginLeft:'0' });
    }
    return ret;
}
