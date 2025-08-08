import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LaboratoryService } from '../../core/services/laboratory.service';
import { Laboratory } from '../../core/models/laboratory.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterOutlet
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('dialogoDescricao') dialogoDescricao!: ElementRef<HTMLDialogElement>;

  laboratorios: Laboratory[] = [];
  laboratoriosFiltrados: Laboratory[] = [];
  usuarioLogado: User | null = null;
  totalComputadores: number = 0;
  termoPesquisa: string = '';
  laboratorioSelecionado: Laboratory | null = null;
  novaDescricao: string = '';

  constructor(
    private laboratoryService: LaboratoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carregarLaboratorios();
  }

  carregarUsuarioLogado(): void {
    const usuario = this.authService.getUsuarioLogado();
    if (usuario) {
      this.usuarioLogado = {
        ...usuario,
        nome: usuario.nome || usuario.name
      };
    }
  }

  carregarLaboratorios(): void {
    this.laboratoryService.getLaboratories().subscribe({
      next: (response: any) => {
        this.laboratorios = Array.isArray(response) ? response : 
                          (response?.laboratorios || []);
        this.laboratorios = this.laboratorios.map(lab => ({
          ...lab,
          status: lab.status !== undefined ? lab.status : true
        }));
        this.laboratoriosFiltrados = [...this.laboratorios];
        this.calcularTotalComputadores();
      },
      error: (error: any) => {
        console.error('Erro ao carregar laboratórios:', error);
      }
    });
  }

  calcularTotalComputadores(): void {
    this.totalComputadores = this.laboratorios.reduce(
      (total, lab) => total + (lab.quantidadeComputadores || 0), 0
    );
  }

  filtrarLaboratorios(): void {
    if (!this.termoPesquisa) {
      this.laboratoriosFiltrados = [...this.laboratorios];
      return;
    }

    const termo = this.termoPesquisa.toLowerCase();
    this.laboratoriosFiltrados = this.laboratorios.filter(
      lab => (lab.nome?.toLowerCase().includes(termo)) || 
             (lab.localizacao?.toLowerCase().includes(termo)) ||
             (lab.descricao?.toLowerCase().includes(termo))
    );
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
          this.laboratoriosFiltrados = this.laboratoriosFiltrados.filter(lab => lab.id !== id);
          this.calcularTotalComputadores();
        },
        error: (error: any) => {
          console.error('Erro ao excluir laboratório:', error);
          alert('Ocorreu um erro ao excluir o laboratório.');
        }
      });
    }
  }

  alternarStatus(lab: Laboratory): void {
    const novoStatus = !lab.status;
    const confirmacao = confirm(`Deseja realmente ${novoStatus ? 'ativar' : 'inativar'} o laboratório ${lab.nome}?`);
    
    if (!confirmacao) return;

    lab.status = novoStatus;
    
    const index = this.laboratorios.findIndex(l => l.id === lab.id);
    if (index !== -1) {
      this.laboratorios[index].status = novoStatus;
    }
    
    const indexFiltrado = this.laboratoriosFiltrados.findIndex(l => l.id === lab.id);
    if (indexFiltrado !== -1) {
      this.laboratoriosFiltrados[indexFiltrado].status = novoStatus;
    }
  }

  abrirDialogoDescricao(lab: Laboratory): void {
    this.laboratorioSelecionado = lab;
    this.novaDescricao = lab.descricao || '';
    this.dialogoDescricao.nativeElement.showModal();
  }

  fecharDialogo(): void {
    this.dialogoDescricao.nativeElement.close();
    this.laboratorioSelecionado = null;
    this.novaDescricao = '';
  }

  salvarDescricao(): void {
  if (!this.laboratorioSelecionado || this.laboratorioSelecionado.id === undefined) return;

  this.laboratoryService.atualizarDescricaoLaboratorio(
    this.laboratorioSelecionado.id, 
    this.novaDescricao
  ).subscribe({
    next: (laboratorioAtualizado) => {
      const index = this.laboratorios.findIndex(l => l.id === this.laboratorioSelecionado?.id);
      if (index !== -1) {
        this.laboratorios[index] = laboratorioAtualizado;
        this.laboratoriosFiltrados = [...this.laboratorios];
      }
      this.fecharDialogo();
    },
    error: (error) => {
      console.error('Erro ao atualizar descrição:', error);
      alert(`Erro ao atualizar a nota: ${error.message || 'Endpoint não encontrado'}`);
      this.fecharDialogo();
    }
  });
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}