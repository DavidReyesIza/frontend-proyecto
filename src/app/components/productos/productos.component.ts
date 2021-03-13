import { Router } from '@angular/router';
import { ClientesService } from './../../services/clientes.service';
import { Producto } from './../models/producto.model';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos : Producto[] = [];

  constructor(private productoService: ProductosService,
              private clienteService: ClientesService,
              private router: Router) { }

  ngOnInit(): void {
 this.cargarProductos();

 setTimeout(() => {
  console.log(this.productos)
 }, 1000);

  }

  cargarProductos(){
    this.productoService.cargarProductos().subscribe(({productos}) => this.productos = productos)
  }

  comprarProducto(producto: Producto){

    if(producto.clienteId == this.clienteService.cliente.id ){


        swal.fire('Denegado',
        `No puedes comprar tus propios productos`,
        'error')

        this.router.navigateByUrl('/productos')

    } else{
      producto.estado = false;
      this.productoService.comprarProducto(producto).subscribe((resp : any) =>{
        swal.fire('Compra Realizada',
        `Producto ${resp.producto.nombre} comprado con exito.`,
        'success')
      })
    }



  }

}
