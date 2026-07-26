import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mount = mountRef.current;
    if (!mount || prefersReducedMotion) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(2.2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6ee7f9,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const particleGeometry = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 10;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc8ff4a,
      size: 0.035,
      transparent: true,
      opacity: 0.62,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    let frameId = 0;
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const scroll = window.scrollY * 0.0007;
      mesh.rotation.x += 0.0025;
      mesh.rotation.y += 0.0035;
      particles.rotation.y -= 0.0015;
      group.rotation.z = scroll;
      renderer.render(scene, camera);
    };

    const resize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
