document.addEventListener('DOMContentLoaded', function() {
    // --- 3D Background ---
    let scene, camera, renderer, stars;
    function init3DBackground() {
        if (typeof THREE === 'undefined') { return; }
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 6000; i++) {
            starVertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7 }));
        scene.add(stars);
        window.addEventListener('resize', onWindowResize, false);
        animate();
    }

    function animate() {
        if (stars) stars.rotation.y += 0.0002;
        if (renderer && scene && camera) renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    function onWindowResize() {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    // --- Page & Mobile Navigation ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function switchPage(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.querySelector(targetId);
        if (targetPage) targetPage.classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) link.classList.add('active');
        });
        
        if (mobileMenu) mobileMenu.classList.remove('show');
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(link.getAttribute('href'));
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(link.getAttribute('href'));
        });
    });

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }

    // --- Project Data & Injection ---
    const projectsData = [
        {
            title: 'Enterprise-Ready 3D Automation Tool',
            description: 'Created an AI-powered automation pipeline for Blender using Python and LLM APIs, cutting modelling and rendering time by 65%.',
            tech: ['Python', 'Blender API', 'LLM APIs', 'Docker', 'AI/ML'],
            image: 'assets/blender-project.png',
            liveLink: '#',
            repoLink: '#'
        },
        {
            title: 'Smart Building Automation System',
            description: 'Developing an IoT-integrated system for energy efficiency and security, featuring remote automation via a full-fledged web and mobile application.',
            tech: ['NodeMCU', 'AWS', 'MERN Stack', 'React Native'],
            image: 'assets/smart-building.png',
            liveLink: '#',
            repoLink: '#'
        },
        {
            title: 'Ehaa Earth Website & Sensor Integration',
            description: 'Managed and optimized the official website for performance and UX. Also led the integration of advanced sensors (PM2.5, PM10) into air purifiers for real-time monitoring.',
            tech: ['HTML/CSS', 'JavaScript', 'Firebase', 'Arduino', 'Sensors'],
            image: 'assets/ehaa-earth.png',
            liveLink: 'https://ehaaearth.com/',
            repoLink: '#'
        },
        {
            title: 'Flood Detection & Alert System (IoT)',
            description: 'Built an IoT-based flood detection system with real-time alerts via AWS IoT Core and MQTT, ensuring high reliability and low latency.',
            tech: ['NodeMCU', 'AWS IoT', 'MQTT', 'JavaScript', 'MySQL'],
            image: 'assets/flood-detection.png',
            liveLink: '#',
            repoLink: '#'
        },
        {
            title: 'Stress Prediction IoT System (IIT Bombay)',
            description: 'Enhanced a wearable-based system for real-time stress monitoring using physiological sensors and Python for data analysis. Achieved 3rd Prize among 10,000+ participants.',
            tech: ['Arduino', 'Python', 'Power BI', 'Data Analytics'],
            image: 'assets/stress-prediction.png',
            liveLink: '#',
            repoLink: '#'
        },
        {
            title: 'ISTE Official Website',
            description: 'Independently designed, developed, and deployed a fully responsive, high-performance website, resulting in a 40% increase in user engagement.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design'],
            image: 'assets/iste-website.png',
            liveLink: '#',
            repoLink: '#'
        }
    ];

    const projectsContainer = document.getElementById('projects-grid');
    if (projectsContainer) {
        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'card-3d bg-white rounded-xl border border-gray-200/80 flex flex-col overflow-hidden';
            projectCard.innerHTML = `
                <div class="w-full h-48 bg-gray-200">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x400/E2E8F0/4A5568?text=Project+Image'">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">${project.title}</h3>
                    <p class="text-gray-600 flex-grow mb-6 text-sm">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.tech.map(t => `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">${t}</span>`).join('')}
                    </div>
                    <div class="mt-auto flex gap-4">
                        <a href="${project.liveLink}" target="_blank" class="flex-1 text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm ${project.liveLink === '#' ? 'hidden' : ''}">Live Demo</a>
                        <a href="${project.repoLink}" target="_blank" class="flex-1 text-center bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition text-sm ${project.repoLink === '#' ? 'hidden' : ''}">GitHub Repo</a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    // --- Initialize ---
    init3DBackground();
});
