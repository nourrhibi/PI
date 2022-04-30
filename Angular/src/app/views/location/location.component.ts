import { Component, OnInit } from '@angular/core';
import {MapsService} from '../../services/maps.service';
declare const L : any;
export interface response {
  latitude: string;
  longitude: string;
  
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {


lat : any;
long : any;

location : Object;
/*response : {
  latitude :"",
  longitude : ""
}*/

  constructor(private mapsService : MapsService) { }


  ngOnInit(): void {
    let id= localStorage.getItem('id');
    this.mapsService.getLocation(id)
      .subscribe((response) => {
      
  
        console.log("coord latitude  "+response.latitude+ "coords longitude" +response.logitude);
        this.lat=response.latitude;
       this.long = response.logitude

        navigator.geolocation.getCurrentPosition((position) => {
         // this.lat = position.coords.latitude 
          //this.long = position.coords.longitude 
          console.log('lat'+position.coords.latitude +' long '+position.coords.longitude);
          let map = L.map('map').setView([this.lat, this.long], 20);
    
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhbGVubiIsImEiOiJjbDJkdG5rNncwMjlvM2N0Y2Y3ZmV1ejE5In0.faylOrk3bRFM01n2dGIv0g', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(map);
    
        let marker = L.marker([this.lat, this.long]).addTo(map);
        marker.bindPopup('<b>Current location </b>').openPopup();
    
        });

      },

        (err) => {
       
        console.log("location error "+err);
      });


   
    
    
   
  }

}
