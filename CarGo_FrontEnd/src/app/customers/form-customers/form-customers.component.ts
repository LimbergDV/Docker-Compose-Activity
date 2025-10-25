import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.css']
})
export class FormCustomersComponent implements OnInit {
  // Definimos un array de clientes vacío
  customers: Customer[] = [];

  custom: Customer = {
    name: '',
    last_names: '',
    phone_number: '',
    CURP: '',
    number_license: '',
    birthdate: ''
  };

  constructor(private _customerService: CustomerService) {}

  ngOnInit(): void {
    console.log('Formulario inicializado');
  }

  registerCustomer(): void {
    if(!this.custom.name || !this.custom.last_names || !this.custom.phone_number || !this.custom.CURP || !this.custom.number_license || !this.custom.birthdate){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios.',
        showConfirmButton: true
      });
      //Para salir del método si es que hay campos vacíos :p
      return;
    }
    console.log(this.custom)
    console.log('Formulario enviado');
    console.log('Valores del formulario:');
    console.log('id_custome:', this.custom.id_customer);
    console.log('Name:', this.custom.name);
    console.log('last_names:', this.custom.last_names);
    console.log('phone_number:', this.custom.phone_number);
    console.log('CURP:', this.custom.CURP);
    console.log('number_license', this.custom.number_license);
    console.log('birthdate', this.custom.birthdate);

    this._customerService.createCustomer(this.custom).subscribe(
      (response: Customer) => {
        console.log('Cliente registrado:', response);
        this.customers.push(response);
        this.limpiarFormulario();


        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El cliente ha sido registrado correctamente.',
          showConfirmButton: false,
          timer: 1500
        });

      },
      (error) => {
        console.log('Error al registrar el cliente:', error);
      }
    );
  }

  limpiarFormulario(): void {
    this.custom = {
      name: '',
      last_names: '',
      phone_number: '',
      CURP: '',
      number_license: '',
      birthdate: ''
    };
  }
}
