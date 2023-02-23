import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailsComponent } from './settings/forms/profile-details/profile-details.component';
import { ConnectedAccountsComponent } from './settings/forms/connected-accounts/connected-accounts.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { EmailPreferencesComponent } from './settings/forms/email-preferences/email-preferences.component';
import { NotificationsComponent } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent } from './settings/forms/sign-in-method/sign-in-method.component';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { OverviewEditorComponent } from './overviewform/overview-editor.component';
import { OverviewEditorCrudComponent } from './overviewform/overview-editor-crud/overview-editor-crud.component';
import { CreateAndEditFormComponent } from './overview/create-and-edit-form/create-and-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition';

@NgModule({
  declarations: [
    AccountComponent,
    OverviewComponent,
    OverviewEditorComponent,
    SettingsComponent,
    ProfileDetailsComponent,
    ConnectedAccountsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
    OverviewEditorCrudComponent,
    CreateAndEditFormComponent,
    PurchaseRequisitionComponent  
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    ReactiveFormsModule 
  ],
})
export class AccountModule {}
