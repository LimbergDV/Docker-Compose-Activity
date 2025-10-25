import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../../../services/car.service';;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrl: './cars-table.component.css'
})
export class CarsTableComponent implements OnInit{
  cars: Car[] = [];
  selectedCar: Car | null = null;

  constructor(private carService: CarService){}

  ngOnInit(): void {
      this.obtenerCarros();
  }

  obtenerCarros(){
    this.carService.getAllCars().subscribe(response => {
      this.cars = response;
      console.log('Carros Obtenidos', this.cars);
    });
  }

  eliminarCarro(id_car?: number){
    if(id_car !== undefined){
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5DFF34',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',color:'black',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.carService.deleateCar(id_car).subscribe(
            (response) => {
              Swal.fire(
                'Eliminado!',
                'El carro ha sido eliminado.',
                'success'
              );
            },
            (error) => {
              Swal.fire(
                'Error!',
                'Hubo un problema al eliminar el carro.',
                'error'
              );
            }
          );
        }
      });
      }else{
        console.error('ID del carro es indefinido')
      }
    }

    seleccionarCarro(car: Car){
      console.log('Se hizo clicl en el boton del carro');
      this.selectedCar = { ...car};
      console.log('Carro seleccionado', this.selectedCar);
    }

    actualizarCarro(){
      if(this.selectedCar){
        this.carService.updateCars(this.selectedCar).subscribe(()=>{
          this.obtenerCarros();
          this.selectedCar = null;
        })
      }
    }

    limpiarSeleccion(){
      this.selectedCar = null;
    }
  }


