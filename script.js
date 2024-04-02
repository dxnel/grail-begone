
/* Fonction pour générer une couleur aléatoire */
function couleurAleatoire() {
    var couleursPredefinies = [
        '#FF5733', '#FFC300', '#36DBCA', '#A569BD', '#3498DB', '#F39C12', '#27AE60', '#E74C3C',
        '#FF7675', '#FDA7DF', '#74B9FF', '#55E6C1', '#FFEAA7', '#FF6B81', '#54a0ff', '#C4E538',
        '#00b894', '#6c5ce7', '#0984e3', '#6D214F', '#EB4D4B', '#6F1E51', '#B33771', '#D980FA',
        '#5B2C6F', '#341f97', '#0A3D62', '#00A8FF', '#185ADB', '#3B3B98', '#6D214F',
        '#FF4D00', '#FFA400', '#5CCD9F', '#82589F', '#1287A8', '#D8B26D', '#229954', '#C70039',
        '#FF6E6E', '#FFB3BA', '#8ED1FC', '#64C2C2', '#FFD56D', '#FFA07A', '#6F1E51', '#1E8449',
        '#006266', '#5758BB', '#6F1E51', '#9A031E', '#8B78E6', '#2C3A47', '#8B78E6', '#341f97',
        '#006266', '#F79F1F', '#FFC312', '#D2FA5A', '#D63031', '#12CBC4', '#FDA7DF', '#ED4C67'
    ];
    
    var couleur = couleursPredefinies[Math.floor(Math.random() * couleursPredefinies.length)];
    return couleur;
}

// Initialisation de l'objet pour stocker les couleurs des artistes
var couleursArtistes = {};

$(document).ready(function() {
    // Chargement des morceaux depuis le fichier JSON
    $.getJSON('tracks.json', function(data) {
        var tracks = data; // Stocke les morceaux dans une variable locale


        // Fonction pour peupler la liste déroulante des artistes avec Select2
        function peuplerArtistes() {
            var artistes = [];
            tracks.forEach(function(track) {
                if (!artistes.includes(track.artist)) {
                    artistes.push(track.artist);
                    couleursArtistes[track.artist] = couleurAleatoire(); // Attribution de couleur aléatoire à chaque artiste
                }
            });
            artistes.sort();
            artistes.forEach(function(artiste) {
                $('#artistSelect').append(`<option value="${artiste}">${artiste}</option>`);
            });

            // Initialise Select2 sur l'élément de sélection des artistes
                        // Initialisation de Select2 avec options
$('#artistSelect').select2({
    placeholder: 'Select one or more artists',
    allowClear: true,
  });

  
  $('#artistSelect').on('change', function() {
    var $select2 = $(this).siblings('.select2');
    var selectedTags = $(this).val() ? $(this).val().length : 0;
    var width = $select2.find('.select2-selection__rendered').width();
    var maxWidth = $select2.width(); // Ajuster cette valeur en fonction de la taille de votre boîte de sélection
    if (width > maxWidth) {
      var originalText = $select2.find('.select2-selection__rendered').text();
      $select2.find('.select2-selection__rendered').text('‎ ‎' + selectedTags + ' artists displayed');
      $select2.find('.select2-selection__rendered').attr('title', originalText);
    } else {
      var originalText = $select2.find('.select2-selection__rendered').attr('title');
      $select2.find('.select2-selection__rendered').text(originalText);
      $select2.find('.select2-selection__rendered').removeAttr('title');
    }
  });
        }

       // Fonction pour afficher les cartes
function afficherCartes(morceauxAffiches) {
    $('#morceaux-container').empty();
    morceauxAffiches.forEach(function(track) {
        var carte = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img class="card-img-top" src="${track.cover}" alt="Cover image">
                    <div class="card-body">
                        <h5 class="card-title">${track.track}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            <span class="badge badge-secondary" style="background-color: ${couleursArtistes[track.artist]}">${track.artist}</span>
                        </h6>
                        <p class="card-text">${track.album}</p>
                        <a href="${track.link}" class="btn btn-primary" target="_blank">Download</a>
                        <a href="${track.genius_link}" class="btn btn-secondary" target="_blank"><svg class="svg-genius" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="47.55 46.85 368.6 49.1"><title>Artboard 1</title><path d="M88.55,54.65l-.3-.3a14.4369,14.4369,0,0,0-10.3-4.3,14.2656,14.2656,0,0,0-10.3,4.3,21.0985,21.0985,0,0,0-1.9,2.3h0c0,.1-.1.1-.1.2a.43016.43016,0,0,0,.4.4h.2a16.1649,16.1649,0,0,1,5.4-1,15.77444,15.77444,0,0,1,10.9,4.4h0a.36736.36736,0,0,0,.3.1h5.5a.43016.43016,0,0,0,.4-.4v-5.4h0C88.65,54.85,88.65,54.75,88.55,54.65Z"/><path d="M88.25,71.95h-5.6a5.47586,5.47586,0,0,1-5.5-5.1h0a.43016.43016,0,0,0-.4-.4h0a5.48274,5.48274,0,0,0-3.2,1.4h0c-.1,0-.1.1-.2.1h0l-.1.1v.1l-.1.1-.1.1-.1.1-.1.1-.1.1a.09794.09794,0,0,1-.1.1l-.1.1a.09794.09794,0,0,1-.1.1l-.1.1a2828446.59321,2828446.59321,0,0,0-.2.2.09794.09794,0,0,1-.1.1,1990336210912.9705,1990336210912.9705,0,0,0-.2.2.09794.09794,0,0,1-.1.1v2h0v.1a5.52856,5.52856,0,0,0,5.5,5.4h4a.43016.43016,0,0,1,.4.4v1.5a.43016.43016,0,0,0,.4.4h.1a14.72847,14.72847,0,0,0,6.4-3.1h0c.1-.1.2-.2.2-.3h0v-3.6C88.65,72.15,88.45,71.95,88.25,71.95Z"/><path d="M87.95,88.45h-.1a25.45372,25.45372,0,0,1-34.6-23.7,25.08975,25.08975,0,0,1,1.7-9.2h0v-.2a.44638.44638,0,0,0-.4-.3c-.1,0-.3.1-.3.2h0a23.27822,23.27822,0,0,0-6.7,16.5,24.11289,24.11289,0,0,0,24.1,24.1,23.86719,23.86719,0,0,0,16.6-6.6h0c.1-.1.2-.2.2-.3A.47239.47239,0,0,0,87.95,88.45Z"/><path d="M139.15,76.65h13.3a4.96925,4.96925,0,0,0,5.3-5v-.5a.5357.5357,0,0,0-.5-.5h-18.1a.5357.5357,0,0,0-.5.5v5.1A.66441.66441,0,0,0,139.15,76.65Z"/><path d="M158.45,51.55h-19.3a.5357.5357,0,0,0-.5.5v5.1a.5357.5357,0,0,0,.5.5h14.4a4.96925,4.96925,0,0,0,5.3-5v-.7C158.95,51.75,158.75,51.55,158.45,51.55Z"/><path d="M158.45,89.85h-22.8c-3.7,0-5.9-2.1-5.9-5.9V47.65a.5357.5357,0,0,0-.5-.5h0c-4.2.1-6.6,2.7-6.6,6.9v34.9c0,4.3,2.6,6.9,6.9,6.9h24c3.2,0,5.4-2.1,5.4-5.1v-.5A.45753.45753,0,0,0,158.45,89.85Z"/><path d="M203.45,89.75h0a4.50743,4.50743,0,0,1-3.4-4.7V47.85a.51956.51956,0,0,0-.2-.4h-.1a3.40353,3.40353,0,0,0-1.4-.2c-3.3,0-5.5,2.3-5.5,5.8v37c0,3.5,2.2,5.8,5.5,5.8,3.2,0,5.4-2.2,5.4-5.6h0A.54991.54991,0,0,0,203.45,89.75Z"/><path d="M233.95,89.85h0c-.3,0-.7.1-.9.1-3.4.1-5.1-1.6-6.6-4.1l-16.7-27.9h0a.51954.51954,0,0,0-.4-.2.5357.5357,0,0,0-.5.5h0v15.5l10.6,17.5c1.4,2.4,3.3,4.6,7.5,4.6,3.9,0,6.5-1.9,7.4-5.4v-.2A.43013.43013,0,0,0,233.95,89.85Z"/><path d="M230.45,75.45a.5357.5357,0,0,0,.5-.5h0V47.85c0-.2-.1-.4-.3-.4h0a6.8819,6.8819,0,0,0-1.3-.2c-3.3,0-5.5,2.3-5.5,5.8v11.7l6.3,10.4A.31932.31932,0,0,0,230.45,75.45Z"/><path d="M279.15,89.75h0c-2.2-.5-3.4-2.2-3.4-4.7V47.85a.43015.43015,0,0,0-.4-.4h0a3.17792,3.17792,0,0,0-1.3-.2c-3.3,0-5.5,2.3-5.5,5.8v37c0,3.5,2.2,5.8,5.5,5.8,3.2,0,5.4-2.2,5.4-5.6v-.1C279.55,89.95,279.35,89.85,279.15,89.75Z"/><path d="M348.25,87.85c-.1,0-.2,0-.2.1l-.2.1a21.18022,21.18022,0,0,1-9.3,1.9c-6,0-10.7-1.8-14-5.2-3.4-3.6-5.2-8.9-5.2-15.8V47.55a.43017.43017,0,0,0-.4-.4h0a6.882,6.882,0,0,0-1.3-.2c-3.3,0-5.5,2.3-5.5,5.8v21.1c0,14,7.4,22.1,20.2,22.1,7,0,12.6-2.5,16-7.1l.1-.2h0a.36735.36735,0,0,0,.1-.3C348.75,88.05,348.55,87.85,348.25,87.85Z"/><path d="M348.55,47.05h0a6.882,6.882,0,0,0-1.3-.2c-3.3,0-5.5,2.3-5.5,5.8v21.4a16.06907,16.06907,0,0,1-1.2,6.7v.1h0v.2a.53571.53571,0,0,0,.5.5h.2c5.1-1,7.7-5.2,7.7-12.4V47.55h0A.70407.70407,0,0,0,348.55,47.05Z"/><path d="M395.95,75.75l5.1.9c5.5,1,6.1,3,6.1,4.5v.1h0a.53571.53571,0,0,0,.5.5h.1c4.1-.5,6.6-2.6,6.6-5.5,0-2.8-2.3-4.6-7-5.5l-5.1-.9c-11.9-2.2-14.4-8.6-14.4-13.6a12.04436,12.04436,0,0,1,2.1-7l.2-.2h0c0-.1.1-.1.1-.2a.53571.53571,0,0,0-.5-.5h-.2l-.2.1c-5.5,2.5-8.7,7.2-8.7,12.8C380.75,68.75,386.15,73.95,395.95,75.75Z"/><path d="M415.55,87.75h-.1l-.2.1a24.59069,24.59069,0,0,1-10.1,2,26.53493,26.53493,0,0,1-16.2-5.4,4.48811,4.48811,0,0,1-2-3.6h0c0-.2-.1-.4-.3-.4h0a7.71926,7.71926,0,0,0-1.5-.2,5.03876,5.03876,0,0,0-4.1,2.2,5.91471,5.91471,0,0,0-1.2,4,5.48792,5.48792,0,0,0,2.4,3.8,27.18513,27.18513,0,0,0,16.8,5.6c7.6,0,13.8-2.6,16.9-7.2l.1-.2h0a.34914.34914,0,0,1,.1-.2A.63369.63369,0,0,0,415.55,87.75Z"/><path d="M396.85,55.65a.43017.43017,0,0,0,.4.4h.8a13.54439,13.54439,0,0,1,9.1,3.1,5.70243,5.70243,0,0,0,3.6,1.3h0a5.03876,5.03876,0,0,0,4.1-2.2,5.50324,5.50324,0,0,0,1.2-3.5h0c0-.2-.1-.4-.3-.4h0a7.57131,7.57131,0,0,1-1.8-.9,14.77429,14.77429,0,0,0-9.7-3.3c-4.4,0-7.5,2.1-7.4,5.1-.1.1,0,.3,0,.4Z"/></svg></a>
                    </div>
                    <div class="card-footer">
                        ${track.date}
                    </div>
                </div>
            </div>
        `;
        $('#morceaux-container').append(carte);
    });
}
         

        // Chargement initial : peupler la liste des artistes et afficher toutes les cartes
        peuplerArtistes();
        afficherCartes(tracks);

        // Fonction pour filtrer les morceaux en fonction de la recherche
        function filtrerMorceaux() {
            var recherche = $('#searchInput').val().trim().toLowerCase();
            var artisteSelectionne = $('#artistSelect').val();

            var morceauxFiltres = tracks.filter(function(track) {
                var correspondanceRecherche = track.artist.toLowerCase().includes(recherche) ||
                                             track.track.toLowerCase().includes(recherche) ||
                                             track.album.toLowerCase().includes(recherche) ||
                                             track.date.toLowerCase().includes(recherche);
                var correspondanceArtiste = true;
                if (artisteSelectionne !== null && artisteSelectionne.length > 0) {
                    correspondanceArtiste = artisteSelectionne.includes(track.artist);
                }
                return correspondanceRecherche && correspondanceArtiste;
            });

            // Affichage des cartes filtrées
            afficherCartes(morceauxFiltres);
        }

        $('#searchInput').on('input', filtrerMorceaux);
        $('#artistSelect').on('change', filtrerMorceaux);
    });
});

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}