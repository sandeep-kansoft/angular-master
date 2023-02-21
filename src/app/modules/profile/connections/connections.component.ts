import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserDetail } from '../overview/user-detail';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from '../campaigns/product';
import { ProfileService } from '../profile.service';
@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
})
export class ConnectionsComponent {
  ProductForm!: FormGroup;
  appThemeName: string = environment.appThemeName;
  appPurchaseUrl: string = environment.appPurchaseUrl;
  appPreviewUrl: string = environment.appPreviewUrl;
  @Input() userDetailInfo: UserDetail;
  @Output() saveProfileEmitter = new EventEmitter<object>();
  appDemos = environment.appDemos;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  CategoryList: any = Category;
  private unsubscribe: Subscription[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private profileInfo :  ProfileService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    // console.log("Here in child the data is ", this.userDetailInfo)
    this.ProductForm = this.formBuilder.group({
      ProductName: new FormControl('', Validators.required),
      SupplierID: new FormControl(1, Validators.required),
      // CategoryID: new FormControl(1),
      QuantityPerUnit: new FormControl('', Validators.required),
      UnitPrice: new FormControl(18),
      UnitsInStock: new FormControl(0),
      UnitsOnOrder: new FormControl(10),
      ReorderLevel: new FormControl(10),
      Discontinued: new FormControl(false),
      Category: new FormControl(''),
      FirstOrderedOn: new FormControl(new Date()),
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  formSubmitHandler() {
    if (this.ProductForm.valid) {
      let payload = {
        ProductID: 2,
        ProductName: this.ProductForm.controls['ProductName'].value,
        SupplierID: this.ProductForm.controls['SupplierID'].value,
        CategoryID: this.ProductForm.controls['Category'].value,
        QuantityPerUnit: this.ProductForm.controls['QuantityPerUnit'].value,
        UnitPrice: this.ProductForm.controls['UnitPrice'].value,
        UnitsInStock: this.ProductForm.controls['UnitsInStock'].value,
        UnitsOnOrder: this.ProductForm.controls['UnitsOnOrder'].value,
        ReorderLevel: this.ProductForm.controls['ReorderLevel'].value,
        Discontinued: this.ProductForm.controls['Discontinued'].value,
        Category: {
          CategoryID: this.ProductForm.controls['Category'].value,
          CategoryName: this.CategoryList.find(
            (val: any) =>
              val.CategoryID == this.ProductForm.controls['Category'].value
          ).CategoryName,
          Description: this.CategoryList.find(
            (val: any) =>
              val.CategoryID == this.ProductForm.controls['Category'].value
          ).Description,
        },
        FirstOrderedOn: this.ProductForm.controls['ProductName'].value,
      };

      console.log('payload is', payload);
    }
  }
}
