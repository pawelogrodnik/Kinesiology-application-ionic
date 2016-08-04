// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//Konfiguracja aplikacji
.config(function($ionicConfigProvider) {
  //zmiana wyświetlania 'tabów' z top na bottom
    $ionicConfigProvider.tabs.position('bottom');
    //zmiana tekstu powrótu do poprzedniego widoku
    $ionicConfigProvider.backButton.text('Powrót');
    //wyłącznie wyświetlania nazwy poprzedniego widoku
    $ionicConfigProvider.backButton.previousTitleText(false);
})
//Routowanie wewnątrz aplikacji
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home',{
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.kontakt',{
      url: '/kontakt',
      views: {
        'kontakt-tab' : {
          templateUrl: 'templates/kontakt.html',
          controller: 'MailComposer'
        }
      }
    })

    .state('tabs.list',{
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/lista.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.encyklopedia',{
      url: '/encyklopedia',
      views: {
        'encyklopedia-tab' : {
          templateUrl: 'templates/encyklopedia.html',
          controller: 'EncyklopediaController'
        }
      }
    })

    .state('tabs.mapa',{
      url: '/mapa',
      views: {
        'map-tab' : {
          templateUrl: 'templates/mapa.html',
          controller: 'MapController'
        }
      }
    })

    .state('tabs.detailen', {
      url: '/encyklopedia/:aId',
      views: {
        'encyklopedia-tab' : {
          templateUrl: 'templates/detailen.html',
          controller: 'EncyklopediaController'
        }
      }
    })


    $urlRouterProvider.otherwise('/tab/home');
    }
  )
//kontroler do zakładki instrukcje
.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state) {
  //wczytanie pliku .json
    $http.get('js/data-test.json').success(function(data) {
      //wyciagniecie potrzebnych danych z .jsona
      $scope.kinesio = data.kinesio;
      $scope.whichkinesio = $state.params.aId;
    })
}])
//kontroler do zakładki encyklopedia
.controller('EncyklopediaController', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data-test.json').success(function(data) {
    //wczytanie pliku .json
    $scope.encyklopedia = data.encyklopedia;
    //wyciagniecie potrzebnych danych z .jsona
    $scope.whichencyklop = $state.params.aId;
  })
}])

// kontroler do zakładki kontakt
// import $ionicPopup do kontrolera, potrzebnego do wyświetlenia alertu
.controller("MailComposer", function($scope, $ionicPopup) {
  //funkcja wysłania wiadomości poprzez klienta pocztowego
  $scope.sendEmail = function () {
    //sprawdzenie, czy projekt posiada zainstalowany plugin emailComposer
    if (window.plugins && window.plugins.emailComposer) {
      window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
        //komunikat w konsoli po wysłaniu wiadomości
        console.log("Wiadomość została wysłana");
      },
      "Wpisz temat wiadomości", // Temat wiadomości
      "",                       // Wiadomość
      ["kontakt@gmail.com"],    // Wysyłany na podany adres email, tablica
      null,                     // CC - Carbon Copy
      null,                     // BCC - Blind Carbon Copy
      false,                    // Zawartość HTML w treści
      null,                     // Załączniki, tablica
      null                      // Ścieżki do załącz ników, tablica
      );
    }
  }
  //funkcja alertu
   $scope.showAlert = function() {
  
      var alertPopup = $ionicPopup.alert({
         title: "Przypomnienie",
         template: "Po wciśnięciu przycisku \"Wyślij wiadomość\" zostanie uruchomiony wybrany przez Ciebie klient pocztowy"
      });

      alertPopup.then(function(res) {
        //Komunikat w konsoli po wyświetleniu alertu
        console.log("Alert został wyświetlony.");
      });
   };
})

.controller('MapController', function($scope, $ionicLoading) {

  google.maps.event.addDomListener(window, 'load', init());

  function init() {
    let mapOptions = {
      center: {lat: 50.0468548, lng: 19.9348337},
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.map = map;

    navigator.geolocation.getCurrentPosition(function(pos) {
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "Twoja lokalizacja"
      });
      myLocation.addListener('click', function() {
        let info = new google.maps.InfoWindow({content: '<div>Tu jestes!</div>'})
        info.open(map, myLocation);
      });
    });

    function coordsFrom(pos, title) {
      return {
        position: pos,
        map: map,
        title: title
      }
    }

    let coords = [
      coordsFrom({lat: 50.0116149, lng: 19.9632955}, 'Orteo.pl'),
      coordsFrom({lat: 50.0116877, lng: 19.9661474}, 'Reha-Plus S.A.'),
      coordsFrom({lat: 50.0123767, lng: 20.0401849}, 'Aplimedica s.c.'),
      coordsFrom({lat: 50.0247634, lng: 19.9649143}, 'Fizjo-strefa'),
      coordsFrom({lat: 50.0576163, lng: 19.9146719}, 'SPORTO.COM.PL'),
      coordsFrom({lat: 50.0473872, lng: 19.8896932}, 'DoBiegania.pl'),
      coordsFrom({lat: 50.0622331, lng: 19.8705467}, 'Splint')
    ];

    let markers = coords.map(function(coords) {
      return new google.maps.Marker(coords)
    })

     function formatDesc(title, description, address) {
      return { content: '<div class="markerTitle">'+title+'</div>' +
             '<div class="markerDescription">'+description+'</div>' +
             '<div class="markerAddress">'+address+'</div>' }
    }

    let descriptions = [
      formatDesc('Orteo.pl', 'Sklep ze sprzętem medycznym', 'Wincentego Witosa 7, Kraków'),
      formatDesc('Reha-Plus S.A.', 'Centrum szkoleniowe', 'Tuchowska 6b, Kraków'),
      formatDesc('Aplimedica s.c.','Gabinet medycyny alternatywnej', 'Drożdżowa 5, Kraków'),
      formatDesc('Fizjo-strefa', 'Specjalista rehabilitacji', 'Poprzeczna 3, Kraków'),
      formatDesc('SPORTO.COM.PL', 'Sklep z odzieżą sportową', 'Focha 32, Kraków'),
      formatDesc('DoBiegania.pl', 'Sklep z odzieżą sportową', 'Ks. Józefa 54, Kraków'),
      formatDesc('Splint', 'Artykuły ortopedyczne', '28 Lipca 1943 23A, Kraków')
    ];

    let markerInfo = descriptions.map(function(desc) {
      return new google.maps.InfoWindow(desc)
    });

    for (let i = 0; i < markers.length; i++) {
      markers[i].addListener('click', function() {
        markerInfo[i].open(map, markers[i])
      });
    }
  }
})