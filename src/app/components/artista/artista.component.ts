import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';



@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  artista: any = {};
  loadingArtist: boolean;
  topTracks: any[] = [];

  constructor( private router: ActivatedRoute,
               private spotify: SpotifyService ) {

    this.loadingArtist = true;
    this.router.params.subscribe( params => {

      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );
      //

    })

  }

  getArtista( id:string ){
    this.loadingArtist = true;
    this.spotify.getArtista( id )
        .subscribe( resp => {
          console.log( resp );
          this.artista = resp;
          this.loadingArtist = false;
        });

  }
  getTopTracks( id:string ){
    this.spotify.getTopTracks( id )
        .subscribe( resp => {
          console.log( resp );
          this.topTracks = resp;

        });

  }

}
