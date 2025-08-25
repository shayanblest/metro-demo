import { Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {ListQuery} from './list.query';

@Component({
  selector: 'metro-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {


  constructor(
    private activatedRoute: ActivatedRoute
  ) { }


  @Input() totalRecords!: number;

  activePage: number = 1;
  pageLength: number = 10;
  totalPages: number = 1;

  nextPage: number = 0;
  prevPage: number = 0;

  subscriptions: Subscription[] = [];


  qParams?: ListQuery;


  ngOnInit(): void {

    const sub2 = this.activatedRoute.queryParams.subscribe((params: ListQuery) => {
      this.qParams = params;
      this.buildPages();
    });

    this.subscriptions.push(sub2);

  }

  ngOnChanges(): void {

    this.buildPages();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private buildPages(): void {

    this.pageLength = parseInt((this.qParams?.length || 10).toString()) ;
    this.activePage = parseInt((this.qParams?.page || 1).toString());
    this.nextPage = parseInt(this.activePage.toString()) + 1;
    this.prevPage = parseInt(this.activePage.toString()) - 1;

    this.totalPages = this.totalRecords / this.pageLength;


    this.totalPages = Math.ceil(this.totalPages);

    if (this.totalPages < 1) {
      this.totalPages = 1;
    }
  }

}
