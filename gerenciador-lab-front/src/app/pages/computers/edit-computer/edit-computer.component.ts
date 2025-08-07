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
  styleUrls: ['./edit-computer.component.scss']
})
export class EditComputerComponent implements OnInit {
  form = this.fb.group({
    nome: ['', Validators.required],
    patrimonio: ['', Validators.required],
    retirado: [false]
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
      next: (comp: Computers) => {
        console.log('Computador recuperado:', comp);

        this.form.patchValue({
          nome: comp.nome,
          patrimonio: comp.patrimonio,
          retirado: comp.retirado 
        });

        this.laboratorioId = comp.laboratory_id;
        console.log('Laboratory ID recuperado:', this.laboratorioId);
      },
      error: (err) => {
        console.error('Erro ao carregar computador', err);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const dadosAtualizados: Computers = {
      id: this.computadorId,
      nome: this.form.value.nome!,
      patrimonio: this.form.value.patrimonio!,
      retirado: this.form.value.retirado || false, 
      laboratory_id: this.laboratorioId 
    };

    console.log('Dados enviados para o PUT:', dadosAtualizados);

    // Enviando os dados para o backend via PUT
    this.computerService.putComputer(this.computadorId, dadosAtualizados).subscribe({
      next: () => {
        console.log('Computador atualizado com sucesso');
        this.router.navigate(['/laboratorio', this.laboratorioId]);  
      },
      error: (err) => {
        console.error('Erro ao atualizar computador', err);
        console.log('Erro detalhado:', err.error);  
      }
    });
  }
}