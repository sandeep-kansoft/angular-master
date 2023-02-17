import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import {
    DataStateChangeEvent,
    GridDataResult,
} from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { products } from './product';
@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
})
export class CampaignsComponent {
    public gridView: GridDataResult;
    public products: any[] = products;
    public pageSize = 10;
    public state: State = {
        group: [{ field: 'Category.CategoryName' }],
        sort: [
            {
                field: 'ProductName',
                dir: 'asc',
            },
        ],
        filter: {
            logic: 'and',
            filters: [],
        },
        skip: 0,
        take: 5,
    };

    public ngOnInit(): void {
        this.loadProducts();
    }

    public onStateChange(state: any) {
        this.state = state;

        const newState: any = Object.assign({}, state);

        const sortDescriptor = state.sort.find((s: any) => s.field === 'ProductName');
        const newSortDescriptor: SortDescriptor = { field: '', dir: 'asc' };
        if (sortDescriptor && sortDescriptor.field === 'ProductName') {
            newSortDescriptor.field = 'Unit Price';
            newSortDescriptor.dir = sortDescriptor.dir;
        }
        newState.sort = newState.sort.filter((s: any) => s.field !== 'ProductName');
        newState.sort.push(newSortDescriptor);
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = process(products, this.state);
    }
}