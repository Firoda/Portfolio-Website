import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
// Vite bundles the app and Three.js; this final pass embeds the runtime and CSS.
const path=resolve('dist/index.html');let html=readFileSync(path,'utf8');
html=html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,(_,url)=>`<style>${readFileSync(resolve('dist',url.slice(url.indexOf('assets/'))),'utf8')}</style>`);
html=html.replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g,(_,url)=>{const file=resolve('dist',url.slice(url.indexOf('assets/')));const js=readFileSync(file,'utf8').replace(/<\/script/gi,'<\\/script');return `<script type="module">${js}</script>`;});
html=html.replace(/<link rel="modulepreload"[^>]*>/g,'');
writeFileSync(path,html);writeFileSync('dist/portfolio.html',html);
console.log('Self-contained portfolio: dist/portfolio.html ('+(Buffer.byteLength(html)/1024/1024).toFixed(2)+' MB)');
