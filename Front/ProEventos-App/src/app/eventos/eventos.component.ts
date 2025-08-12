import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  public eventos: any = [];
  public eventosfiltados: any = [];
  larguraImg = 150;
  margemImg = 2;
  mostraImagem = true;
  private _filtroLista = '';
  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosfiltados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  filtrarEventos(filtroPor: string): any {
    filtroPor = filtroPor.toLocaleLowerCase();
    return this.eventos.filter(
      ( evento: { tema: string ; local: string} ) => evento.tema.toLocaleLowerCase().indexOf(filtroPor) !== -1 || evento.local.toLocaleLowerCase().indexOf(filtroPor) !== -1
    );
  }

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:7027/api/Eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosfiltados = this.eventos;
      },
      error => console.log(error),
    );
  }

  ControlarImg() {
    this.mostraImagem = !this.mostraImagem;
  }
}
