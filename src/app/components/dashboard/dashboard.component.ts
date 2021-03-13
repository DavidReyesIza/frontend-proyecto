import { ProductosService } from './../../services/productos.service';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private clienteService: ClientesService,
              private productoService: ProductosService) { }

  ngOnInit(): void {
    console.log('globalll',this.clienteService.cliente)
  }

  cargarProductos(){

  }

}
