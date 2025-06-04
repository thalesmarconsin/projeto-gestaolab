import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LaboratoryService } from '../../core/services/laboratory.service';
import { Laboratory } from '../../core/models/laboratory.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, RouterOutlet, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class DashboardComponent implements OnInit {
  laboratorios: Laboratory[] = [];

  constructor(
    private laboratoryService: LaboratoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.laboratoryService.getLaboratories().subscribe({
      next: (labs: any) => {
        this.laboratorios = labs.laboratorios; // Supondo que a resposta seja em { laboratorios: [...] }
      },
      error: () => console.error('Erro ao carregar laboratórios')
    });
  }

  abrirDetalhes(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/laboratorio', id]);
    }
  }

  criarLaboratorio(): void {
    this.router.navigate(['/criar']);
  }

  editarLaboratorio(id?: number): void {
    if (id) {
      this.router.navigate(['/laboratorio/editar', id]);
    }
  }

  excluirLaboratorio(id?: number): void {
    if (id && confirm('Tem certeza que deseja excluir este laboratório?')) {
      this.laboratoryService.deleteLaboratory(id).subscribe({
        next: () => {
          this.laboratorios = this.laboratorios.filter(lab => lab.id !== id);
        },
        error: () => console.error('Erro ao excluir laboratório')
      });
    }
  }

  alternarStatus(lab: Laboratory): void {
    lab.status = !lab.status; 
  }
}
