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
      ["kontakt@gmail.com"],   // Wysyłany na podany adres email, tablica
      null,                     // CC - Carbon Copy
      null,                     // BCC - Blind Carbon Copy
      false,                    // Zawartość HTML w treści
      null,                     // Załączniki, tablica
      null                      // Ścieżki do załączników, tablica
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

    console.log("Not initialize");
    google.maps.event.addDomListener(window, 'load', initialize());

    function initialize() {
      console.log("Initialize");
      var mapOptions = {
        center: {lat: 50.0468548, lng: 19.9348337},
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      $scope.map = map;

      navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: map,
              title: "Twoja lokalizacja"
          });
      });

      var marker = new google.maps.Marker({
        position: {lat: 50.0116149, lng: 19.9632955},
        map: map,
        title: 'Orteo.pl'
      });

      var marker1 = new google.maps.Marker({
        position: {lat: 50.0116877, lng: 19.9661474},
        map: map,
        title: 'Reha-Plus S.A.'
      });

      var marker2 = new google.maps.Marker({
        position: {lat: 50.0123767, lng: 20.0401849},
        map: map,
        title: 'Aplimedica s.c.'
      });

      var marker3 = new google.maps.Marker({
        position: {lat: 50.0247634, lng: 19.9649143},
        map: map,
        title: 'Fizjo-strefa'
      });

      var marker4 = new google.maps.Marker({
        position: {lat: 50.0576163, lng: 19.9146719},
        map: map,
        title: 'SPORTO.COM.PL'
      });

      var marker5 = new google.maps.Marker({
        position: {lat: 50.0473872, lng: 19.8896932},
        map: map,
        title: 'DoBiegania.pl'
      });

      var marker6 = new google.maps.Marker({
        position: {lat: 50.0622331, lng: 19.8705467},
        map: map,
        title: 'Splint'
      });

      var infoMarker = new google.maps.InfoWindow({
        content: '<div class="markerTitle">Orteo.pl</div>' +
        '<div class="markerOpis">Sklep ze sprzętem medycznym</div>' +
        '<div class="markerAdres">Wincentego Witosa 7, Kraków</div>'
      });

      var infoMarker1 = new google.maps.InfoWindow({
        content: '<div class="markerTitle">Reha Plus S.A.</div>' +
        '<div class="markerOpis">Centrum szkoleniowe</div>' +
        '<div class="markerAdres">Tuchowska 6b, Kraków</div>'
      });

      var infoMarker2 = new google.maps.InfoWindow({
        content: '<div class="markerTitle">Aplimedica s.c.</div>' +
        '<div class="markerOpis">Gabinet medycyny alternatywnej</div>' +
        '<div class="markerAdres">Drożdżowa 5, Kraków</div>'
      });

      var infoMarker3 = new google.maps.InfoWindow({
        content: '<div class="markerTitle">Fizjo-strefa</div>' +
        '<div class="markerOpis">Specjalista rehabilitacji</div>' +
        '<div class="markerAdres">Poprzeczna 3, Kraków</div>'
      });

      var infoMarker4 = new google.maps.InfoWindow({
        content: '<div class="markerTitle">SPORTO.COM.PL</div>' +
        '<div class="markerOpis">Sklep z odzieżą sportową</div>' +
        '<div class="markerAdres">Focha 32, Kraków</div>'
      });

      var infoMarker5 = new google.maps.InfoWindow({
        content: '<div class="markerTitle">Splint</div>' +
        '<div class="markerOpis">Artykuły ortopedyczne</div>' +
        '<div class="markerAdres">28 Lipca 1943 23A, Kraków</div>'
      });   

      var infoMarker6 = new google.maps.InfoWindow({
        content: '<div class="markerTitle">DoBiegania.pl</div>' +
        '<div class="markerOpis">Sklep z odzieżą sportową</div>' +
        '<div class="markerAdres">Ks. Józefa 54, Kraków</div>'
      });          

      marker.addListener('click', function() {
        infoMarker.open(map, marker)
      });

      marker1.addListener('click', function() {
        infoMarker1.open(map, marker1)
      });

      marker2.addListener('click', function() {
        infoMarker2.open(map, marker2)
      });

      marker3.addListener('click', function() {
        infoMarker3.open(map, marker3)
      });

      marker4.addListener('click', function() {
        infoMarker4.open(map, marker4)
      });

      marker5.addListener('click', function() {
        infoMarker5.open(map, marker5)
      });

      marker6.addListener('click', function() {
        infoMarker6.open(map, marker6)
      });

    }
})