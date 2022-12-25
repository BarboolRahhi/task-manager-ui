import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbNavbarComponent } from './breadcrumb-navbar.component';

describe('BreadcrumbNavbarComponent', () => {
  let component: BreadcrumbNavbarComponent;
  let fixture: ComponentFixture<BreadcrumbNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BreadcrumbNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
