import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from '../../../core/services/computers.service';
import { Laboratory } from '../../../core/models/laboratory.model';
import { Computers } from '../../../core/models/computers.model';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laboratorie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laboratorie.component.html',
  styleUrl: './laboratorie.component.scss'
})
export class LaboratorieComponent implements OnInit {
  laboratorio!: Laboratory;
  computadores: Computers[] = [];
  laboratorioId!: number;

  constructor(
    private route: ActivatedRoute,
    private laboratoryService: LaboratoryService,
    private computerService: ComputerService
  ) {}

  ngOnInit(): void {
  this.laboratorioId = Number(this.route.snapshot.paramMap.get('id'));

  this.laboratoryService.getLaboratory(this.laboratorioId).subscribe({
    next: (res) => this.laboratorio = res.laboratorio,
    error: () => console.error('Erro ao carregar laboratório')
  });

  this.computerService.getComputers().subscribe({
    next: comps => {
      this.computadores = comps.filter(c => c.laboratory_id === this.laboratorioId);
    },
    error: () => console.error('Erro ao carregar computadores')
  });
}


  alternarRetirada(computador: Computers): void {
    this.computerService.toggleRetirado(computador.id!).subscribe({
      next: updated => {
        computador.retirado = updated.retirado;
      },
      error: () => console.error('Erro ao atualizar status de retirada')
    });
  }
}
