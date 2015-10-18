var $canvas=$('.mainCanvas');
var context;
var canvasHeight;
var canvasWidth;
var collection;
$(document).ready(function(){
    $canvas=$('.mainCanvas');
    $canvas.attr({
        height:$(window).height(),
        width:$(window).width()
    });
    canvasHeight=$canvas.height();
    canvasWidth=$canvas.width();
    context=$canvas.get(0).getContext('2d');

    (function(collection){
        var RADIUSMAX=30;//max radius
        var RADIUSMIN=5;//min radius
        var colors=['#FF0000','#FF8000','#FFFF00','#00FF00','#0000FF','#8000FF'];//colors
        var GENERLOOPTIMES=20000;//迴圈跑20000次
        var STARTVELOCITY=0.2;//初速
        var RIPPLEWIDTH=40;//ripple 的寬度
        var RIPPLEINTERVAL=100;//水波的速度
        var UPDATEINTERVAL=20;//多久更新畫面一次
        function vector(x,y,z){
            this.x=x;
            this.y=y;
            this.z=z;
        }
        function pointCollection(){//point的集合
            this.points=[];
            this.init=function(){//生成point
                for(var i=0;i<GENERLOOPTIMES;i++){
                    var tmpx=getRandomX();
                    var tmpy=getRandomY();
                    var tmpradius=getRandomRadius( Math.floor( (GENERLOOPTIMES-i) / (GENERLOOPTIMES/(RADIUSMAX-RADIUSMIN)) + RADIUSMIN ) );
                    var j=0;
                    for(j=0;j<this.points.length;j++)
                        if(getDistance(tmpx,tmpy,this.points[j].pos.x,this.points[j].pos.y) < (tmpradius+this.points[j].radius) )
                            break;
                    if(j==this.points.length)
                        this.points.push(new point(tmpx,tmpy,1,tmpradius,getRandomColor()));
                }
            }
            this.draw=function(){
                for(var i=0;i<this.points.length;i++)
                    this.points[i].draw();
            }
            this.update=function(){
                for(var i=0;i<this.points.length;i++)
                    this.points[i].update();
            }
        }
        function point(x,y,z,radius,color){//點點
            this.pos=new vector(x,y,z);
            this.radius=radius;
            this.color=color;
            this.size=radius;
            this.friction=0.98;//摩擦力,0.99太大，0.98剛剛好
            this.springStrength=0.05;//簡諧運動振幅
            this.velocity=0;//初速
            this.draw=function(){
                context.fillStyle=this.color;
                context.beginPath();
                context.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2,true);
                context.fill();
            }
            this.update=function(){//簡諧振動
                var targetz = 1;
                var dz =this.pos.z-targetz;
                var az =-dz * this.springStrength;
                this.velocity+= az;
                this.velocity*= this.friction;
                this.pos.z += this.velocity;
                this.radius = this.size * this.pos.z;
                if (this.radius < 1) this.radius = 1;
            }
        }
        function pointRipple(num,e){//生成水波
            var points=collection.points;
            var distance=Math.sqrt(canvasWidth*canvasWidth+canvasHeight*canvasHeight)/RIPPLEWIDTH;
            for(var i=0;i<points.length;i++){
                var dis=getDistance(e.pageX,e.pageY,points[i].pos.x,points[i].pos.y);
                if(distance*num<dis && dis<distance*(num+1)){
                    points[i].velocity=STARTVELOCITY;
                }
            }
            if(num!=RIPPLEWIDTH)
                setTimeout(function(){
                    pointRipple(num+1,e);
                },RIPPLEINTERVAL);
        }
        function bindEvents(){
            $canvas.on('mousedown',function(e){
                pointRipple(0,e);
            });
            $canvas.on('touchdown',function(e){
                pointRipple(0,e);
            });
        }
        function getRandomColor(){
            return colors[Math.floor(Math.random()*colors.length)];
        }
        function getRandomRadius(max){
            return Math.floor(Math.random()*(max-RADIUSMIN))+RADIUSMIN;
        }
        function getRandomX(){
            return Math.floor(Math.random()*canvasWidth);
        }
        function getRandomY(){
            return Math.floor(Math.random()*canvasHeight);
        }
        function getDistance(x1,y1,x2,y2){
            return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
        }
        function fillBackground(color){
            context.fillStyle=color;
            context.beginPath();
            context.fillRect(0,0,canvasWidth,canvasHeight);
            context.fill();
        }
        collection=new pointCollection();
        collection.init();
        setInterval(function(){
            context.clearRect(0,0,canvasWidth,canvasHeight);
            fillBackground('#000000');
            collection.draw();
            collection.update();
        },UPDATEINTERVAL);
        bindEvents();
    })(window.collection);
});
