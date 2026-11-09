/* Browser-only export: content stays on the visitor's device. */
(()=>{
const button=document.getElementById('export-ppt');
const status=document.getElementById('export-status');
const themes={
 normal:{name:'노멀',accent:'334155'},
 goldenax:{name:'골드넥스',accent:'EB0029',logo:'assets/logos/goldenax-color.png'},
 ilgram:{name:'일그램',accent:'008A50',logo:'assets/ilgram-logo.png'},
 bat:{name:'BAT',accent:'1827B8',logo:'assets/logos/bat.jpg'},
 innored:{name:'이노레드',accent:'F91120',logo:'assets/logos/innored.svg',dark:true}
};
const text=(root,selector)=>root.querySelector(selector)?.textContent.trim()||'';
let loading;
function library(){
 if(window.PptxGenJS)return Promise.resolve();
 if(!loading)loading=new Promise((resolve,reject)=>{
 const s=document.createElement('script');
 s.src='https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';
 s.onload=resolve;s.onerror=()=>{s.remove();loading=null;reject(new Error('PPT 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.'))};document.head.append(s);
 });return loading;
}
async function picture(url){
 const res=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!res.ok)throw new Error('이미지를 불러오지 못했습니다: '+url);
 const blob=await res.blob();
 return await new Promise((resolve,reject)=>{
 const image=new Image();const src=URL.createObjectURL(blob);
 image.onload=()=>{const canvas=document.createElement('canvas');canvas.width=image.naturalWidth||600;canvas.height=image.naturalHeight||200;canvas.getContext('2d').drawImage(image,0,0);URL.revokeObjectURL(src);resolve({data:canvas.toDataURL('image/png'),ratio:canvas.width/canvas.height})};
 image.onerror=()=>{URL.revokeObjectURL(src);reject(new Error('이미지 변환 실패'))};image.src=src;
 });
}
async function build(version){
 await library();
 const theme=themes[version]||themes.normal,ppt=new window.PptxGenJS();
 ppt.layout='LAYOUT_WIDE';ppt.author='조현장';ppt.subject=theme.name+' 버전 포트폴리오';ppt.title='조현장 포트폴리오';ppt.lang='ko-KR';
 ppt.theme={headFontFace:'Malgun Gothic',bodyFontFace:'Malgun Gothic',lang:'ko-KR'};
 const logo=theme.logo?await picture(theme.logo):null;
 let page=0;
 function tx(slide,value,x,y,w,h,size=20,color='202020',bold=false){slide.addText(value,{x,y,w,h,fontSize:size,fontFace:'Malgun Gothic',color,bold,margin:0,breakLine:false,fit:'shrink',valign:'mid'})}
 function contain(slide,img,x,y,w,h){let iw=w,ih=w/img.ratio;if(ih>h){ih=h;iw=h*img.ratio}if(img===logo&&theme.dark)slide.addShape(ppt.ShapeType.rect,{x:x-.1,y:y-.05,w:w+.2,h:h+.1,line:{color:'161616'},fill:{color:'161616'}});slide.addImage({data:img.data,x:x+(w-iw)/2,y:y+(h-ih)/2,w:iw,h:ih})}
 function slide(title,dark=false){const s=ppt.addSlide();s.background={color:dark?'161616':'FFFFFF'};page++;tx(s,title,.65,.55,10,0.7,32,dark?'FFFFFF':theme.accent,true);tx(s,String(page),12.05,6.98,.5,.2,10,dark?'FFFFFF':'777777');if(logo)contain(s,logo,11.5,.45,1.15,.6);return s}
 let s=slide('조현장 포트폴리오',theme.dark);
 tx(s,'언제나\n현장이 답이다',.8,2,11.5,2.6,58,theme.dark?'FFFFFF':theme.accent,true);
 tx(s,theme.name+' 버전',.8,5.8,10,.4,18,theme.dark?'FFFFFF':'555555');
 const factors=[...document.querySelectorAll('#profile .swot-item')];
 for(let i=0;i<factors.length;i+=2){s=slide('현재의 조현장');factors.slice(i,i+2).forEach((item,j)=>{const y=1.7+j*2.35;tx(s,text(item,'dt').replace(/\s+/g,' '),.8,y,11.6,.5,22,theme.accent,true);tx(s,text(item,'dd'),.8,y+.65,11.5,1.5,22)});}
 s=slide('걸어온 흔적');
 document.querySelectorAll('.experience-card').forEach((card,i)=>{const y=1.65+i*1.65;tx(s,text(card,'.exp-org'),.8,y,6,.45,24,'202020',true);tx(s,text(card,'.exp-period'),9,y,3.4,.45,17);tx(s,text(card,'.exp-role'),.8,y+.5,11.7,.35,18);tx(s,[...card.querySelectorAll('.exp-meta span')].map(e=>e.textContent.trim()).join(' / '),.8,y+.95,11.7,.45,17,'555555')});
 for(const card of document.querySelectorAll('.roas-card')){
 status.textContent=text(card,'.project-title')+' 성과 정리 중…';
 s=slide(text(card,'.project-title'));tx(s,text(card,'.roas-value'),.8,1.35,8,.5,26,theme.accent,true);
 tx(s,text(card,'.roas-note'),.8,1.95,11.7,.35,17,'555555');
 const img=card.querySelector('.roas-preview img');if(img)contain(s,await picture(img.src),.8,2.45,11.7,4.2);
 }
 const entries=Object.entries(skillCopy);
 for(let i=0;i<entries.length;i+=4){s=slide('역량의 확장');entries.slice(i,i+4).forEach(([name,copy],j)=>{const y=1.65+j*1.2;tx(s,name,.8,y,3.2,.5,23,theme.accent,true);tx(s,copy.description,4.2,y,8.2,.85,20)})}
 s=slide('Contact',theme.dark);tx(s,[...document.querySelectorAll('.contact-panel p')].map(e=>e.textContent.trim()).join('\n'),.8,2,11,2.5,26,theme.dark?'FFFFFF':'202020');
 return {ppt,filename:'조현장_포트폴리오_'+theme.name+'.pptx'};
}
window.buildPortfolioPpt=build;
button.addEventListener('click',async()=>{
 if(button.disabled)return;
 const version=document.body.dataset.portfolioVersion||'normal';
 button.disabled=true;button.textContent='PPT 만드는 중…';status.textContent='현재 버전의 포트폴리오를 정리합니다.';
 try{const {ppt,filename}=await build(version);await ppt.writeFile({fileName:filename});status.textContent='다운로드를 시작했습니다.'}
 catch(error){console.error(error);status.textContent='다운로드 실패. '+error.message}
 finally{button.disabled=false;button.textContent='PPT 다운로드'}
});
})();
