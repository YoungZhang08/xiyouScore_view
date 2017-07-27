/**
 * Created by lenovo on 2017/7/26.
 */

(function () {
    var opt = document.getElementsByClassName('sel_opt');
    var content = [
        document.querySelector('.passed_show'),
        document.querySelector('.notThr_show'),
        document.querySelector('.makeup_show')
    ];

    content[0].style.display = "block";
    content[1].style.display = "none";
    content[2].style.display = "none";

    opt[0].querySelector('img').setAttribute('src',"../image/icon/scr_btn_pass_pre.png");
    opt[1].querySelector('img').setAttribute('src',"../image/icon/scr_btn_upass_upre.png");
    opt[2].querySelector('img').setAttribute('src',"../image/icon/scr_btn_inqu_upre.png");


    opt[0].addEventListener("click",function () {
        content[0].style.display = "block";
        content[1].style.display = "none";
        content[2].style.display = "none";
        opt[0].querySelector('img').setAttribute('src',"../image/icon/scr_btn_pass_pre.png");
        opt[1].querySelector('img').setAttribute('src',"../image/icon/scr_btn_upass_upre.png");
        opt[2].querySelector('img').setAttribute('src',"../image/icon/scr_btn_inqu_upre.png");
    },false);

    opt[1].addEventListener("click",function () {
        content[0].style.display = "none";
        content[1].style.display = "block";
        content[2].style.display = "none";
        opt[0].querySelector('img').setAttribute('src',"../image/icon/scr_btn_pass_upre.png");
        opt[1].querySelector('img').setAttribute('src',"../image/icon/scr_btn_upass_pre.png");
        opt[2].querySelector('img').setAttribute('src',"../image/icon/scr_btn_inqu_upre.png");
    },false);

    opt[2].addEventListener("click",function () {
        content[0].style.display = "none";
        content[1].style.display = "none";
        content[2].style.display = "block";
        opt[0].querySelector('img').setAttribute('src',"../image/icon/scr_btn_pass_upre.png");
        opt[1].querySelector('img').setAttribute('src',"../image/icon/scr_btn_upass_upre.png");
        opt[2].querySelector('img').setAttribute('src',"../image/icon/scr_btn_inqu_pre.png");
    },false);

})();
