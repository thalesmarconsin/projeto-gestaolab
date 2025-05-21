import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LaboratoryService } from '../../core/services/laboratory.service';
import { Laboratory } from '../../core/models/laboratory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
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
      next: (labs) => this.laboratorios = labs,
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
}
