var $canvas=$('.mainCanvas');
var ctx;
var canvasHeight;
var canvasWidth;
var poooo="噗"
$(document).ready(function(){
    $('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    $canvas=$('.mainCanvas');
    $canvas.attr({
        height:$(window).height(),
        width:$(window).width()
    });
    canvasHeight=$canvas.height();
    canvasWidth=$canvas.width();
    ctx=$canvas.get(0).getContext('2d');
    drawText();
});
function drawText(){
    ctx.font=(Math.random()*70)+"px Verdana";
    ctx.fillStyle=getRandomColor();
    ctx.beginPath();
    ctx.fillText(poooo,Math.random()*canvasWidth,Math.random()*canvasHeight);
    setTimeout(drawText,Math.random()*100);
}
function getRandomColor(){
    return 'hsl(' + Math.random()*360 + ',100%, 70%)';
}
