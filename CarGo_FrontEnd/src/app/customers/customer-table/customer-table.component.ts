import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})

export class CustomerTableComponent implements OnInit {
    customers: Customer[] = [];
    selectedCustomer: Customer | null = null;


    constructor(private customerService: CustomerService) {}

    ngOnInit() {
      this.obtenerClientes();
    }

    obtenerClientes() {
      this.customerService.getAllCustomers().subscribe(response => {
        this.customers = response;
        console.log('Clientes obtenidos:', this.customers);
      });
    }

    eliminarCliente(id_customer?: number) {
      if(id_customer !== undefined ){
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
          this.customerService.deleteCustomer(id_customer).subscribe(
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
      }else{
        console.error('ID del cliente es indefinido')
      }
    }

    seleccionarCliente(customer: Customer) {
      console.log('Se hizo clic en el botón');
      this.selectedCustomer = { ...customer };
      console.log('Cliente seleccionado:', this.selectedCustomer);
    }

    actualizarCliente() {
      if (this.selectedCustomer) {
        this.customerService.updateCustomer(this.selectedCustomer).subscribe(() => {
          this.obtenerClientes();
          this.selectedCustomer = null; // Limpiamos la selección
        });
      }
    }

    // eliminarCliente(id: number) {
    //   this.customerService.deleteCustomer(id).subscribe(() => {
    //     this.loadCustomers(); // Recargamos los clientes después de la eliminación
    //   });
    // }


    // Método para limpiar la selección de cliente
    limpiarSeleccion() {
      this.selectedCustomer = null;
    }
}
