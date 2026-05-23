// ========================================
// GALLERY.JS - Gestion de la navigation
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Sélection des éléments
    const categoryItems = document.querySelectorAll('.category-item');
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    // ========================================
    // NAVIGATION ENTRE CATÉGORIES
    // ========================================
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Retirer la classe active de tous les items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Ajouter la classe active à l'item cliqué
            this.classList.add('active');
            
            // Masquer toutes les sections
            gallerySections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Afficher la section correspondante
            const targetSection = document.getElementById(category);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll smooth vers le haut de la section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // GESTION DES IMAGES - Erreur de chargement
    // ========================================
    
    const images = document.querySelectorAll('.card-img img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Si l'image ne charge pas, afficher un placeholder
            this.style.display = 'none';
            const parent = this.parentElement;
            
            // Créer un placeholder avec icône
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #1a1e25 0%, #2a2e35 100%);
                color: rgba(0, 239, 255, 0.5);
                font-size: 3rem;
            `;
            placeholder.innerHTML = '<i class="bx bx-image-alt"></i>';
            
            parent.appendChild(placeholder);
        });
    });
    
    // ========================================
    // GESTION DES VIDÉOS - Pause automatique
    // ========================================
    
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Pause la vidéo quand on change de section
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                video.pause();
                video.currentTime = 0;
            });
        });
        
        // Gestion des erreurs de chargement vidéo
        video.addEventListener('error', function() {
            console.warn('Erreur de chargement de la vidéo:', this.src);
            const parent = this.parentElement;
            
            // Créer un message d'erreur
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1a1e25;
                color: rgba(0, 239, 255, 0.7);
                font-size: 1rem;
                text-align: center;
                padding: 2rem;
            `;
            errorMsg.innerHTML = '<i class="bx bx-error" style="font-size: 2rem; margin-bottom: 0.5rem;"></i><br>Vidéo non disponible';
            
            this.style.display = 'none';
            parent.appendChild(errorMsg);
        });
    });
    
    // ========================================
    // ANIMATION AU SCROLL
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observer toutes les cartes
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // ========================================
    // GESTION DU HASH URL (optionnel)
    // ========================================
    
    // Si l'URL contient un hash (#graphisme, #website, etc.)
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetItem = document.querySelector(`[data-category="${hash}"]`);
        if (targetItem) {
            targetItem.click();
        }
    }
    
    // Mettre à jour l'URL quand on change de catégorie
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            window.location.hash = category;
        });
    });
    
    // ========================================
    // COMPTEUR DE PROJETS (affichage console)
    // ========================================
    
    function countProjects() {
        const graphismeCards = document.querySelectorAll('#graphisme .gallery-card').length;
        const websiteCards = document.querySelectorAll('#website .gallery-card').length;
        const communityCards = document.querySelectorAll('#community .gallery-card').length;
        const videoCards = document.querySelectorAll('#video .gallery-card').length;
        
        console.log('=== STATISTIQUES GALERIE ===');
        console.log(`Graphisme: ${graphismeCards} projets`);
        console.log(`Sites Web: ${websiteCards} projets`);
        console.log(`Community Management: ${communityCards} projets`);
        console.log(`Montage Vidéos: ${videoCards} projets`);
        console.log(`TOTAL: ${graphismeCards + websiteCards + communityCards + videoCards} projets`);
    }
    
    // Afficher les stats au chargement
    countProjects();
    
    // ========================================
    // LAZY LOADING AMÉLIORÉ (pour performances)
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Ajouter une classe pour l'animation de chargement
                    img.addEventListener('load', () => {
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.style.transition = 'opacity 0.5s ease';
                            img.style.opacity = '1';
                        }, 100);
                    });
                    
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // BOUTON RETOUR - Animation supplémentaire
    // ========================================
    
    const btnBack = document.querySelector('.btn-back');
    if (btnBack) {
        btnBack.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    }
    
    // ========================================
    // LOG DE DÉMARRAGE
    // ========================================
    
    console.log('%c✅ Gallery.js chargé avec succès!', 'color: #0ef; font-size: 14px; font-weight: bold;');
    console.log('%c🎨 Portfolio de Fulgence K. EDORH', 'color: #00d9ff; font-size: 12px;');
    
});

// ========================================
// FONCTION UTILITAIRE - Smooth Scroll
// ========================================

function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// DÉTECTION DE LA CATÉGORIE ACTIVE AU SCROLL
// (pour mettre à jour la navigation automatiquement)
// ========================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.gallery-section');
    const categoryItems = document.querySelectorAll('.category-item');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Mise à jour visuelle (optionnel, peut être désactivé)
    // categoryItems.forEach(item => {
    //     item.classList.remove('active');
    //     if (item.getAttribute('data-category') === current) {
    //         item.classList.add('active');
    //     }
    // });
});