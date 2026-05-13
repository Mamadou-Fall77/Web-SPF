    // ============================================================
    // CURSEUR PERSONNALISÉ
    // ============================================================

    const curseur = document.getElementById('curseur');
    // document.getElementById() : Sélectionne l'élément HTML avec l'id "curseur"
    // On stocke la référence dans une constante pour l'utiliser facilement.

    document.addEventListener('mousemove', (e) => {
      /*
        addEventListener('mousemove', callback) :
        Écoute l'événement "déplacement de souris" sur toute la page.
        Chaque fois que la souris bouge, la fonction fléchée (e) => { ... } s'exécute.
        "e" est l'objet événement qui contient les coordonnées de la souris.
      */
      curseur.style.left = e.clientX + 'px';
      // e.clientX : Position X (horizontal) de la souris en pixels
      curseur.style.top  = e.clientY + 'px';
      // e.clientY : Position Y (vertical) de la souris en pixels
    });

    // Agrandir le curseur au survol des liens et boutons
    document.querySelectorAll('a, button, .filtre-btn, .btn-voir').forEach(el => {
      /*
        querySelectorAll() : Sélectionne TOUS les éléments correspondant au sélecteur CSS.
        Retourne une NodeList (liste d'éléments).
        .forEach() : Parcourt chaque élément de la liste.
      */
      el.addEventListener('mouseenter', () => curseur.classList.add('actif'));
      // mouseenter : Souris entre dans l'élément → ajoute la classe "actif"
      el.addEventListener('mouseleave', () => curseur.classList.remove('actif'));
      // mouseleave : Souris quitte l'élément → retire la classe "actif"
    });

    // ============================================================
    // NAVBAR : CHANGEMENT DE STYLE AU DÉFILEMENT
    // ============================================================

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      /*
        window.addEventListener('scroll', ...) :
        Écoute l'événement "défilement" sur la fenêtre entière.
        Chaque fois que l'utilisateur défile, la fonction s'exécute.
      */
      
      if (window.scrollY > 80) {
        // window.scrollY : Position du défilement vertical en pixels depuis le haut.
        // Si on a défilé de plus de 80px, on applique la classe "scrolled".
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Afficher/Masquer le bouton "retour en haut"
      const btnHaut = document.getElementById('btn-haut');
      if (window.scrollY > 400) {
        btnHaut.classList.add('visible');
      } else {
        btnHaut.classList.remove('visible');
      }
    });

    // ============================================================
    // MENU MOBILE (HAMBURGER)
    // ============================================================

    function basculerMenu() {
      /*
        function : Définit une fonction JavaScript réutilisable.
        "basculerMenu" est son nom.
        Elle est appelée par le onclick du bouton hamburger.
      */
      const navLiens = document.getElementById('navLiens');
      navLiens.classList.toggle('ouverte');
      // toggle() : Ajoute la classe si absente, la retire si présente. Pratique pour les bascules !
    }

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-liens a').forEach(lien => {
      lien.addEventListener('click', () => {
        document.getElementById('navLiens').classList.remove('ouverte');
      });
    });

    // ============================================================
    // FILTRES DU CATALOGUE
    // ============================================================

    function filtrer(categorie) {
      /*
        Paramètre "categorie" : La valeur du filtre cliqué (ex: 'suv', 'sport').
      */
      
      // 1. Mettre à jour l'apparence des boutons de filtre
      document.querySelectorAll('.filtre-btn').forEach(btn => {
        btn.classList.remove('actif');
        // Retire "actif" de tous les boutons
      });
      event.target.classList.add('actif');
      // Ajoute "actif" uniquement au bouton cliqué
      // event.target : L'élément sur lequel l'événement s'est produit

      // 2. Afficher/Masquer les cartes selon la catégorie
      document.querySelectorAll('.carte-voiture').forEach(carte => {
        if (categorie === 'tous') {
          // Si "tous" : afficher toutes les cartes
          carte.classList.remove('masquee');
        } else if (carte.dataset.categorie !== categorie) {
          /*
            carte.dataset.categorie : Accède à l'attribut data-categorie de l'élément HTML.
            Si la catégorie de la carte ≠ filtre choisi → masquer
          */
          carte.classList.add('masquee');
        } else {
          carte.classList.remove('masquee');
        }
      });
    }

    // ============================================================
    // SLIDER DE TÉMOIGNAGES
    // ============================================================

    let slideActuel = 0; // Index du témoignage affiché (0 = premier)
    const slider = document.getElementById('slider');
    const temoignages = slider.children;
    // .children : Tous les éléments enfants directs du slider (nos témoignages)
    const total = temoignages.length; // Nombre total de témoignages

    // Créer les points indicateurs dynamiquement
    const sliderPoints = document.getElementById('sliderPoints');
    for (let i = 0; i < total; i++) {
      /*
        for : Boucle qui répète le code entre {} "total" fois.
        i = 0 : Point de départ
        i < total : Condition de continuation
        i++ : Incrémentation (i augmente de 1 à chaque tour)
      */
      const point = document.createElement('div');
      // createElement() : Crée un nouvel élément HTML (ici un <div>)
      point.classList.add('point');
      if (i === 0) point.classList.add('actif'); // Premier point actif par défaut
      point.onclick = () => allerSlide(i); // Clic sur le point → naviguer à ce slide
      sliderPoints.appendChild(point);
      // appendChild() : Ajoute l'élément créé comme enfant de sliderPoints
    }

    function allerSlide(index) {
      // Désactiver le point actuel
      sliderPoints.children[slideActuel].classList.remove('actif');
      
      // Mettre à jour l'index
      slideActuel = index;
      
      // Déplacer le slider
      slider.style.transform = `translateX(-${slideActuel * 100}%)`;
      /*
        Template literal (backticks) : Permet d'insérer des variables dans une chaîne.
        `${variable}` → remplacé par la valeur de la variable.
        translateX(-100%) → déplace de 100% à gauche (montre le 2ème slide).
        translateX(-200%) → déplace de 200% → 3ème slide, etc.
      */
      
      // Activer le nouveau point
      sliderPoints.children[slideActuel].classList.add('actif');
    }

    function changerSlide(direction) {
      // direction = -1 (précédent) ou +1 (suivant)
      let nouvelIndex = slideActuel + direction;
      
      // Bouclage circulaire : après le dernier → retour au premier, et vice-versa
      if (nouvelIndex < 0) nouvelIndex = total - 1;
      if (nouvelIndex >= total) nouvelIndex = 0;
      
      allerSlide(nouvelIndex);
    }

    // Défilement automatique toutes les 5 secondes
    setInterval(() => {
      changerSlide(1);
    }, 5000);
    /*
      setInterval(fonction, délai) :
      Exécute la fonction répétitivement avec un délai en millisecondes.
      5000ms = 5 secondes.
    */

    // ============================================================
    // ANIMATION DES COMPTEURS (STATISTIQUES)
    // ============================================================

    function animerCompteur(element) {
      const cible = parseInt(element.dataset.cible);
      // parseInt() : Convertit le texte "250" en nombre entier 250
      // element.dataset.cible : Lit l'attribut data-cible de l'élément
      
      const duree = 2000; // 2000ms = 2 secondes pour l'animation
      const increment = cible / (duree / 16);
      // 16ms ≈ 60 images par seconde. On calcule combien ajouter à chaque image.
      
      let valeurActuelle = 0;

      const timer = setInterval(() => {
        valeurActuelle += increment;
        element.textContent = Math.floor(valeurActuelle);
        // Math.floor() : Arrondi vers le bas (ex: 49.8 → 49)
        // textContent : Modifie le texte affiché dans l'élément
        
        if (valeurActuelle >= cible) {
          element.textContent = cible; // Valeur finale exacte
          clearInterval(timer); // Arrête l'intervalle
        }
      }, 16);
    }

    // Déclencher l'animation quand la section est visible (Intersection Observer)
    const observateur = new IntersectionObserver((entries) => {
      /*
        IntersectionObserver : API moderne qui détecte quand un élément
        entre ou sort du champ de vision de l'utilisateur.
        C'est plus performant que d'écouter l'événement "scroll".
      */
      entries.forEach(entry => {
        // entry.isIntersecting : true si l'élément est visible à l'écran
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-nombre').forEach(el => {
            animerCompteur(el); // Lance l'animation du compteur
          });
          observateur.disconnect(); // Déconnecte après la première fois (animation unique)
        }
      });
    }, { threshold: 0.5 });
    // threshold: 0.5 → Déclenche quand 50% de l'élément est visible

    observateur.observe(document.getElementById('stats'));
    // .observe() : L'observateur surveille cet élément spécifique

    // ============================================================
    // ANIMATIONS D'APPARITION AU DÉFILEMENT (REVEAL ON SCROLL)
    // ============================================================

    const observateurReveal = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Ramène l'élément à sa position normale avec opacité pleine
        }
      });
    }, { threshold: 0.1 }); // Déclenche dès que 10% est visible

    // Préparer les éléments à animer
    document.querySelectorAll('.carte-voiture, .carte-service, .stat-item').forEach(el => {
      el.style.opacity = '0';              // Invisible au départ
      el.style.transform = 'translateY(30px)'; // Décalé vers le bas
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Animation
      observateurReveal.observe(el);       // Surveiller chaque élément
    });

    // ============================================================
    // FORMULAIRE DE CONTACT
    // ============================================================

    function envoyerFormulaire(e) {
      e.preventDefault();
      // preventDefault() : Empêche le rechargement de page par défaut du formulaire
      
      // Récupérer les valeurs des champs
      const prenom  = document.getElementById('prenom').value;
      const nom     = document.getElementById('nom').value;
      const email   = document.getElementById('email').value;
      // .value : Récupère le texte saisi dans un champ de formulaire
      
      // Validation basique
      if (!prenom || !nom || !email) {
        // ! (opérateur de négation) : true si la valeur est vide/falsy
        afficherNotification('⚠️ Veuillez remplir tous les champs obligatoires.');
        return; // Arrête l'exécution de la fonction
      }

      // Simulation d'envoi réussi
      afficherNotification(`✅ Merci ${prenom} ! Nous vous contacterons très bientôt.`);
      
      // Réinitialiser le formulaire
      e.target.reset();
      // .reset() : Vide tous les champs du formulaire
    }

    // ============================================================
    // NOTIFICATION (TOAST)
    // ============================================================

    function afficherNotification(message) {
      const notif = document.getElementById('notification');
      notif.textContent = message; // Définit le texte de la notification
      notif.classList.add('affichee'); // Fait apparaître la notification
      
      setTimeout(() => {
        notif.classList.remove('affichee'); // Fait disparaître après 4 secondes
      }, 4000);
      /*
        setTimeout(fonction, délai) :
        Exécute la fonction UNE SEULE FOIS après le délai en millisecondes.
        Différent de setInterval qui se répète.
      */
    }

    // ============================================================
    // BOUTON "DÉTAILS" DES VOITURES
    // ============================================================

    function afficherDetail(modele) {
      afficherNotification(`🚗 Fiche détaillée de la ${modele} en cours de chargement...`);
    }

    // ============================================================
    // FERMETURE DU MENU MOBILE AU CLIC EN DEHORS
    // ============================================================

    document.addEventListener('click', (e) => {
      const navLiens = document.getElementById('navLiens');
      const menuBtn  = document.getElementById('menuBtn');
      
      // Si on clique en dehors du menu ET en dehors du bouton hamburger
      if (!navLiens.contains(e.target) && !menuBtn.contains(e.target)) {
        navLiens.classList.remove('ouverte');
        // .contains() : Vérifie si l'élément cliqué est un enfant de navLiens
      }
    });
