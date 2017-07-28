/**
 * Created by YoungZhang on 2017/7/21.
 */

var shadowLayout = function(data) {
    data.style.position = 'absolute';
    data.style.width = '32%';
    data.style.height = '100%';
    data.style.top = '0';
    data.style.right = '-32%';
    data.style.zIndex = '-999';
};

var ltor_click = function(data) {
    data.protrait.addEventListener("click", function() {
        data.main_content.style.webkitTransform = 'translate3d(40%,0px,0px)';
        data.main_content.style.webkitTransition = '.8s';
        data.shadow.style.zIndex = '999';
        data.shadow.style.webkitTransform = 'translate3d(-100%,0px,0px)';
        data.shadow.style.webkitTransition = '.8s';
        data.shadow.style.backgroundColor = 'rgba(0,0,0,.3)';
    }, false);
};

var rtol_click = function(data) {
    data.back.addEventListener("click", function() {
        data.main_content.style.webkitTransform = 'translate3d(0px,0px,0px)';
        data.main_content.style.webkitTransition = '.8s';
        data.shadow.style.webkitTransform = 'translate3d(0px,0px,0px)';
        data.shadow.style.webkitTransition = '.8s';
    }, false);
};

(function() {
    var options = {
        main_content: document.querySelector('.main_content'),
        back: document.querySelector('.back'),
        container: document.querySelector('.container'),
        protrait: document.querySelector('.portrait'),
        shadow: document.createElement('div'),
        body: document.querySelector('body')
    };

    shadowLayout(options.shadow);
    options.body.appendChild(options.shadow);

    ltor_click(options);
    rtol_click(options);
})();