import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private pageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private title: Title
  ) { }


  setTitle(tit: string): void {
    this.pageTitle$.next(tit);
    this.title.setTitle(environment.pageTitlePrefix + " - " + tit);
  }

  getTitle(): Observable<string> {
    return this.pageTitle$.asObservable();
  }
}
