/**
 * Created by YoungZhang on 2017/7/21.
 */

window.onload = function () {
    all_click();
};

var shadowLayout = function (data) {
    data.style.position = 'absolute';
    data.style.width = '32%';
    data.style.height = '100%';
    data.style.left = '68%';
    data.style.top = '0';
    data.style.display = 'none';
};

var ltor_click = function (data) {
    data.protrait.addEventListener("click", function(){
        data.main_content.style.webkitTransform = 'translate3d(40%,0px,0px)';
        data.main_content.style.webkitTransition = '.8s';
        data.shadow.style.display = 'block';
        data.shadow.style.backgroundColor = 'rgba(0,0,0,.3)';
    },false);
};

var rtol_click = function (data) {
    data.back.addEventListener("click", function(){
        data.main_content.style.webkitTransform = 'translate3d(0px,0px,0px)';
        data.main_content.style.webkitTransition = '.8s';
        data.shadow.style.display = 'none';
    },false);
};

var all_click = function (){
    var options = {
        main_content : document.getElementById('main_content'),
        back : document.getElementById('back'),
        container : document.getElementById('container'),
        protrait :document.getElementById('portrait'),
        shadow :document.createElement('div'),
        body :document.getElementsByTagName('body')[0]
    };

    shadowLayout(options.shadow);
    options.body.appendChild(options.shadow);

    ltor_click(options);
    rtol_click(options);
};


