import{p as w}from"./chunk-4BMEZGHF.879cca29.js";import{O as B,s as S,h as F,z,A as P,i as W,j as T,f as s,u as v,P as x,Q as A,F as D,aV as E,v as _}from"../app.1d1a677f.js";import{p as N}from"./mermaid-parser.core.d2ccac8f.js";import"./baseUniq.ad2e0d68.js";import"./basePickBy.73377143.js";import"./clone.e85a68d5.js";var C={packet:[]},m=structuredClone(C),L=B.packet,O=s(()=>{const t=x({...L,...A().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),Y=s(()=>m.packet,"getPacket"),I=s(t=>{t.length>0&&m.packet.push(t)},"pushWord"),M=s(()=>{D(),m=structuredClone(C)},"clear"),h={pushWord:I,getPacket:Y,getConfig:O,clear:M,setAccTitle:S,getAccTitle:F,setDiagramTitle:z,getDiagramTitle:P,getAccDescription:W,setAccDescription:T},j=1e4,G=s(t=>{w(t,h);let e=-1,o=[],n=1;const{bitsPerRow:i}=h.getConfig();for(let{start:r,end:a,label:p}of t.blocks){if(a&&a<r)throw new Error(`Packet block ${r} - ${a} is invalid. End must be greater than start.`);if(r!==e+1)throw new Error(`Packet block ${r} - ${a!=null?a:r} is not contiguous. It should start from ${e+1}.`);for(e=a!=null?a:r,v.debug(`Packet block ${r} - ${e} with label ${p}`);o.length<=i+1&&h.getPacket().length<j;){const[b,c]=H({start:r,end:a,label:p},n,i);if(o.push(b),b.end+1===n*i&&(h.pushWord(o),o=[],n++),!c)break;({start:r,end:a,label:p}=c)}}h.pushWord(o)},"populate"),H=s((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),K={parse:s(async t=>{const e=await N("packet",t);v.debug(e),G(e)},"parse")},Q=s((t,e,o,n)=>{const i=n.db,r=i.getConfig(),{rowHeight:a,paddingY:p,bitWidth:b,bitsPerRow:c}=r,u=i.getPacket(),l=i.getDiagramTitle(),g=a+p,d=g*(u.length+1)-(l?0:a),k=b*c+2,f=E(e);f.attr("viewbox",`0 0 ${k} ${d}`),_(f,d,k,r.useMaxWidth);for(const[$,y]of u.entries())R(f,y,$,r);f.append("text").text(l).attr("x",k/2).attr("y",d-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),R=s((t,e,o,{rowHeight:n,paddingX:i,paddingY:r,bitWidth:a,bitsPerRow:p,showBits:b})=>{const c=t.append("g"),u=o*(n+r)+r;for(const l of e){const g=l.start%p*a+1,d=(l.end-l.start+1)*a-i;if(c.append("rect").attr("x",g).attr("y",u).attr("width",d).attr("height",n).attr("class","packetBlock"),c.append("text").attr("x",g+d/2).attr("y",u+n/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!b)continue;const k=l.end===l.start,f=u-2;c.append("text").attr("x",g+(k?d/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(l.start),k||c.append("text").attr("x",g+d).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),U={draw:Q},V={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},X=s(({packet:t}={})=>{const e=x(V,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),rt={parser:K,db:h,renderer:U,styles:X};export{rt as diagram};
