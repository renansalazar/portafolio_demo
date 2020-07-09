import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true
  productos: Producto[] = []
  productosFiltrados: Producto[] = []

  constructor(private http: HttpClient) {
    this.cargarProductos()
  }

  private cargarProductos(){
    return new Promise((resolve, reject)=>{
        this.http.get('https://fir-aecc0.firebaseio.com/productos_idx.json')
          .subscribe((rsp: Producto[])=>{
            this.productos = rsp;
            this.cargando=false;
            resolve();
          })
    })
  }

  getProducto(id: string){
    return this.http.get(`https://fir-aecc0.firebaseio.com/productos/${ id }.json`)
  }

  buscarProducto(termino: string){
    if(this.productos.length===0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino)
      })
    }else{
      this.filtrarProductos(termino)
    }
  }

  filtrarProductos(termino: string){
    this.productosFiltrados = this.productos.filter((prod)=>{ 
      return (prod.categoria.indexOf(termino)>=0 || prod.titulo.toLowerCase().indexOf(termino.toLowerCase())>=0)
    })
    console.log(this.productosFiltrados)
  }


}
