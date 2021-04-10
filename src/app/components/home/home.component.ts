import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

nuevasCanciones: any[] = [];
loading: boolean;
error: boolean;
errorMessage: string;
token: string;

 constructor( private spotify: SpotifyService ){

  this.loading = true;
  this.error = false;


  this.spotify.getNewReleases()
      .subscribe( (resp:any) => {
        console.log( resp );
        this.nuevasCanciones = resp;
        this.loading = false;
      }, ( err )=> {
        this.loading = false;
        this.error = true;
        this.errorMessage = err.error.error.message;
      });



 }


}



//paises: any[] = [];

//constructor( private http: HttpClient ) {
//  console.log('Contructor del Home Listo');
//  this.http.get('https://restcountries.eu/rest/v2/lang/es')
//  .subscribe( (resp:any) =>{
//    this.paises = resp;
//    console.log( resp );
//  })
//}
