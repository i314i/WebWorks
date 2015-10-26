$(document).ready(function(){
    var config1 = liquidFillGaugeDefaultSettings();
    config1.waveAnimateTime = 2000;
    config1.waveHeight = 0.10;
    config1.waveCount = 1;
    var config2 = liquidFillGaugeDefaultSettings();
    config2.waveAnimateTime = 1500;
    config2.waveHeight = 0.05;
    config2.waveCount = 2;
    config2.circleColor = "#FF7777";
    config2.textColor = "#FF4444";
    config2.waveTextColor = "#FFAAAA";
    config2.waveColor = "#FFDDDD";
    config2.waveAnimateTime = 2000;
    config2.waveHeight = 0.10;
    config2.waveCount = 1;
    var config3 = liquidFillGaugeDefaultSettings();
    config3.circleColor="#6DA398";
    config3.circleColor = "#808015";
    config3.textColor = "#555500";
    config3.waveTextColor = "#FFFFAA";
    config3.waveColor = "#AAAA39";
    config3.waveAnimateTime = 2000;
    config3.waveHeight = 0.10;
    config3.waveCount = 1;

    var gauge1 = loadLiquidFillGauge("fillgauge1", 55,config1);
    var gauge2 = loadLiquidFillGauge("fillgauge2", 72,config2);
    var gauge3 = loadLiquidFillGauge("fillgauge3", 33,config3);
    var gauge4 = loadLiquidFillGauge("fillgauge4", 90,config2);
    var gauge5 = loadLiquidFillGauge("fillgauge5", 97,config3);
    var gauge6 = loadLiquidFillGauge("fillgauge6", 42,config1);
    function NewValue(){
        if(Math.random() > .5){
            return Math.round(Math.random()*100);
        } else {
            return (Math.random()*100).toFixed(1);
        }
    }
    setInterval(function(){
        $('.section2 .col-sm-4').toggleClass('animEndOrigin');
    },3000);
});
