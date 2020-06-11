//实现第一个ajax发送的时候 开启进度条，在所有ajax结束的时候结束进度条
$(document).ajaxStart(function () {
    NProgress.start();//开启进度条
});
$(document).ajaxStop(function () {
    NProgress.done();
})