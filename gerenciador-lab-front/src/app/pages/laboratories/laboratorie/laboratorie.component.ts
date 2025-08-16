import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComputerService } from '../../../core/services/computers.service';
import { Laboratory } from '../../../core/models/laboratory.model';
import { Computers } from '../../../core/models/computers.model';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-laboratorie',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './laboratorie.component.html',
  styleUrls: ['./laboratorie.component.scss']
})
export class LaboratorieComponent implements OnInit {
  laboratorio!: Laboratory;
  computadores: Computers[] = [];
  laboratorioId!: number;
  loadingStates: { [id: number]: boolean } = {};
  menuAberto: number | null = null;

  // ✅ Formulário reativo
  computerForm: FormGroup;
  showForm = false;

  constructor(
    private route: ActivatedRoute,
    private laboratoryService: LaboratoryService,
    private computerService: ComputerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Inicializa o formulário
    this.computerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      patrimonio: ['', [Validators.required]],
      retirado: [false]
    });
  }

  ngOnInit(): void {
    this.laboratorioId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDados();
  }

  carregarDados(): void {
    this.laboratoryService.getLaboratory(this.laboratorioId).subscribe({
      next: (res) => this.laboratorio = res.laboratorio,
      error: () => console.error('Erro ao carregar laboratório')
    });

    this.carregarComputadores();
  }

  carregarComputadores(): void {
    this.computerService.getComputers().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : res.computadores;
        this.computadores = lista.filter((c: Computers) => c.laboratory_id === this.laboratorioId);
      },
      error: () => console.error('Erro ao carregar computadores')
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.computerForm.reset();
    }
  }

  // ✅ Método correto
  onSubmit(): void {
    if (this.computerForm.invalid) return;

    const computerData = {
      ...this.computerForm.value,
      laboratory_id: this.laboratorioId
    };

    this.computerService.createComputer(computerData).subscribe({
      next: () => {
        this.carregarComputadores();
        this.computerForm.reset();
        this.showForm = false;
      },
      error: (error) => {
        console.error('Erro ao criar computador:', error);
        alert('Erro ao criar computador');
      }
    });
  }

  alternarRetirada(computador: Computers): void {
    if (typeof computador.id !== 'number') {
      console.error('ID do computador inválido');
      return;
    }

    const id = computador.id;
    const confirmacao = confirm(
      `Deseja ${computador.retirado ? 'disponibilizar' : 'indisponibilizar'} este computador?`
    );

    if (!confirmacao) return;

    this.loadingStates[id] = true;

    this.computerService.toggleRetirado(id).subscribe({
      next: (updated) => {
        computador.retirado = updated.retirado;
        delete this.loadingStates[id];
      },
      error: (error) => {
        console.error('Erro ao alternar status:', error);
        delete this.loadingStates[id];
        alert('Erro ao atualizar status do computador');
      }
    });
  }

  editarComputador(computador: Computers): void {
    if (computador.id) {
      this.router.navigate(['/computador/editar', computador.id]);
    }
  }

  excluirComputador(computador: Computers): void {
    if (!computador.id) return;

    const confirmacao = confirm('Tem certeza que deseja excluir este computador?');
    if (!confirmacao) return;

    this.computerService.deleteComputer(computador.id).subscribe({
      next: () => {
        this.computadores = this.computadores.filter(c => c.id !== computador.id);
      },
      error: () => alert('Erro ao excluir computador')
    });
  }

  toggleMenu(index: number): void {
    this.menuAberto = this.menuAberto === index ? null : index;
  }
}
