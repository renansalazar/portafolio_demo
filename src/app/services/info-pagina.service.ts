import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false
  equipo: any[] = []

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }
  
  private cargarInfo(){
      this.http.get('assets/data/data-pagina.json')
        .subscribe( (rsp: InfoPagina) => {
          this.cargada = true;
          this.info = rsp;
        })
  }

  private cargarEquipo(){
      this.http.get('https://fir-aecc0.firebaseio.com/equipo.json')
        .subscribe( (rsp: any) => {
          this.equipo = rsp;
      })
  }

}
