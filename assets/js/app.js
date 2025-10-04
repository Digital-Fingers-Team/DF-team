'use strict';

(function () {
  const { createApp, nextTick } = Vue;
  const themes = ['light', 'dark', 'aurora'];
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const app = createApp({
    data() {
      return {
        theme: localStorage.getItem('df-theme-preference') || 'light',
        themes,
        prefersReducedMotion: motionQuery.matches,
        isMenuOpen: false,
        isHeaderFloating: false,
        showBackToTop: false,
        activeHash: '#hero',
        sectionTargets: [],
        heroScene: null,
        navLinks: [
          { label: 'الرئيسية', hash: '#hero', icon: 'fa-house' },
          { label: 'عن الفريق', hash: '#about', icon: 'fa-users' },
          { label: 'مرتكزاتنا', hash: '#pillars', icon: 'fa-gem' },
          { label: 'الأرقام', hash: '#metrics', icon: 'fa-chart-line' },
          { label: 'محطات مميزة', hash: '#milestones', icon: 'fa-timeline' },
          { label: 'المشاريع', hash: '#projects', icon: 'fa-rocket' },
          { label: 'التدريبات', hash: '#trainings', icon: 'fa-chalkboard' },
          { label: 'الفريق', hash: '#team', icon: 'fa-id-card-clip' },
          { label: 'آراء الأعضاء', hash: '#testimonials', icon: 'fa-comments' },
          { label: 'الموارد', hash: '#resources', icon: 'fa-books' },
          { label: 'تواصلوا معنا', hash: '#contact', icon: 'fa-envelope' }
        ],
        heroBadges: [
          { icon: 'fa-brain', text: 'ابتكار رقمي ملهم' },
          { icon: 'fa-people-group', text: 'مجتمع طلابي مُلهم' },
          { icon: 'fa-code', text: 'تعلم عملي متقدّم' }
        ],
        heroHighlight: {
          title: 'نُشكّل المستقبل الرقمي في مدرسة الشهيد مدحت طلعت',
          subtitle:
            'فريق الأنامل الرقمية هو مساحة تجمع المبدعين، وتدفعهم لصناعة مشاريع رقمية متكاملة داخل المدرسة وخارجها. عبر التدريب، الإرشاد، والتعاون، نُحوّل الأفكار إلى تجارب تفاعلية نابضة بالحياة.'
        },
        ctaButtons: [
          { label: 'استكشف مشاريعنا', hash: '#projects', variant: 'primary' },
          { label: 'انضم للتجربة', hash: '#contact', variant: 'outline' }
        ],
        metrics: [
          { icon: 'fa-sparkles', target: 42, suffix: '+', label: 'مبادرة تقنية مبتكرة' },
          { icon: 'fa-people-line', target: 180, suffix: '+', label: 'طالب وطالبة شاركوا في ورش العمل' },
          { icon: 'fa-medal', target: 12, suffix: '', label: 'جوائز وتكريمات محلية وإقليمية' },
          { icon: 'fa-clock-rotate-left', target: 3200, suffix: '+', label: 'ساعة تدريب وإرشاد متخصص' }
        ],
        pillars: [
          {
            icon: 'fa-flask-vial',
            title: 'مختبرات الابتكار',
            description: 'جلسات أسبوعية لاستكشاف أحدث تقنيات الذكاء الاصطناعي، الواقع الممتد، وإنترنت الأشياء عبر تجارب عملية.'
          },
          {
            icon: 'fa-handshake-angle',
            title: 'المجتمع التعاوني',
            description: 'منظومة تعتمد على العمل الجماعي والتوجيه بين الأقران لرفع سقف الإبداع لدى كل عضو.'
          },
          {
            icon: 'fa-seedling',
            title: 'رحلة تعلم مدروسة',
            description: 'مسارات تعليمية متدرجة تبدأ بالأساسيات وتصل إلى بناء منتجات رقمية متكاملة.'
          },
          {
            icon: 'fa-earth-europe',
            title: 'تأثير يتجاوز المدرسة',
            description: 'مبادرات تخدم المجتمع وتعزز الثقافة الرقمية في المدرسة والمدينة.'
          }
        ],
        timeline: [
          {
            time: '2021',
            title: 'انطلاقة الفريق',
            summary: 'بداية الرحلة مع مجموعة صغيرة من الطلبة المتحمسين، وانشاء أول معسكر تقني داخلي.'
          },
          {
            time: '2022',
            title: 'التوسع والتخصص',
            summary: 'إطلاق مسارات متخصصة في تصميم واجهات المستخدم، الأمن السيبراني، والروبوتات التعليمية.'
          },
          {
            time: '2023',
            title: 'جوائز وإنجازات',
            summary: 'تحقيق المركز الأول في تحديات الابتكار الطلابي، وتقديم مشاريع مفتوحة المصدر خدمت مئات الطلبة.'
          },
          {
            time: '2024',
            title: 'رحلة نحو المستقبل',
            summary: 'إضافة تقنيات ثلاثية الأبعاد والتعلم المعتمد على المشاريع لرفع جودة التجربة التعليمية.'
          }
        ],
        showcases: [
          {
            title: 'Digital Guardian',
            category: 'أمن سيبراني',
            description: 'نظام تفاعلي يعلّم أساسيات حماية البيانات باستخدام قصص مصوّرة وتمثيل مرئي لحالات الاختراق.',
            tags: ['Cybersecurity', 'Storytelling', 'Students'],
            icon: 'fa-shield'
          },
          {
            title: 'Aurora Lab VR',
            category: 'واقع ممتد',
            description: 'مختبر افتراضي يتيح للطلاب بناء تجارب ثلاثية الأبعاد واستعراضها داخل بيئة الواقع الافتراضي.',
            tags: ['VR', 'Three.js', 'STEM'],
            icon: 'fa-vr-cardboard'
          },
          {
            title: 'Pulse Analytics',
            category: 'علوم بيانات',
            description: 'منصة ذكية تعرض بصريّات عن أداء الأنشطة الطلابية وتساعد على اتخاذ قرارات مبنية على البيانات.',
            tags: ['DataViz', 'Vue.js', 'Analytics'],
            icon: 'fa-chart-simple'
          }
        ],
        trainings: [
          {
            title: 'معسكر تصميم تجربة المستخدم',
            date: 'أكتوبر 2024',
            summary: 'رحلة مكثفة لمدة 4 أسابيع لبناء واجهات تركز على المستخدم باستخدام أدوات احترافية ونماذج تفاعلية.',
            tag: 'UX/UI'
          },
          {
            title: 'مختبر الذكاء الاصطناعي المصغّر',
            date: 'ديسمبر 2024',
            summary: 'تجارب عملية لبناء نماذج تعلم الآلة الصغيرة وتضمينها داخل تطبيقات ويب تفاعلية.',
            tag: 'AI/ML'
          },
          {
            title: 'Sprint الابتكار السريع',
            date: 'يناير 2025',
            summary: 'تحدي مدته 72 ساعة لتطوير حلول تقنية لمشكلات مدرسية حقيقية باستخدام منهجية التصميم المتمركز حول الإنسان.',
            tag: 'Innovation'
          }
        ],
        events: [
          {
            title: 'قمة الأنامل الرقمية',
            date: 'مارس 2025',
            summary: 'حدث سنوي يجمع الخبراء والطلاب لعرض أحدث المشاريع، ورش العمل، والحوارات التخصصية.',
            tag: 'Conference'
          },
          {
            title: 'هاكاثون المجتمع المدرسي',
            date: 'مايو 2025',
            summary: 'مسابقة تطوير حلول تقنية تخدم البيئة المدرسية بفعالية عالية خلال 48 ساعة.',
            tag: 'Hackathon'
          }
        ],
        testimonials: [
          {
            name: 'مريم أشرف',
            role: 'قائدة الفريق الإبداعي',
            quote: 'تجربتي في الأنامل الرقمية جعلتني أتقن تحويل الأفكار إلى منتجات حقيقية تُحدث أثراً في المدرسة والمجتمع.',
            avatar: 'image/member-1.png'
          },
          {
            name: 'حسن محسن',
            role: 'مهندس برمجيات ناشئ',
            quote: 'من خلال مشاريع الفريق تعلمت تقنيات ثلاثية الأبعاد وطرق تقديم قصص تفاعلية جذابة باستخدام Vue و Three.js.',
            avatar: 'image/member-2.png'
          },
          {
            name: 'أسماء جمال',
            role: 'منسقة التدريب',
            quote: 'الروح التعاونية داخل الفريق سهلت علينا بناء بيئات تعلم غنية تُحفز الإبداع والابتكار لدى الجميع.',
            avatar: 'image/member-3.png'
          }
        ],
        partners: [
          'منظمة الإبداع الطلابي',
          'Tech4School',
          'مركز تميز التعلم الرقمي',
          'Spark AR Lab',
          'Google for Education'
        ],
        resources: [
          {
            title: 'دليل بناء واجهات Vue المتقدمة',
            link: 'https://vuejs.org/guide/introduction.html',
            description: 'مصادر رسمية لتعلم Vue 3 مع أمثلة عملية وأفضل الممارسات.'
          },
          {
            title: 'دروس Three.js التفاعلية',
            link: 'https://threejs.org/examples/',
            description: 'مجموعة من الأمثلة الجاهزة لتطوير مشاهد ثلاثية الأبعاد مبهرة.'
          },
          {
            title: 'Anime.js Cookbook',
            link: 'https://animejs.com/documentation/',
            description: 'وثائق متكاملة لإنشاء حركات انتقالية وسرد بصري متقن.'
          }
        ],
        faqs: [
          {
            question: 'كيف يمكنني الانضمام للفريق؟',
            answer: 'نفتح باب التسجيل مرتين سنويًا، ويمكن للطلاب التقديم عبر النموذج الرقمي أو التحدث مباشرة إلى فريق التنسيق.'
          },
          {
            question: 'هل يلزم خبرة مسبقة في البرمجة؟',
            answer: 'لا، نقوم ببناء المهارات خطوة بخطوة ونوفر مرشدين لمرافقة الأعضاء الجدد منذ اليوم الأول.'
          },
          {
            question: 'ما نوع المشاريع التي نعمل عليها؟',
            answer: 'نركز على المشاريع التي تخدم المجتمع المدرسي، من تطبيقات الويب إلى الحلول الذكية والروبوتات التعليمية.'
          }
        ],
        contactChannels: [
          { label: 'بريد إلكتروني', value: 'digitalfingers@school.edu.eg', icon: 'fa-envelope' },
          { label: 'الهاتف الداخلي', value: '+20 2 5555 789', icon: 'fa-phone' },
          { label: 'فيسبوك', value: 'Digital Fingers Team', icon: 'fa-facebook', link: 'https://www.facebook.com/share/1ErivsfJZ6/' },
          { label: 'جيت هب', value: 'Digital-Fingers-Team', icon: 'fa-github', link: 'https://github.com/Digital-Fingers-Team' }
        ]
      };
    },
    created() {
      if (!this.themes.includes(this.theme)) {
        this.theme = 'light';
      }
      this.setTheme(this.theme);
    },
    mounted() {
      this.$nextTick(() => {
        this.collectSectionTargets();
        this.handleScroll();
      });
      this.initHeroScene();
      this.initRevealAnimations();
      this.runHeroIntro();
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      window.addEventListener('resize', this.onResizeHero, { passive: true });
      motionQuery.addEventListener('change', this.handleMotionChange);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.onResizeHero);
      motionQuery.removeEventListener('change', this.handleMotionChange);
      this.disposeHeroScene();
      if (this.revealObserver) {
        this.revealObserver.disconnect();
      }
    },
    watch: {
      theme(newTheme) {
        this.setTheme(newTheme);
      },
      isMenuOpen(isOpen) {
        document.body.classList.toggle('is-locked', isOpen);
      }
    },
    methods: {
      cycleTheme() {
        const currentIndex = this.themes.indexOf(this.theme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.theme = this.themes[nextIndex];
      },
      setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('df-theme-preference', theme);
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      closeMenu() {
        this.isMenuOpen = false;
      },
      navigateTo(hash) {
        if (!hash) return;
        if (!hash.startsWith('#')) {
          window.location.href = hash;
          return;
        }
        const target = document.querySelector(hash);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        this.closeMenu();
      },
      handleScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        this.isHeaderFloating = scrollY > 64;
        this.showBackToTop = scrollY > 640;
        this.updateActiveHash(scrollY);
      },
      collectSectionTargets() {
        this.sectionTargets = this.navLinks
          .filter((link) => link.hash && link.hash.startsWith('#'))
          .map((link) => {
            const element = document.querySelector(link.hash);
            return element ? { hash: link.hash, el: element } : null;
          })
          .filter(Boolean);
      },
      updateActiveHash(scrollY) {
        let current = '#hero';
        for (const section of this.sectionTargets) {
          const offsetTop = section.el.offsetTop - 200;
          if (scrollY >= offsetTop) {
            current = section.hash;
          }
        }
        this.activeHash = current;
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      handleMotionChange(event) {
        this.prefersReducedMotion = event.matches;
      },
      initHeroScene() {
        if (this.prefersReducedMotion || typeof THREE === 'undefined') {
          return;
        }
        const canvas = this.$refs.heroCanvas;
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0f172a, 12, 38);

        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 18);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);

        const keyLight = new THREE.PointLight(0x7c3aed, 1.4, 60);
        keyLight.position.set(-6, 4, 10);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight(0x22d3ee, 1.2, 60);
        rimLight.position.set(6, -3, -8);
        scene.add(rimLight);

        const particles = [];
        const group = new THREE.Group();
        const geometry = new THREE.IcosahedronGeometry(0.22, 1);

        for (let i = 0; i < 120; i += 1) {
          const material = new THREE.MeshStandardMaterial({
            color: 0x7c3aed,
            emissive: 0x2d1b69,
            emissiveIntensity: 0.65,
            roughness: 0.35,
            metalness: 0.6,
            transparent: true,
            opacity: 0.85
          });
          const mesh = new THREE.Mesh(geometry.clone(), material);
          mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 16);
          mesh.userData = {
            offset: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.8,
            amplitude: 0.12 + Math.random() * 0.22
          };
          particles.push(mesh);
          group.add(mesh);
        }

        scene.add(group);

        const clock = new THREE.Clock();
        const hero = { renderer, scene, camera, group, particles, clock, frameId: null };

        const renderLoop = () => {
          const elapsed = hero.clock.getElapsedTime();

          hero.particles.forEach((mesh) => {
            const { offset, speed, amplitude } = mesh.userData;
            mesh.position.y += Math.sin(elapsed * speed + offset) * amplitude * 0.01;
            mesh.rotation.x += 0.004 + speed * 0.0015;
            mesh.rotation.y += 0.006 + speed * 0.001;
          });

          hero.group.rotation.y = Math.sin(elapsed * 0.12) * 0.35;
          hero.group.rotation.x = Math.cos(elapsed * 0.08) * 0.12;

          hero.renderer.render(hero.scene, hero.camera);
          hero.frameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        this.heroScene = hero;
        this.onResizeHero();
      },
      onResizeHero() {
        if (!this.heroScene) return;
        const canvas = this.$refs.heroCanvas;
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight || width * 0.65;
        this.heroScene.camera.aspect = width / height;
        this.heroScene.camera.updateProjectionMatrix();
        this.heroScene.renderer.setSize(width, height);
        this.heroScene.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      },
      disposeHeroScene() {
        if (!this.heroScene) return;
        cancelAnimationFrame(this.heroScene.frameId);
        this.heroScene.scene.traverse((object) => {
          if (!object.isMesh) return;
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        this.heroScene.renderer.dispose();
        this.heroScene = null;
      },
      initRevealAnimations() {
        if (this.prefersReducedMotion || typeof anime === 'undefined') return;
        const animatedNodes = document.querySelectorAll('[data-animate]');
        animatedNodes.forEach((node) => {
          node.style.opacity = 0;
          if (node.dataset.animate === 'scale-in') {
            node.style.transform = 'scale(0.92) translateY(16px)';
          } else {
            node.style.transform = 'translateY(24px)';
          }
        });

        this.revealObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              this.runRevealAnimation(entry.target);
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.25,
            rootMargin: '0px 0px -10%' }
        );

        animatedNodes.forEach((node) => this.revealObserver.observe(node));
      },
      runRevealAnimation(element) {
        if (typeof anime === 'undefined') return;
        const effect = element.dataset.animate;
        const common = {
          targets: element,
          duration: 900,
          easing: 'cubicBezier(0.22, 1, 0.36, 1)'
        };

        switch (effect) {
          case 'fade-up':
            anime({ ...common, opacity: [0, 1], translateY: [24, 0] });
            break;
          case 'fade-in':
            anime({ ...common, opacity: [0, 1], translateY: [12, 0] });
            break;
          case 'scale-in':
            anime({ ...common, opacity: [0, 1], scale: [0.92, 1], translateY: [16, 0] });
            break;
          default:
            anime({ ...common, opacity: [0, 1], translateY: [18, 0] });
            break;
        }
      },
      runHeroIntro() {
        if (this.prefersReducedMotion || typeof anime === 'undefined') return;
        const heroScope = document.querySelector('.hero__content');
        if (!heroScope) return;
        const elements = heroScope.querySelectorAll('[data-hero-stagger]');
        anime({
          targets: elements,
          opacity: [0, 1],
          translateY: [28, 0],
          delay: anime.stagger(120),
          duration: 900,
          easing: 'cubicBezier(0.22, 1, 0.36, 1)'
        });
      },
      animateCounters(section) {
        if (this.prefersReducedMotion || typeof anime === 'undefined') return;
        const counters = section.querySelectorAll('[data-counter]');
        counters.forEach((counter) => {
          const target = Number(counter.dataset.target || 0);
          const suffix = counter.dataset.suffix || '';
          anime({
            targets: counter,
            innerHTML: [0, target],
            round: 1,
            duration: 1600,
            easing: 'easeOutCubic',
            update: (anim) => {
              const value = Math.round(anim.animations[0].currentValue);
              counter.innerHTML = `${value}${suffix}`;
            }
          });
        });
      }
    }
  });

  app.mount('#app');
})();
