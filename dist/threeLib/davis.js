davis=
{
random:function (x)
	{
		return (Math.floor(Math.random()*x));
	},

bell: function (x)
	{
		var i=Math.round((davis.random(x)+davis.random(x)+davis.random(x))/3);
		return i;
	},

randomColor:function (x)
	{

	if (x){	x=x.toLowerCase();}
	else{x=="none"}

	var red=davis.random(255);
	var green=davis.random(255);
	var blue=davis.random(255);
	var color="rgb("+red+","+green+","+blue+")";

	if (x=="mammal" || x=="mammalian"){
		red=160+davis.random(85);
		green=red-40;
		blue=green/2;
		color="rgb("+red+","+green+","+blue+")";
		}
	return color;
	},
	
pick: function (x)
	{
	return x[davis.random(x.length)];
	}
};


geo={};

geo.getPoint=function(x,y,r,theta){
	theta+=90;
	theta=theta*(Math.PI/180);
	var x2=x+(r*Math.sin(theta));
	var y2=y+(r*Math.cos(theta));
	var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
	return circle;
	};

geo.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+geo.getPoint(x,y,r,theta1).x2+" "+geo.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+geo.getPoint(x,y,r,theta2).x2+" "+geo.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+geo.getPoint(x,y,(r-w),theta2).x2+" "+geo.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+geo.getPoint(x,y,(r-w),theta1).x2+" "+geo.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
	};

geo.donut=function(opts){
        var opts=opts||{};
        var cc=opts.data;
        var b=opts.bounds;
        var c=opts.canvas;
        opts.fill_color=opts.fill_color || "#d00";
        opts.radius=opts.radius || Math.min(b.centerX,b.centerY)-10;
        opts.width=opts.width || opts.radius/8;
        var sum=0;
        for (var i in cc){sum+=cc[i];}
        var s=[];
        var theta=0;
        var tOffset=0;
        for (var i in cc){
            theta=360*(cc[i]/sum);
            //if (theta>360){theta=theta-360;}
            tOffset+=theta;
            var h=c.path(geo.arcPath(b.centerX,b.centerY,opts.radius,0,theta,opts.width));  
            h.rotate(tOffset,b.centerX,b.centerY);
            h.attr({"fill":"#fff","cursor":"pointer"});
            //h.transform("s 0 0 ",b.centerX,b.centerY);
            h.data("label",i);
            h.data("tOffset",tOffset);
            h.hover(function(){
               this.stop();
               this.attr({"fill":opts.fill_color});
               var t=c.text(b.centerX,b.centerY,this.data("label"));
               t.attr({"font-size":30});
               this.data("animatedLabel",t);
            },function(){
                this.data("animatedLabel").animate({"opacity":0},500,function(){this.remove();});
                this.animate({"fill":"#fff"},500);
            });
            s.push(h);
        }
        
       return s;
    };
    
    
davis.quickBox=function(opts){
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    var opts=opts || {};

	var b={};
	b.left=0;
	if (opts.left){b.left=opts.left;}
	b.top=0;
	if (opts.top){b.top=opts.top;}
	b.width=opts.width || x;
	b.height=opts.height || y;
	b.right=b.left+b.width;
	b.bottom=b.top+b.height;
	b.centerX=(b.left+b.right)/2;
	b.centerY=(b.top+b.bottom)/2;
	
	return b;
};