import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {PersianDigitsPipe} from '../../pipes/persian-digits.pipe';
import {SecureImgComponent} from '../secure-img/secure-img.component';
import {ToShamsiPipe} from '../../pipes/to-shamsi.pipe';
import {genderTranslations} from '../../../features/members/enums/genders.enum';
import {educationDegreeTranslations} from '../../../features/members/enums/educational-degree.enum';
import {marriageStatusTranslations} from '../../../features/members/enums/marriage-statuses.enum';
import {MemberModel} from '../../../features/members/models/member.model';
import {environment} from '../../../../environments/environment';
import {RouterLink} from '@angular/router';
import {MembersService} from '../../../features/members/services/members.service';
import {Subscription} from 'rxjs';
import {ListResultModel} from '../../../core/models/list-result.model';
import {InsuranceModel} from '../../../features/members/models/insurance.model';
import {CommonModule} from '@angular/common';
import {InsuranceListItemViewModel} from '../../../core/value-objects/insurance-list-item-view.model';

@Component({
  selector: 'app-member-info',
  imports: [
    CommonModule,
    PersianDigitsPipe,
    SecureImgComponent,
    ToShamsiPipe,
    RouterLink
  ],
  templateUrl: './member-info.component.html',
  styleUrl: './member-info.component.scss'
})
export class MemberInfoComponent implements OnInit, OnDestroy {

  @Input() memberId!: string;
  member = signal<MemberModel | undefined>(undefined);
  insurances = signal(0);
  subscriptions: Subscription[] = [];

  constructor(
    private membersService: MembersService,
  ) {
  }

  ngOnInit(): void {
    this.getMember(this.memberId);
    this.getMemberInsurances(this.memberId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getMember(memberId: string): void {
    const query = {
      include: `Position,MainMember`
    }
    const s = this.membersService.get(memberId, query).subscribe({
      next: (member: MemberModel) => {
        this.member.set(member);
      }
    });
    this.subscriptions.push(s);
  }

  private getMemberInsurances(memberId: string): void {
    const query = {
      page: 1,
      length: 10,
      filter: `Status:eq(1)`,
    }
    const s = this.membersService.getInsurances(memberId, query).subscribe({
      next: (res: ListResultModel<InsuranceListItemViewModel>) => {
        this.insurances.set(res.count)
      }
    });
    this.subscriptions.push(s);
  }

  protected readonly genderTranslations = genderTranslations;
  protected readonly educationDegreeTranslations = educationDegreeTranslations;
  protected readonly marriageStatusTranslations = marriageStatusTranslations;
  protected readonly fileBase = environment.fileBase;

}
