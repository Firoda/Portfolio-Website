import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'/Portfolio-Website/',plugins:[react()],build:{assetsInlineLimit:()=>true,cssCodeSplit:false,rollupOptions:{output:{inlineDynamicImports:true}}}});
