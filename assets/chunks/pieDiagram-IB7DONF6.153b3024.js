import{p as B}from"./chunk-4BMEZGHF.343ef6ac.js";import{O as U,z as V,A as Z,s as j,h as X,j as Y,i as q,f as i,u as D,F as H,k as J,P as K,aV as Q,aX as ee,aY as z,aZ as te,v as ae,a_ as re}from"../app.80007782.js";import{p as ie}from"./mermaid-parser.core.64a26d23.js";import"./baseUniq.eddb6d66.js";import"./basePickBy.74cb3d6d.js";import"./clone.36443edc.js";var F=U.pie,w={sections:new Map,showData:!1,config:F},m=w.sections,y=w.showData,se=structuredClone(F),ne=i(()=>structuredClone(se),"getConfig"),oe=i(()=>{m=new Map,y=w.showData,H()},"clear"),le=i(({label:e,value:a})=>{m.has(e)||(m.set(e,a),D.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),ce=i(()=>m,"getSections"),pe=i(e=>{y=e},"setShowData"),de=i(()=>y,"getShowData"),G={getConfig:ne,clear:oe,setDiagramTitle:V,getDiagramTitle:Z,setAccTitle:j,getAccTitle:X,setAccDescription:Y,getAccDescription:q,addSection:le,getSections:ce,setShowData:pe,getShowData:de},ge=i((e,a)=>{B(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ue={parse:i(async e=>{const a=await ie("pie",e);D.debug(a),ge(a,G)},"parse")},fe=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),he=fe,me=i(e=>{const a=[...e.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,l)=>l.value-s.value);return re().value(s=>s.value)(a)},"createPieArcs"),ve=i((e,a,O,s)=>{D.debug(`rendering pie chart
`+e);const l=s.db,T=J(),$=K(l.getConfig(),T.pie),A=40,n=18,g=4,c=450,v=c,S=Q(a),p=S.append("g");p.attr("transform","translate("+v/2+","+c/2+")");const{themeVariables:r}=T;let[u]=ee(r.pieOuterStrokeWidth);u!=null||(u=2);const _=$.textPosition,f=Math.min(v,c)/2-A,P=z().innerRadius(0).outerRadius(f),M=z().innerRadius(f*_).outerRadius(f*_);p.append("circle").attr("cx",0).attr("cy",0).attr("r",f+u/2).attr("class","pieOuterCircle");const E=l.getSections(),x=me(E),R=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],d=te(R);p.selectAll("mySlices").data(x).enter().append("path").attr("d",P).attr("fill",t=>d(t.data.label)).attr("class","pieCircle");let b=0;E.forEach(t=>{b+=t}),p.selectAll("mySlices").data(x).enter().append("text").text(t=>(t.data.value/b*100).toFixed(0)+"%").attr("transform",t=>"translate("+M.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(l.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const C=p.selectAll(".legend").data(d.domain()).enter().append("g").attr("class","legend").attr("transform",(t,o)=>{const h=n+g,L=h*d.domain().length/2,W=12*n,N=o*h-L;return"translate("+W+","+N+")"});C.append("rect").attr("width",n).attr("height",n).style("fill",d).style("stroke",d),C.data(x).append("text").attr("x",n+g).attr("y",n-g).text(t=>{const{label:o,value:h}=t.data;return l.getShowData()?`${o} [${h}]`:o});const I=Math.max(...C.selectAll("text").nodes().map(t=>{var o;return(o=t==null?void 0:t.getBoundingClientRect().width)!=null?o:0})),k=v+A+n+g+I;S.attr("viewBox",`0 0 ${k} ${c}`),ae(S,c,k,$.useMaxWidth)},"draw"),Se={draw:ve},$e={parser:ue,db:G,renderer:Se,styles:he};export{$e as diagram};
