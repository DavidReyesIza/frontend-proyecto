import { ProductosService } from './services/productos.service';
import { ClientesService } from './services/clientes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private clienteService : ClientesService,
              private productoService: ProductosService) {


  }


  ngOnInit(): void {
    this.clienteService.obtenerCliente();
    this.productosPermitidos();
    console.log('vacio',!this.clienteService)
    console.log('con cliente',!this.clienteService.cliente)
  }

  productosPermitidos(){
    this.productoService.cargarProductos().subscribe(({productos}) =>{
      this.productoService.productosPermitidos = productos.filter(producto => producto.clienteId == this.clienteService.cliente.id);
      console.log('productos Permitidos',this.productoService.productosPermitidos)
    })

  }

  title = 'frontend-app';
}
