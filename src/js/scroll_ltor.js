/**
 * Created by YoungZhang on 2017/7/21.
 */

window.onload = function(){
    btnClick();
}

function btnClick(){
    var main_content = document.getElementById('main_content');
    var info_content = document.getElementById('info_content');
    var header = document.getElementById('header');
    var select_main = document.getElementById('select_main');
    var container = document.getElementById('container');
    var imgs = document.getElementById('portrait');
    var shadow = document.getElementById('shadow');
    var back = document.getElementById('back');
    imgs.onclick = function(){
        main_content.style.webkitTransform = 'translate3d(40%,0px,0px)';
        main_content.style.webkitTransition = '.8s';
        // container.style.filter = 'alpha(opcity:30)';
        // container.style.opacity = '.3';
        // container.style.boxShadow = '0 0 0 50vmax rgba(0,0,0,.5)';
        container.style.backgroundColor = 'rgba(0,0,0,.2)';
        // header.style.background = 'rgba(0,0,0,.2)';
        // select_main.style.background = 'rgba(0,0,0,.2)';
        info_content.style.zIndex = 1;
    }
    back.onclick = function(){
        main_content.style.webkitTransform = 'translate3d(0,0px,0px)';
        main_content.style.webkitTransition = '.8s';
        container.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}


