/* ============================================================
   script.js – Fonctionnalités complètes MPI GROUPE BUSINESS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {

    // ========== 1. ANIMATION AU SCROLL (Intersection Observer) ==========
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== 2. COMPTEURS ANIMÉS (Section Statistiques) ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
            countersAnimated = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 1800;
                const step = Math.ceil(target / (duration / 16));
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(timer);
                    } else {
                        num.textContent = current;
                    }
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Vérification immédiate

    // ========== 3. LIGHTBOX (Galerie Réalisations) ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                const caption = this.querySelector('.gallery-overlay span')?.textContent || '';
                lightboxImage.src = src;
                lightboxImage.alt = caption;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            lightboxImage.src = '';
        }
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    // ========== 4. FORMULAIRE DE CONTACT -> WhatsApp ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let whatsappMessage = 'Bonjour MPI GROUPE BUSINESS CONSTRUCTION,%0A%0A';
            whatsappMessage += `Je suis ${nom}.%0A`;
            whatsappMessage += `Téléphone : ${telephone}%0A`;
            whatsappMessage += `Email : ${email}%0A%0A`;
            whatsappMessage += `Message :%0A${message}%0A%0A`;
            whatsappMessage += 'Merci de me recontacter.';

            const whatsappURL = `https://wa.me/221775953512?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        });
    }

    // ========== 5. BOUTIQUE : Produits et filtrage ==========
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        // Données produits avec images réelles
        const produits = [
            {
                nom: 'Bétonnière',
                categorie: 'location',
                prix: '25 000 FCFA/jour',
                description: 'Bétonnière professionnelle 350 litres, robuste et fiable.',
                image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Groupe électrogène',
                categorie: 'vente',
                prix: '450 000 FCFA',
                description: 'Groupe électrogène 15 kVA silencieux, démarrage électrique.',
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Pelle mécanique',
                categorie: 'location',
                prix: '150 000 FCFA/jour',
                description: 'Pelle mécanique 20 tonnes avec godet 1m³, opérateur inclus.',
                image: 'https://images.unsplash.com/photo-1530128118202-5e2e0a3b8b8e?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Compacteur',
                categorie: 'location',
                prix: '40 000 FCFA/jour',
                description: 'Compacteur vibrant monocylindre pour compactage de sols.',
                image: 'https://images.unsplash.com/photo-1596496181871-9681e3b8e2b7?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Marteau piqueur',
                categorie: 'vente',
                prix: '180 000 FCFA',
                description: 'Marteau piqueur électrique 1700W, perforateur puissant.',
                image: 'https://images.unsplash.com/photo-1578328819058-b69f7a1ef0b2?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Échafaudage',
                categorie: 'location',
                prix: '15 000 FCFA/jour',
                description: 'Échafaudage modulaire de façade, hauteur réglable.',
                image: 'https://images.unsplash.com/photo-1615529182904-14819c35db46?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Camion benne',
                categorie: 'location',
                prix: '120 000 FCFA/jour',
                description: 'Camion benne 10 roues, capacité 15m³, avec chauffeur.',
                image: 'https://images.unsplash.com/photo-1601584115196-04ecc0da3e1d?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Niveleuse',
                categorie: 'location',
                prix: '200 000 FCFA/jour',
                description: 'Niveleuse motorisée pour nivellement de précision.',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Grue',
                categorie: 'location',
                prix: '350 000 FCFA/jour',
                description: 'Grue mobile télescopique 50 tonnes, portée 40 mètres.',
                image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=250&fit=crop&auto=format'
            },
            {
                nom: 'Chargeuse',
                categorie: 'vente',
                prix: '8 500 000 FCFA',
                description: 'Chargeuse sur pneus compacte, godet 2m³, moteur diesel.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82b?w=400&h=250&fit=crop&auto=format'
            }
        ];

        function afficherProduits(filtre) {
            productsGrid.innerHTML = '';
            const produitsFiltres = filtre === 'tous' ? produits : produits.filter(p => p.categorie === filtre);

            produitsFiltres.forEach(produit => {
                const col = document.createElement('div');
                col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
                const categorieClass = produit.categorie === 'vente' ? 'vente' : 'location';
                const categorieTexte = produit.categorie === 'vente' ? 'Vente' : 'Location';
                const messageWhatsApp = encodeURIComponent(
                    `Bonjour MPI GROUPE BUSINESS CONSTRUCTION, je souhaite obtenir des informations sur : ${produit.nom}.`
                );

                col.innerHTML = `
                    <div class="product-card">
                        <div class="product-img" style="background-image: url('${produit.image}');"></div>
                        <div class="product-body">
                            <span class="product-category ${categorieClass}">${categorieTexte}</span>
                            <h3 class="product-title">${produit.nom}</h3>
                            <div class="product-price">${produit.prix}</div>
                            <p class="product-description">${produit.description}</p>
                            <a href="https://wa.me/221775953512?text=${messageWhatsApp}"
                               class="btn-whatsapp-product" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-whatsapp me-1"></i> Commander via WhatsApp
                            </a>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(col);
            });
        }

        afficherProduits('tous');

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filtre = this.getAttribute('data-filter');
                afficherProduits(filtre);
            });
        });
    }

    // ========== 6. NAVBAR OMBRAGE DYNAMIQUE ==========
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                navbar.style.boxShadow = '0 8px 40px rgba(0,0,0,0.25)';
            } else {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
            }
        });
    }

    // ========== 7. FERMETURE MENU MOBILE AU CLIC ==========
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show') && bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    console.log('✅ MPI GROUPE BUSINESS CONSTRUCTION – Site prêt.');
    console.log('📞 WhatsApp : +221 77 595 35 12');
});

/* ============================================================
   script.js – Fonctionnalités complètes MPI GROUPE BUSINESS
   (Ajout : recherche boutique + slider Hero automatique)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {

    // ========== 1. ANIMATION AU SCROLL (Intersection Observer) ==========
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== 2. COMPTEURS ANIMÉS (Section Statistiques) ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
            countersAnimated = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 1800;
                const step = Math.ceil(target / (duration / 16));
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(timer);
                    } else {
                        num.textContent = current;
                    }
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ========== 3. LIGHTBOX (Galerie Réalisations) ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                const caption = this.querySelector('.gallery-overlay span')?.textContent || '';
                lightboxImage.src = src;
                lightboxImage.alt = caption;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            lightboxImage.src = '';
        }
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    // ========== 4. FORMULAIRE DE CONTACT -> WhatsApp ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let whatsappMessage = 'Bonjour MPI GROUPE BUSINESS CONSTRUCTION,%0A%0A';
            whatsappMessage += `Je suis ${nom}.%0A`;
            whatsappMessage += `Téléphone : ${telephone}%0A`;
            whatsappMessage += `Email : ${email}%0A%0A`;
            whatsappMessage += `Message :%0A${message}%0A%0A`;
            whatsappMessage += 'Merci de me recontacter.';

            const whatsappURL = `https://wa.me/221775953512?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        });
    }

    // ========== 5. BOUTIQUE : Produits, recherche et filtrage combiné ==========
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const noResultMessage = document.getElementById('noResultMessage');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (productsGrid) {
        // Liste enrichie des produits
        const produits = [
            { nom: 'Bétonnière 350L', categorie: 'location', prix: '25 000 FCFA/jour', description: 'Bétonnière professionnelle robuste.', image: 'assets/images/12.webp' },
            { nom: 'Groupe électrogène 15 kVA', categorie: 'vente', prix: '450 000 FCFA', description: 'Silencieux, démarrage électrique.', image: 'assets/images/13.webp' },
            { nom: 'Pelle mécanique 20T', categorie: 'location', prix: '150 000 FCFA/jour', description: 'Avec godet 1m³ et opérateur.', image: 'assets/images/14.webp' },
            { nom: 'Compacteur vibrant', categorie: 'location', prix: '40 000 FCFA/jour', description: 'Compactage de sols efficace.', image: 'assets/images/15.webp' },
            { nom: 'Marteau piqueur 1700W', categorie: 'vente', prix: '180 000 FCFA', description: 'Perforateur puissant.', image: 'assets/images/16.webp' },
            { nom: 'Échafaudage modulaire', categorie: 'location', prix: '15 000 FCFA/jour', description: 'Hauteur réglable, sécurité.', image: 'assets/images/17.webp' },
            { nom: 'Camion benne 10 roues', categorie: 'location', prix: '120 000 FCFA/jour', description: 'Capacité 15m³ avec chauffeur.', image: 'assets/images/18.webp' },
            { nom: 'Niveleuse motorisée', categorie: 'location', prix: '200 000 FCFA/jour', description: 'Nivellement de précision.', image: 'assets/images/19.webp' },
            { nom: 'Grue mobile 50T', categorie: 'location', prix: '350 000 FCFA/jour', description: 'Portée 40 mètres.', image: 'assets/images/20.webp' },
            { nom: 'Chargeuse compacte', categorie: 'vente', prix: '8 500 000 FCFA', description: 'Godet 2m³, moteur diesel.', image: 'assets/images/21.webp' },
            { nom: 'Scie à béton', categorie: 'vente', prix: '95 000 FCFA', description: 'Découpe précise, lame diamant.', image: 'assets/images/22.webp' },
            { nom: 'Compresseur d\'air', categorie: 'location', prix: '35 000 FCFA/jour', description: 'Compresseur 200 litres, puissance 3CV.', image: 'assets/images/23.webp' },
            { nom: 'Terrain à vendre', categorie: 'vente', prix: '3 500 000 FCFA', description: 'superficie : 300 mettre carré, situé à Dougar près de la route nationnal, eau, wifi et éléctricité accessible.', image: 'assets/images/TAV.webp' },
            { nom: 'Appartement à louer', categorie: 'location', prix: '100 000 FCFA/mois', description: 'Appartement 3 chambres, sallon et cuisines, Diamniadio cité fonctionnaires.', image: 'assets/images/AP AL.webp' },
            { nom: 'Appartement Meubler', categorie: 'location', prix: '35 000 FCFA/jour', description: 'Appartement meublé, Diamniadio cité fonctionnaires.', image: 'assets/images/AP Meuble.webp' },
            { nom: 'Chambre à louer', categorie: 'location', prix: '45 000 FCFA/mois', description: 'Chambre plus salle de bain à louer.', image: 'assets/images/C AL.webp' }
        ];

        let filtreActif = 'tous'; // catégorie sélectionnée

        // Fonction d'affichage avec prise en compte de la recherche et du filtre
        function afficherProduits() {
            const recherche = searchInput ? searchInput.value.toLowerCase().trim() : '';
            let produitsFiltres = produits;

            // Appliquer le filtre de catégorie
            if (filtreActif !== 'tous') {
                produitsFiltres = produitsFiltres.filter(p => p.categorie === filtreActif);
            }

            // Appliquer la recherche
            if (recherche !== '') {
                produitsFiltres = produitsFiltres.filter(p =>
                    p.nom.toLowerCase().includes(recherche) ||
                    p.description.toLowerCase().includes(recherche)
                );
            }

            // Vider la grille
            productsGrid.innerHTML = '';

            if (produitsFiltres.length === 0) {
                noResultMessage.style.display = 'block';
            } else {
                noResultMessage.style.display = 'none';
                produitsFiltres.forEach(produit => {
                    const col = document.createElement('div');
                    col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
                    const categorieClass = produit.categorie === 'vente' ? 'vente' : 'location';
                    const categorieTexte = produit.categorie === 'vente' ? 'Vente' : 'Location';
                    const messageWhatsApp = encodeURIComponent(
                        `Bonjour MPI GROUPE BUSINESS CONSTRUCTION, je souhaite obtenir des informations sur : ${produit.nom}.`
                    );

                    col.innerHTML = `
                        <div class="product-card">
                            <div class="product-img" style="background-image: url('${produit.image}');"></div>
                            <div class="product-body">
                                <span class="product-category ${categorieClass}">${categorieTexte}</span>
                                <h3 class="product-title">${produit.nom}</h3>
                                <div class="product-price">${produit.prix}</div>
                                <p class="product-description">${produit.description}</p>
                                <a href="https://wa.me/221775953512?text=${messageWhatsApp}"
                                   class="btn-whatsapp-product" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-whatsapp me-1"></i> Commander via WhatsApp
                                </a>
                            </div>
                        </div>
                    `;
                    productsGrid.appendChild(col);
                });
            }
        }

        // Écouteur de la barre de recherche
        if (searchInput) {
            searchInput.addEventListener('input', afficherProduits);
        }

        // Gestion des boutons de filtre
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filtreActif = this.getAttribute('data-filter');
                afficherProduits();
            });
        });

        // Affichage initial
        afficherProduits();
    }

    // ========== 6. NAVBAR OMBRAGE DYNAMIQUE ==========
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                navbar.style.boxShadow = '0 8px 40px rgba(0,0,0,0.25)';
            } else {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
            }
        });
    }

    // ========== 7. FERMETURE MENU MOBILE AU CLIC ==========
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show') && bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    // ========== 8. AJUSTEMENT DU CAROUSEL HERO (optionnel) ==========
    // Le carousel Bootstrap est déjà fonctionnel, mais on peut ralentir le défilement
    const boutiqueCarousel = document.getElementById('boutiqueCarousel');
    if (boutiqueCarousel) {
        const carousel = new bootstrap.Carousel(boutiqueCarousel, {
            interval: 5000, // 5 secondes entre chaque slide
            ride: 'carousel'
        });
    }

    console.log('✅ MPI GROUPE BUSINESS CONSTRUCTION – Site prêt.');
    console.log('📞 WhatsApp : +221 77 595 35 12');
});