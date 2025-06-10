import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComputerService } from '../../../core/services/computers.service';
import { Computers } from '../../../core/models/computers.model';  // Importando o modelo correto

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
    retirado: [false]  // Adicionando 'retirado' ao formulário
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

        // Preenchendo o formulário com os dados
        this.form.patchValue({
          nome: comp.nome,
          patrimonio: comp.patrimonio,
          retirado: comp.retirado  // Preenchendo o 'retirado'
        });

        // Recuperando o laboratório_id diretamente do computador
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

    // Preparando os dados para enviar no PUT
    const dadosAtualizados: Computers = {
      id: this.computadorId,
      nome: this.form.value.nome!,
      patrimonio: this.form.value.patrimonio!,
      retirado: this.form.value.retirado || false,  // Garantindo que 'retirado' seja booleano
      laboratory_id: this.laboratorioId // Enviando o laboratory_id corretamente
    };

    console.log('Dados enviados para o PUT:', dadosAtualizados);

    // Enviando os dados para o backend via PUT
    this.computerService.putComputer(this.computadorId, dadosAtualizados).subscribe({
      next: () => {
        console.log('Computador atualizado com sucesso');
        this.router.navigate(['/laboratorio', this.laboratorioId]);  // Navega para a página do laboratório após atualização
      },
      error: (err) => {
        console.error('Erro ao atualizar computador', err);
        console.log('Erro detalhado:', err.error);  // Exibe o corpo da resposta de erro
      }
    });
  }
}