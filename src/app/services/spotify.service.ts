import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {

    console.log('Spotify service ready');

  }
// getToken(){
//    let clientId = '5c87d5ea16124902894591ebb6019e7a';
//    let clientSecret = '0d9992e0936f4f71be1317e382ac7561';
//    let url = 'https://spotify-get-token.herokuapp.com/spotify';
//    //let token = this.http.get(`${ url }/${ clientId }/${ clientSecret}`);
//
//    let token = 'https://spotify-get-token.herokuapp.com/spotify/5c87d5ea16124902894591ebb6019e7a/0d9992e0936f4f71be1317e382ac7561'
//    console.log(token);
////
////    //https://spotify-get-token.herokuapp.com/spotify/5c87d5ea16124902894591ebb6019e7a/0d9992e0936f4f71be1317e382ac7561
//  }

  getQuery ( query: string ){

    const url = `https://api.spotify.com/v1/${query}`;
    let token: string;

    const prom1 = new Promise(( resolve, rejecto) =>{
      this.getToken()
      .subscribe( (resp:any) =>{

        let token = resp;
        resolve(console.log(resp));
      });

    });

    const headers = new HttpHeaders({
      //'Authorization': `Bearer ${ token }`
      'Authorization': 'Bearer BQDZqLwaiMBBRQUR_75K-iOazjWI3kq7NbTw3Rn6VDUwEGqt7T9rY-ZjS-tVOglBGL2rLKMWWnnyzwWvD3M' //`Bearer ${ token }`//
    });

    prom1.then(  mensaje => {

      console.log( 'mensaje' );
    });


    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
              .pipe( map( resp => resp['albums'].items));

  }

  getArtistas( termino:string ) {

    return this.getQuery(`search?q=${ termino }&type=artist`)
              .pipe( map( resp => resp['artists'].items));

  }

  getArtista( id:string ){

    return this.getQuery(`artists/${ id }`);
               // .pipe( map( resp => resp['artist'].items))

  }

  getTopTracks( id:string ){

    return this.getQuery(`artists/${ id }/top-tracks?market=ar`)
                .pipe( map( resp => resp['tracks']))

  }
  getToken(){
    return this.http.get('https://spotify-get-token.herokuapp.com/spotify/5c87d5ea16124902894591ebb6019e7a/0d9992e0936f4f71be1317e382ac7561')
                .pipe( map( resp => resp['access_token']));
  }
}



