import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  zipCode: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.loadMap();
    this.getWeatherOfCurrentLocation($http);
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var marker = new google.maps.Marker({
        position: latLng,
      });

      marker.setMap(this.map);

    }, (err) => {
      console.log(err);
    });

  }

  getWeatherOfCurrentLocation($http) {

    var onSuccess = function(position) {
      let server = "http://api.openweathermap.org/data/2.5/weather?";
      let key = "&APPID=0e112a238c8c4d78f0170d16ff372178";
      // console.log(server + "lat=" + position.coords.latitude + "&" + "lon=" + position.coords.longitude + key + "&format=json");
      $http.getResponseURL(server + "lat=" + position.coords.latitude + "&" + "lon=" + position.coords.longitude + key + "&format=json")
    };

    function onError(error) {
      alert("Sorry, unable to get weather");
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

}
