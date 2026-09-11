import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {career} from '../data/career';

export default function CareerAtlas({active,onSelect,paused,onPause}){
 const mount=useRef(null),api=useRef(null),callback=useRef(onSelect);callback.current=onSelect;
 const [failed,setFailed]=useState(false);
 useEffect(()=>{if(api.current)api.current.target=active;},[active]);
 useEffect(()=>{if(api.current)api.current.paused=paused;},[paused]);
 useEffect(()=>{
  const el=mount.current;let renderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch{setFailed(true);return;}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
  el.appendChild(renderer.domElement);const canvas=renderer.domElement;canvas.setAttribute('aria-label','Interactive career atlas. Drag to rotate, scroll to zoom, or use the controls below.');canvas.setAttribute('role','img');
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(10,9,14);
  const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=10;controls.maxDistance=28;controls.minPolarAngle=.2;controls.maxPolarAngle=1.36;controls.target.set(0,0,0);controls.autoRotateSpeed=.35;
  scene.add(new THREE.HemisphereLight(0xd0eaff,0x151324,2.6));const light=new THREE.DirectionalLight(0xffffff,4);light.position.set(4,10,6);scene.add(light);const blue=new THREE.PointLight(0x667aff,50);blue.position.set(-7,4,-4);scene.add(blue);
  const atlas=new THREE.Group();scene.add(atlas);const nodes=[],animated=[],pickables=[];const mats={};
  function material(color,metalness=.3){const key=color+'-'+metalness;return mats[key]??=(new THREE.MeshStandardMaterial({color,metalness,roughness:.48}));}
  function box(parent,x,y,z,w,h,d,color,metal=.3){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color,metal));m.position.set(x,y,z);parent.add(m);return m;}
  function cylinder(parent,x,y,z,r,h,color,sides=48){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,sides),material(color));m.position.set(x,y,z);parent.add(m);return m;}
  function line(parent,points,color){const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({color,transparent:true,opacity:.65}));parent.add(l);return l;}
  function sphere(parent,x,y,z,r,color){const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),material(color));m.position.set(x,y,z);parent.add(m);return m;}
  function label(text,color){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.font='600 48px sans-serif';ctx.textAlign='center';ctx.fillText(text,256,76);const tex=new THREE.CanvasTexture(c);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,depthTest:false}));s.scale.set(2.8,.7,1);return s;}
  career.forEach((c,i)=>{
   const g=new THREE.Group();const angle=i/5*Math.PI*2-Math.PI/2;g.position.set(Math.cos(angle)*4.45,0,Math.sin(angle)*4.45);atlas.add(g);nodes.push(g);
   const base=cylinder(g,0,-.35,0,1.66,.45,0x202c39,6);base.userData.index=i;pickables.push(base);cylinder(g,0,-.08,0,1.58,.12,0x354352,6);
   const ring=new THREE.Mesh(new THREE.TorusGeometry(1.7,.022,8,80),new THREE.MeshBasicMaterial({color:c.color}));ring.rotation.x=Math.PI/2;ring.position.y=-.09;g.add(ring);
   const l=label(c.id==='isb'?'ISB · 2027':c.name.toUpperCase(),c.color);l.position.set(0,-.9,0);g.add(l);
   if(i===0){
    for(let x=-5;x<=5;x++)for(let z=-5;z<=5;z++){if(x*x+z*z>30)continue;const h=.12+.42*(Math.sin(x*.72)*Math.cos(z*.7)+1)/2;box(g,x*.23,h/2,z*.23,.215,h,.215,(x+z)%3===0?0x579e87:0x37655e);}
    const mast=cylinder(g,.3,.9,.1,.035,1.1,0xbde5dc);const dish=new THREE.Mesh(new THREE.SphereGeometry(.48,24,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:0xd9ede6,side:THREE.DoubleSide,metalness:.6,roughness:.3}));dish.rotation.z=-.7;dish.position.set(.3,1.48,.1);g.add(dish);
    const scan=new THREE.Mesh(new THREE.TorusGeometry(.92,.018,6,64),new THREE.MeshBasicMaterial({color:c.color}));scan.rotation.x=Math.PI/2;scan.position.y=.6;g.add(scan);animated.push({mesh:scan,type:'radar'});
   }else if(i===1){
    const globe=new THREE.Mesh(new THREE.IcosahedronGeometry(.95,2),new THREE.MeshStandardMaterial({color:0x277abc,wireframe:true,emissive:0x103766}));globe.position.y=1.1;g.add(globe);animated.push({mesh:globe,type:'spin'});
    for(let j=0;j<7;j++){const a=j/7*Math.PI*2;sphere(g,Math.cos(a)*1.2,.4,Math.sin(a)*1.2,.1,c.color);line(g,[[Math.cos(a)*1.2,.4,Math.sin(a)*1.2],[0,1.1,0]],c.color);}
    for(let j=0;j<3;j++){const orbit=new THREE.Mesh(new THREE.TorusGeometry(1.12,.014,6,80),material(c.color));orbit.position.y=1.1;orbit.rotation.set(j*.7,.6,j*.8);g.add(orbit);}
   }else if(i===2){
    for(let j=0;j<3;j++){box(g,-.95+j*.95,.58,-.35,.55,1.15,.52,0x525075);for(let k=0;k<5;k++){box(g,-.95+j*.95,.2+k*.18,-.08,.4,.025,.025,c.color);sphere(g,-1.09+j*.95,.2+k*.18,-.05,.025,0xebdfff);}}
    box(g,-.66,.7,.65,.12,1.4,.15,c.color);box(g,.66,.7,.65,.12,1.4,.15,c.color);box(g,0,1.4,.65,1.44,.13,.15,c.color);
    for(let j=0;j<5;j++){const p=box(g,(j-2)*.2,.4,.6,.08,.08,.08,0xffffff);animated.push({mesh:p,type:'packet',phase:j});}
   }else if(i===3){
    box(g,0,.68,0,1.7,1.36,.95,0x657180);box(g,-.95,.42,0,.3,.84,.8,0x46515e);box(g,.95,.42,0,.3,.84,.8,0x46515e);
    box(g,0,1.1,.5,.4,.12,.04,c.color);box(g,0,1.1,.5,.12,.4,.05,c.color);
    for(let x=-3;x<=3;x++)for(let y=0;y<3;y++)box(g,x*.21,.22+y*.2,.5,.11,.1,.035,y===0?0x8dc4dc:0xd1e9ee);
    const shield=new THREE.Mesh(new THREE.TorusGeometry(.48,.065,8,6),material(c.color));shield.position.set(0,1.95,0);g.add(shield);box(g,0,1.95,0,.18,.26,.18,0xf9b9ad);animated.push({mesh:shield,type:'spin'});
   }else{
    box(g,0,.95,-.2,2.1,.17,.7,0xe7d8ad);for(let j=0;j<5;j++)cylinder(g,-.85+j*.425,.49,-.15,.065,.9,0xc7bb9b,16);
    box(g,0,.08,0,2.3,.16,1.15,0xa6a18f);box(g,0,.2,-.3,1.9,.12,.6,0xddd0ad);
    const roof=new THREE.Mesh(new THREE.ConeGeometry(1.3,.55,4),material(0xa48b5d));roof.rotation.y=Math.PI/4;roof.scale.z=.65;roof.position.set(0,1.3,-.2);g.add(roof);
    for(let j=0;j<3;j++){const book=box(g,.2*j-.2,.18+j*.13,.8,.75,.1,.4,[0xceb778,0x76889a,0xbd856b][j]);book.rotation.y=j*.13;}
   }
   g.traverse(o=>{if(o.isMesh){o.userData.index=i;pickables.push(o);}});
  });
  const path=[];for(let j=0;j<=160;j++){let a=j/160*Math.PI*2;path.push([Math.cos(a)*4.45,-.4,Math.sin(a)*4.45]);}line(atlas,path,0x526776);
  cylinder(atlas,0,-.65,0,1.1,.15,0x27343d,64);const core=new THREE.Mesh(new THREE.OctahedronGeometry(.65),new THREE.MeshStandardMaterial({color:0xa9f0d3,metalness:.7,roughness:.2}));core.position.y=.25;atlas.add(core);animated.push({mesh:core,type:'spin'});
  for(let j=0;j<5;j++)line(atlas,[[0,-.55,0],[nodes[j].position.x,-.55,nodes[j].position.z]],0x45675d);
  const grid=new THREE.GridHelper(20,40,0x243b39,0x172c2c);grid.position.y=-.9;scene.add(grid);
  const state={target:active,paused,angle:0};api.current=state;
  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
  const onDown=e=>{down=[e.clientX,e.clientY];};const onUp=e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickables)[0];if(hit)callback.current(hit.object.userData.index);};canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointerup',onUp);
  const resize=()=>{const {width,height}=el.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(el);resize();
  let visible=true;const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibility.observe(el);
  let frame,last=0,time=0;const draw=now=>{frame=requestAnimationFrame(draw);if(document.hidden||!visible)return;const dt=Math.min((now-last)/1000,.04);last=now;if(!state.paused&&!reduced.matches)time+=dt;controls.autoRotate=!state.paused&&!reduced.matches&&state.target===null;controls.update();
   const targetAngle=state.target===null?0:-state.target/5*Math.PI*2+Math.PI*.88;state.angle+=(targetAngle-state.angle)*(reduced.matches?1:.035);atlas.rotation.y=state.angle;
   nodes.forEach((n,i)=>{const dest=state.target===i?.45:0;n.position.y+=(dest-n.position.y)*.08;const scale=state.target===i?1.1:1;n.scale.lerp(new THREE.Vector3(scale,scale,scale),.06);});
   animated.forEach(({mesh,type,phase=0})=>{if(type==='spin')mesh.rotation.y=time*.22;if(type==='radar'){mesh.position.y=.65+Math.sin(time)*.14;mesh.scale.setScalar(1+Math.sin(time)*.1);}if(type==='packet')mesh.position.z=((time*.6+phase*.25)%1.8)-.8;});renderer.render(scene,camera);};frame=requestAnimationFrame(draw);
  state.reset=()=>{controls.reset();camera.position.set(10,9,14);controls.target.set(0,0,0);};state.zoom=f=>{camera.position.sub(controls.target).multiplyScalar(f).clampLength(10,28).add(controls.target);};state.rotate=()=>{camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),.25);};
  const lost=e=>{e.preventDefault();setFailed(true);};canvas.addEventListener('webglcontextlost',lost);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();controls.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{m.map?.dispose();m.dispose();});}});renderer.dispose();canvas.remove();api.current=null;};
 },[]);
 return <div className="atlas-shell"><div ref={mount} className="atlas-canvas"/>{failed&&<div className="atlas-fallback">The 3D view is unavailable on this device. Explore every chapter using the career buttons below.</div>}<div className="atlas-meta"><span>CAREER ATLAS / 01—05</span><span>2018 → 2027</span></div><div className="atlas-controls"><span className="gesture-hint">Drag to orbit · Scroll to zoom</span><button onClick={()=>api.current?.zoom(.85)} aria-label="Zoom in">+</button><button onClick={()=>api.current?.zoom(1.15)} aria-label="Zoom out">−</button><button onClick={()=>api.current?.rotate()} aria-label="Rotate atlas">↻</button><button onClick={()=>api.current?.reset()}>Reset</button><button onClick={onPause} aria-pressed={paused}>{paused?'Play motion':'Pause motion'}</button></div></div>;
}
