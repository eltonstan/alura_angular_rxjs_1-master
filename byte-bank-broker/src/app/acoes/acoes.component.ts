import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesServices.getAcoes()
  .pipe(
    tap(() => {console.log('FLuxo inicial')}
  ));
  filtroPeloInput$ = this.acoesInput.valueChanges
  .pipe(debounceTime(ESPERA_DIGITACAO),
    tap(() => console.log("fluxo do filtro")),
    tap(() => console.log),
    filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.acoesServices.getAcoes(valorDigitado))
  )
  
  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesServices: AcoesService) {}

}
