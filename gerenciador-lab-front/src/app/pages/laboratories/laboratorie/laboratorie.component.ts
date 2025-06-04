import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ComputerService } from '../../../core/services/computers.service';
import { Laboratory } from '../../../core/models/laboratory.model';
import { Computers } from '../../../core/models/computers.model';
import { LaboratoryService } from '../../../core/services/laboratory.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-laboratorie',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule,MatButtonModule],
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
    private computerService: ComputerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  this.laboratorioId = Number(this.route.snapshot.paramMap.get('id'));

  this.laboratoryService.getLaboratory(this.laboratorioId).subscribe({
    next: (res) => this.laboratorio = res.laboratorio,
    error: () => console.error('Erro ao carregar laboratório')
  });

  this.computerService.getComputers().subscribe({
  next: (res: any) => {
    const lista = Array.isArray(res) ? res : res.computadores;
    this.computadores = lista.filter((c: Computers) => c.laboratory_id === this.laboratorioId);
  },
  error: () => console.error('Erro ao carregar computadores')
});

}

criarComputador(): void {
  this.router.navigate(['/computador/criar', this.laboratorioId]);
}


  alternarRetirada(computador: Computers): void {
    this.computerService.toggleRetirado(computador.id!).subscribe({
      next: updated => {
        computador.retirado = updated.retirado;
      },
      error: () => console.error('Erro ao atualizar status de retirada')
    });
  }

  menuAberto: number | null = null;

toggleMenu(index: number): void {
  this.menuAberto = this.menuAberto === index ? null : index;
}

editarComputador(id?: number): void {
  if (id) {
    this.router.navigate(['/computador/editar', id]);
  }
}

excluirComputador(id?: number): void {
  if (id && confirm('Tem certeza que deseja excluir este computador?')) {
    this.computerService.deleteComputer(id).subscribe({
      next: () => {
        this.computadores = this.computadores.filter(c => c.id !== id);
      },
      error: () => console.error('Erro ao excluir computador')
    });
  }
}

}
