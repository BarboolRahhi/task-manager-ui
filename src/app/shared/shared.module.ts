import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LogoComponent,
    FormFieldComponent,
    ButtonComponent,
    FieldErrorComponent,
    ProjectItemComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    SidebarComponent,
    HeaderComponent,
    LogoComponent,
    FormFieldComponent,
    ButtonComponent,
    ProjectItemComponent,
    FieldErrorComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
