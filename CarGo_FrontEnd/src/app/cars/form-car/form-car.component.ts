import { Component } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../../../services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.css']
})
export class FormCarComponent {
  //Definimos un array de carros vacío
  cars: Car[]=[];

  car: Car = {
    brand:'',
    model:'',
    year:0,
    type_car:'',
    plate_number:'',
    price_day: 0
  };

  constructor(private _carService: CarService){}

  ngOnInit():void{
    console.log('Formulario CARROS inicializado');
  }

  registerCar(): void{

    if(!this.car.brand || !this.car.model || !this.car.year || !this.car.type_car || !this.car.plate_number || !this.car.price_day){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios.',
        showConfirmButton: true
      })
      //Para salir del método si es que hay campos vacíos :p
      return;
    }


    console.log(this.car);
    console.log('Formulario enviado');
    console.log('Valores del formulario:');
    console.log('id_custome:', this.car.id_car);
    console.log('Name:', this.car.brand);
    console.log('last_names:', this.car.model);
    console.log('phone_number:', this.car.year);
    console.log('CURP:', this.car.type_car);
    console.log('number_license', this.car.plate_number);

    this._carService.createCar(this.car).subscribe(
      (response: Car) =>{
        console.log('Carro registrado:'), response;
        this.cars.push(response);
        this.limpiarFormulario();



        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El Carro ha sido registrado correctamente.',
          showConfirmButton: false,
          timer: 1500
        });

      },(error)=>{
        console.log('Error al registrat el carro', error);
      }
    );
  }
  limpiarFormulario(): void {
    this.car = {
      brand: '',
      model: '',
      year: 0,
      type_car: '',
      plate_number: '',
      price_day: 0,

    };
  }
}
