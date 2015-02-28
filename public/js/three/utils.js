utils={};

utils.toGlossary=function(x){
  //x is an array of objects, and we're turning it into a hash where 
  //the id element from each object is it's key
  var glossary={};
  for (var i=0;i<x.length;i++){
    glossary[x[i].id]=x[i];
  }
  return glossary;
};

utils.parseTimeline=function(timeline,components){
  var glossary= utils.toGlossary(components);
  
  for (var i=0;i<timeline.length;i++){
    //deep clone to avoid altering the glossary
    timeline[i].component={};
    //timeline[i].component.timelineIndex=i;
    for (var key in timeline[i]){
      if (key==='component'){continue;}
      timeline[i].component[key]=timeline[i][key];
    }
    for (var key in glossary[timeline[i].id]){
      //if (key==='id'){continue;}
      timeline[i].component[key]=glossary[timeline[i].id][key];
    }
    timeline[i].component.value=timeline[i].value;
    if (timeline[i].component.hasOwnProperty('pointer')){
      timeline[i].component.pointsTo=components[timeline[i].component.pointer];
    }
    
  }

  return timeline;
};

utils.getPoint=function(x,y,r,theta){
  theta+=90;
  theta=theta*(Math.PI/180);
  var x2=x+(r*Math.sin(theta));
  var y2=y+(r*Math.cos(theta));
  var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
  return circle;
};

utils.extractScopes=function(allData){  
  var scopes={};  
  var scopeX=0;
  for (var key in allData.scopes){
    scopes[key]=scopeX+500;
    scopeX+=500;
  }
  return scopes;
};

utils.modal={};

utils.modal.donut=function(canvas,x,y,obj){
  var c=canvas;
  var cData=obj.object.componentData;
  
  var timesReferenced=30;
  var arcInterval=360/timesReferenced;
  transitionTime=600;
  
  
  for (var i=0;i<timesReferenced;i++){
    var theta1=i*arcInterval;
    var theta2=( (1+i)*arcInterval)-1;
    var anim=new Raphael.animation({opacity:0.2},300,"<>");
    var section=c.path(utils.arcPath(x,y,300,theta1,theta2,30))
      .attr({fill:"#fff",opacity:0})
      .animate(anim.delay( i * (transitionTime/timesReferenced) ));
    section.animate({transform:"r90, "+x+" "+y+""},1000);
  }
  
};


utils.modal.headline=function(canvas,obj){
  var c=canvas;
  var cData=obj.object.componentData;
  
  var text=c.text(-1000,100,utils.modalizeText(obj.object))
    .attr({"fill":"#fff","font-size":"40px","text-anchor":"start"})
    .animate({x:10},600,"<>");
  var bbox=text.getBBox();
  var backboard=c.rect(-1000,bbox.y,Math.max(bbox.width,300),bbox.height)
    .attr({"fill":"#000",opacity:0.8})
    .animate({x:0},600,"<>");
  text.toFront();
}


utils.rippleList=function(canvas,collection){
  var x=-300;
  var y=120;
  var anim=new Raphael.animation({x:10},300,"<>");
  var barAnim=new Raphael.animation({x:0},300,"<>");
  for (var i=0;i<collection.length;i++){
    y+=30;
    var backBar=canvas.rect(x,y,300,29)
      .attr({"fill":"#000","opacity":0.8})
      .animate(barAnim.delay( 600+(i*50) ));
    var text=canvas.text(x,y+13,i+1+": "+collection[i])
      .attr({fill:"#fff","font-size":"20px","text-anchor":"start"})
      .animate(anim.delay( 600+(i*50) ));
  }
};


utils.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+utils.getPoint(x,y,r,theta1).x2+" "+utils.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+utils.getPoint(x,y,r,theta2).x2+" "+utils.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+utils.getPoint(x,y,(r-w),theta2).x2+" "+utils.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+utils.getPoint(x,y,(r-w),theta1).x2+" "+utils.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
};

utils.donut=function(opts){
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
    
utils.allValues=function(timeline,target){
  var r=[];
  
  for (var i=0;i<timeline.length;i++){
    if (target===timeline[i].id && timeline[i].value!==undefined){
      r.push( JSON.stringify(timeline[i].value) );
    }
  }
  
  return r;
};   
    

utils.modalizeText=function(obj){
  var d="";
  if (obj.componentData.pointsTo!==undefined && obj.componentData.pointsTo.type  && obj.componentData.pointsTo.type==='object'){
    d+=""+obj.componentData.name+" = { } ";
  } else if (obj.componentData.pointsTo!==undefined && obj.componentData.pointsTo.type && obj.componentData.pointsTo.type==='array'){
    d+=""+obj.componentData.name+" = [ ] ";
  } else if (obj.componentData.hasOwnProperty("type") && obj.componentData.type==='element'){
    d+="["+obj.componentData.name+"] = "+obj.componentData.value+"";
  } else if (obj.componentData.value && obj.componentData.value==='___function code'){
    d+="function: "+obj.componentData.name+" declaration";
  } else if (obj.componentData.type==='block' && obj.componentData.name==='if' && obj.componentData.hasOwnProperty('enter') ){
    d+="if open";
  } else if (obj.componentData.hasOwnProperty('if') && obj.componentData.if==='close'){
    d+="if close";
  } else if (obj.componentData.hasOwnProperty('invoke') ){
    d+="function: "+obj.componentData.name+" invocation";
  } else if (obj.componentData.hasOwnProperty('return') ) {
    d+="function: "+obj.componentData.name+" returns "+obj.componentData.return+"";
  } else if (obj.componentData.for) {
    d+="loop "+obj.componentData.for+"";  
  } else if (obj.componentData.param!==undefined){
    d+="parameter: "+obj.componentData.name+" = "+obj.componentData.param+"";
  } else if (obj.componentData.type && obj.componentData.type==='var') {
    d+=""+obj.componentData.name+" = "+obj.componentData.value+"";
  } else {
  	for (var key in obj.componentData){
  		d+=""+key+": "+obj.componentData[key]+"\n";
  	}
  }
	return d;
};

utils.displayText=function(obj){
  var d="";
  if (obj.componentData.pointsTo!==undefined && obj.componentData.pointsTo.type  && obj.componentData.pointsTo.type==='object'){
    d+="<div>"+obj.componentData.name+" = { } </div>";
  } else if (obj.componentData.pointsTo!==undefined && obj.componentData.pointsTo.type && obj.componentData.pointsTo.type==='array'){
    d+="<div>"+obj.componentData.name+" = [ ] </div>";
  } else if (obj.componentData.hasOwnProperty("type") && obj.componentData.type==='element'){
    d+="<div>["+obj.componentData.name+"] = "+obj.componentData.value+"</div>";
  } else if (obj.componentData.value && obj.componentData.value==='___function code'){
    d+="<div>function: "+obj.componentData.name+" declaration</div>";
  } else if (obj.componentData.type==='block' && obj.componentData.name==='if' && obj.componentData.hasOwnProperty('enter') ){
    d+="<div>if open</div>";
  } else if (obj.componentData.hasOwnProperty('if') && obj.componentData.if==='close'){
    d+="<div>if close</div>";
  } else if (obj.componentData.hasOwnProperty('invoke') ){
    d+="<div>function: "+obj.componentData.name+" invocation</div>";
  } else if (obj.componentData.hasOwnProperty('return') ) {
    d+="<div>function: "+obj.componentData.name+" returns "+obj.componentData.return+"</div>";
  } else if (obj.componentData.for) {
    d+="<div>loop "+obj.componentData.for+"</div>";  
  } else if (obj.componentData.param!==undefined){
    d+="<div>parameter: "+obj.componentData.name+" = "+obj.componentData.param+"</div>";
  } else if (obj.componentData.type && obj.componentData.type==='var') {
    d+="<div>"+obj.componentData.name+" = "+obj.componentData.value+"</div>";
  } else {
  	for (var key in obj.componentData){
  		d+="<div>"+key+": "+obj.componentData[key]+"</div>";
  	}
  }
	return d;
};

utils.tweenify=function(obj,opts){
  //tweenify is a decorator
  if (obj===undefined){var obj={};}
  if (opts===undefined){var opts={};}
  if (opts.x1===undefined){opts.x1=0;}
  if (opts.x2===undefined){opts.x2=0;}
  if (opts.z1===undefined){opts.z1=0;}
  if (opts.z2===undefined){opts.z2=0;}
  
  var easingType="Quintic";
  var tweenDuration=600;

  var xExpand   = new TWEEN.Tween(obj.position).to({x:opts.x2},tweenDuration).easing(TWEEN.Easing[easingType].Out);
  var zCollapse = new TWEEN.Tween(obj.position).to({z:opts.z1},tweenDuration).easing(TWEEN.Easing[easingType].Out);

  obj.collapse  = new TWEEN.Tween(obj.position).to({x:opts.x1},tweenDuration).chain(zCollapse).easing(TWEEN.Easing[easingType].Out);
  obj.expand    = new TWEEN.Tween(obj.position).to({z:opts.z2},tweenDuration).chain(xExpand).easing(TWEEN.Easing[easingType].Out);
  return obj;
};