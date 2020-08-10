'use strict';

(function() {

    var newPhotoButton = document.querySelector('#filter-new');
    var popularPhotoButton = document.querySelector('#filter-popular');
    var discussedPhotoButton = document.querySelector('#filter-discussed');
    var randomPhotoButton = document.querySelector('#filter-random');

    var photo = {
        onNewFilter: function (item) {
            return item;
        },
        onPopularFilter: function(item) {            
            return item;
        },
        onDiscussedFilter: function(item) {
            return item;
        },
        onRandomFilter: function(item) {
            return item;
        }
    };

    popularPhotoButton.addEventListener('click', () => {
        var filterPopular = 'popular';
        // popularPhotoButton.classList.add('img-filters__button--active');
        photo.onPopularFilter(filterPopular);
    });

    newPhotoButton.addEventListener('click', () => {
        var filterNew = 'new';
        photo.onNewFilter(filterNew);
    });

    discussedPhotoButton.addEventListener('click', () => {
        var filterDiscussed = 'discussed';
        photo.onDiscussedFilter(filterDiscussed);
    });

    randomPhotoButton.addEventListener('click', () => {
        var filterRandom = 'random';
        photo.onRandomFilter(filterRandom);
    });

    window.photo = photo;
})();