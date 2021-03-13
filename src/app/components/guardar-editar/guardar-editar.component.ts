import { Producto } from './../models/producto.model';
import { ProductosService } from './../../services/productos.service';
import { ClientesService } from './../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import swal from 'sweetalert2';


@Component({
  selector: 'app-guardar-editar',
  templateUrl: './guardar-editar.component.html',
  styleUrls: ['./guardar-editar.component.css']
})
export class GuardarEditarComponent implements OnInit {

  constructor(private fb: FormBuilder, private clientesService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductosService) { }

    public ids;
    public producto = null;
    public url;

public mantForm = this.fb.group({


// id,nombre,precio,stock

// la instruccion || hace que si encuentra un null en la primera condicion establecera un string vacio
id: ['',],
nombre: ['',Validators.required],
precio: ['',Validators.required],
stock: ['',Validators.required],

});


  ngOnInit(): void {
    this.cargarProducto();
    console.log(this.url)
    this.productoService.cargarProductos();
  }

  accion(){

  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.mantForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  cargarProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.url = id;

      if (id) {

       // this.validarUrl(id);
        this.productoService.cargarProducto(id)
        .pipe(
          delay(100)
        )
        .subscribe(producto =>{

         const {id,nombre,precio,stock} = producto;
         this.ids= id;

         this.mantForm.setValue({id,nombre,precio,stock})
        })
      }
    })
  }

  create(){




    const {nombre,precio,stock} =this.mantForm.value;
    console.log('id del cliente aqui',this.clientesService.cliente.id)
    const producto = new Producto(nombre,precio,this.clientesService.cliente.id,true,stock);

    this.productoService.create(producto).subscribe((producto : any) =>{
      this.router.navigate(['/mantenimiento']);

      swal.fire('Producto Agregado',
      `Producto ${producto.producto.nombre} Agregado con exito.`,
      'success')
    })

  }

  update () {


    this.activatedRoute.params.subscribe( params => {



      let id = params['id'];
      this.prueba(id)
      .then(e=> {

          this.productoService.editar(this.mantForm.value).subscribe((producto:any) => {
            swal.fire('Modificacion',
            `Producto ${producto.producto.nombre} Modificado con exito.`,
            'success')
            this.router.navigateByUrl('/mantenimiento')
          })



      }).catch(e=>{
        console.log('el producto fue',e)
        swal.fire('No permitido',
          `No puedes modificar productos de otros vendedores!`,
          'error')
          this.router.navigateByUrl('/mantenimiento')
      })
        console.log('Estos son los productos antes',this.productoService.productosPermitidos)

        //  prod =  this.productoService.productosPermitidos.find( producto =>  producto.id == id )

    })

    //const prod = this.productoService.productosPermitidos.find( producto => producto.id == this.url)

  }


  prueba = (id) =>{
    return new Promise((resolve,reject) =>{

        resolve(this.productoService.productosPermitidos.find( producto =>  producto.id == id )
        )

    })
  }



   validarUrl = async (id) => {
     setTimeout(() => {
      const prod  = this.productoService.productosPermitidos.find((producto : any) => (
        producto.id == id
      ) )

       console.log('El prodd ess',prod)
       if( prod === undefined){
        swal.fire('Denegado',
        `No puedes modificar productos de otros vendedores!`,
        'error')
      this.router.navigateByUrl('/mantenimiento')
      }
     }, 300);

  }







}
