import { Component, OnInit } from '@angular/core';
import { Rent } from '../models/rent';
import { RentService } from '../../../services/rent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rents-table',
  templateUrl: './rents-table.component.html',
  styleUrl: './rents-table.component.css'
})
export class RentsTableComponent implements OnInit{
  rents: Rent [] = [];
  selectedRent: Rent | null = null;


  constructor(private rentService: RentService){}

  ngOnInit(): void {
      this.loadRents();
  }


  loadRents(): void {
    this.rentService.getAllRents().subscribe((data: Rent[]) => {
      this.rents = data;
      console.log('Rentas obtenidas:', this.rents);
    });
  }

  selectRent(rent: Rent): void {
    this.selectedRent = { ...rent };
  }

  deleteRent(id_rent: number): void {
    if(id_rent !== undefined){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5DFF34',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rentService.deleteRent(id_rent).subscribe(
          (response) => {
            Swal.fire(
              'Eliminado!',
              'El cliente ha sido eliminado.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el cliente.',
              'error'
            );
          }
        );
      }
    });
    } else{
      console.error('ID de la renta es indefinido')
    }
  }


  updateRent(): void{
    if(this.selectedRent){
      this.rentService.updateRent(this.selectedRent).subscribe(() =>{
        this.loadRents();
        this.selectedRent = null;
        Swal.fire('Éxito', 'Renta actualizada correctamente', 'success');
      });
    }
  }


  cleanSelection(): void{
    this.selectedRent = null;
  }
}
