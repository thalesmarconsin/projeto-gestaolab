import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComputerService } from '../../../core/services/computers.service';
import { Computers } from '../../../core/models/computers.model';

@Component({
  selector: 'app-edit-computer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-computer.component.html',
  styleUrl: './edit-computer.component.scss'
})
export class EditComputerComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
    patrimonio: ['', Validators.required]
  });

  computadorId!: number;
  laboratorioId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private computerService: ComputerService
  ) {}

  ngOnInit(): void {
    this.computadorId = Number(this.route.snapshot.paramMap.get('id'));

    this.computerService.getComputer(this.computadorId).subscribe({
      next: comp => {
        this.form.patchValue({
          nome: comp.nome,
          patrimonio: comp.patrimonio
        });
        this.laboratorioId = comp.laboratory_id;
      },
      error: () => console.error('Erro ao carregar computador')
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const dadosAtualizados: Computers = {
      nome: this.form.value.nome!,
      patrimonio: this.form.value.patrimonio!,
      retirado: false, // ou manter o estado original se desejar
      laboratory_id: this.laboratorioId
    };

    this.computerService.putComputer(this.computadorId, dadosAtualizados).subscribe({
      next: () => this.router.navigate(['/laboratorio', this.laboratorioId]),
      error: () => console.error('Erro ao atualizar computador')
    });
  }
}
