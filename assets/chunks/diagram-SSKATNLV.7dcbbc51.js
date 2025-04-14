import{p as k}from"./chunk-4BMEZGHF.343ef6ac.js";import{O as R,f as l,s as F,h as I,z as E,A as _,i as D,j as P,u as z,P as C,Q as w,F as G,aV as V,a$ as W}from"../app.80007782.js";import{p as j}from"./mermaid-parser.core.64a26d23.js";import"./baseUniq.eddb6d66.js";import"./basePickBy.74cb3d6d.js";import"./clone.36443edc.js";var x={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},b={axes:[],curves:[],options:x},m=structuredClone(b),B=R.radar,H=l(()=>C({...B,...w().radar}),"getConfig"),M=l(()=>m.axes,"getAxes"),N=l(()=>m.curves,"getCurves"),Q=l(()=>m.options,"getOptions"),U=l(a=>{m.axes=a.map(t=>{var e;return{name:t.name,label:(e=t.label)!=null?e:t.name}})},"setAxes"),X=l(a=>{m.curves=a.map(t=>{var e;return{name:t.name,label:(e=t.label)!=null?e:t.name,entries:Y(t.entries)}})},"setCurves"),Y=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=M();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(s=>{var o;return((o=s.axis)==null?void 0:o.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),Z=l(a=>{var e,r,s,o,i,n,c,d,u,p;const t=a.reduce((g,h)=>(g[h.name]=h,g),{});m.options={showLegend:(r=(e=t.showLegend)==null?void 0:e.value)!=null?r:x.showLegend,ticks:(o=(s=t.ticks)==null?void 0:s.value)!=null?o:x.ticks,max:(n=(i=t.max)==null?void 0:i.value)!=null?n:x.max,min:(d=(c=t.min)==null?void 0:c.value)!=null?d:x.min,graticule:(p=(u=t.graticule)==null?void 0:u.value)!=null?p:x.graticule}},"setOptions"),q=l(()=>{G(),m=structuredClone(b)},"clear"),f={getAxes:M,getCurves:N,getOptions:Q,setAxes:U,setCurves:X,setOptions:Z,getConfig:H,clear:q,setAccTitle:F,getAccTitle:I,setDiagramTitle:E,getDiagramTitle:_,getAccDescription:D,setAccDescription:P},J=l(a=>{k(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),K={parse:l(async a=>{const t=await j("radar",a);z.debug(t),J(t)},"parse")},tt=l((a,t,e,r)=>{var $;const s=r.db,o=s.getAxes(),i=s.getCurves(),n=s.getOptions(),c=s.getConfig(),d=s.getDiagramTitle(),u=V(t),p=et(u,c),g=($=n.max)!=null?$:Math.max(...i.map(y=>Math.max(...y.entries))),h=n.min,v=Math.min(c.width,c.height)/2;at(p,o,v,n.ticks,n.graticule),rt(p,o,v,c),A(p,o,i,h,g,n.graticule,c),O(p,i,n.showLegend,c),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,s={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${s.x}, ${s.y})`)},"drawFrame"),at=l((a,t,e,r,s)=>{if(s==="circle")for(let o=0;o<r;o++){const i=e*(o+1)/r;a.append("circle").attr("r",i).attr("class","radarGraticule")}else if(s==="polygon"){const o=t.length;for(let i=0;i<r;i++){const n=e*(i+1)/r,c=t.map((d,u)=>{const p=2*u*Math.PI/o-Math.PI/2,g=n*Math.cos(p),h=n*Math.sin(p);return`${g},${h}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),rt=l((a,t,e,r)=>{const s=t.length;for(let o=0;o<s;o++){const i=t[o].label,n=2*o*Math.PI/s-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(n)).attr("y2",e*r.axisScaleFactor*Math.sin(n)).attr("class","radarAxisLine"),a.append("text").text(i).attr("x",e*r.axisLabelFactor*Math.cos(n)).attr("y",e*r.axisLabelFactor*Math.sin(n)).attr("class","radarAxisLabel")}},"drawAxes");function A(a,t,e,r,s,o,i){const n=t.length,c=Math.min(i.width,i.height)/2;e.forEach((d,u)=>{if(d.entries.length!==n)return;const p=d.entries.map((g,h)=>{const v=2*Math.PI*h/n-Math.PI/2,$=L(g,r,s,c),y=$*Math.cos(v),S=$*Math.sin(v);return{x:y,y:S}});o==="circle"?a.append("path").attr("d",T(p,i.curveTension)).attr("class",`radarCurve-${u}`):o==="polygon"&&a.append("polygon").attr("points",p.map(g=>`${g.x},${g.y}`).join(" ")).attr("class",`radarCurve-${u}`)})}l(A,"drawCurves");function L(a,t,e,r){const s=Math.min(Math.max(a,t),e);return r*(s-t)/(e-t)}l(L,"relativeRadius");function T(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let s=0;s<e;s++){const o=a[(s-1+e)%e],i=a[s],n=a[(s+1)%e],c=a[(s+2)%e],d={x:i.x+(n.x-o.x)*t,y:i.y+(n.y-o.y)*t},u={x:n.x-(c.x-i.x)*t,y:n.y-(c.y-i.y)*t};r+=` C${d.x},${d.y} ${u.x},${u.y} ${n.x},${n.y}`}return`${r} Z`}l(T,"closedRoundCurve");function O(a,t,e,r){if(!e)return;const s=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,i=20;t.forEach((n,c)=>{const d=a.append("g").attr("transform",`translate(${s}, ${o+c*i})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(n.label)})}l(O,"drawLegend");var st={draw:tt},nt=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const s=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${s};
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
		}
		`}return e},"genIndexStyles"),ot=l(a=>{const t=W(),e=w(),r=C(t,e.themeVariables),s=C(r.radar,a);return{themeVariables:r,radarOptions:s}},"buildRadarStyleOptions"),it=l(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=ot(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${nt(t,e)}
	`},"styles"),ht={parser:K,db:f,renderer:st,styles:it};export{ht as diagram};
