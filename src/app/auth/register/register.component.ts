import { ClientesService } from './../../services/clientes.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private clientesService: ClientesService,
    private router: Router,
    private clienteService: ClientesService) { }


  public loginForm = this.fb.group({


    // la instruccion || hace que si encuentra un null en la primera condicion establecera un string vacio
    email: ['',[Validators.required, Validators.email]],
    password: ['',Validators.required]

  });

  login(){
    console.log(this.loginForm.value)
    this.clientesService.registrarCliente(this.loginForm.value)
    .subscribe((cliente : any) =>{
      console.log('respuesta',cliente)
      this.clienteService.guardarLocalStorage(cliente);
     // this.router.navigateByUrl('/dashboard')
     this.clientesService.cliente = cliente.cliente
     const {email} = cliente.cliente
     swal.fire('Sesion Iniciada',
     `Usuario  ${email} creado con exito!`,
     'success')
     this.router.navigateByUrl('/mantenimiento')

    },(err)=>{
      console.log(err)
      swal.fire('Error',err.error.mensaje, 'error');
    }

    )
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.loginForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  ngOnInit(): void {
  }

}
