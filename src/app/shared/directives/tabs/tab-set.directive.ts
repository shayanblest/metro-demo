import { AfterContentInit, ContentChildren, Directive, Output, QueryList, EventEmitter, OnDestroy } from '@angular/core';
import { TabDirective } from './tab.directive';
import { TabHeaderDirective } from './tab-header.directive';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[tabSet]',
    standalone: false
})
export class TabSetDirective implements AfterContentInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  private activeTabName: string = "";

  private subscriptions: Subscription[] = [];

  @ContentChildren(TabHeaderDirective, { descendants: true }) headers!: QueryList<TabHeaderDirective>;
  @ContentChildren(TabDirective, { descendants: true }) tabs!: QueryList<TabDirective>;

  @Output() tabChanged: EventEmitter<string> = new EventEmitter<string>();

  ngAfterContentInit(): void {

    const initialTabName = this.activatedRoute.snapshot.queryParams['tab'] || "";
    
    this.activeTab(initialTabName);

    let sub = this.activatedRoute.queryParams.subscribe((params: any) => {
      const tabName = params['tab'];
      if (tabName) {
        this.activeTab(tabName);
      }
      else {
        this.activeTab(this.headers.first.tabHeader);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  
  activeTab(tabName: string): void {

    if (tabName == this.activeTabName) {
      return;
    }
    this.activeTabName = tabName;
    this.headers.forEach(header => header.isActive = false);
    const relatedHeader = this.headers.find(x => x.tabHeader == tabName) as TabHeaderDirective;
    relatedHeader.isActive = true;

    this.tabs.forEach(tab => tab.isActive = false);
    const relatedTab = this.tabs.find(x => x.tab == tabName) as TabDirective;
    relatedTab.isActive = true;

    this.tabChanged.emit(tabName);
  }
}
