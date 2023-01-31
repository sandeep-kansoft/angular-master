import { Injectable } from '@angular/core';
import { assign, cloneDeep, filter, find } from 'lodash-es';
import { DashboardApiModule } from '@shared/constants/url.config';
import { FuseMockApiService } from '@shared/lib/mock-api';
import { dashboard as DashboardData } from './data';
import { dashboardById } from './data';

@Injectable({
  providedIn: 'root',
})
export class DashboardMockApi {
  private _Dashboard: any = DashboardData;

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Dashboard - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet(DashboardApiModule.DashboardApi)
      .reply(() => [200, cloneDeep(this._Dashboard)]);

    this._fuseMockApiService
      .onGet(DashboardApiModule.DashboardApi + '?entityStatus=ACTIVE')
      .reply(() => [200, cloneDeep(this._Dashboard)]);

    this._fuseMockApiService
      .onGet(DashboardApiModule.DashboardApi + '/:id')
      .reply(({ request, urlParams }: any) => {
        let id = urlParams.id;
        const result = find(this._Dashboard, { id: Number(id) });
        return [200, result];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Dashboard - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPatch(DashboardApiModule.DashboardApi)
      .reply(({ request }: any) => {
        // Get the user mock-api

        const user = cloneDeep(request.body.user);

        // Update the user mock-api
        this._Dashboard = assign({}, this._Dashboard, user);

        // Return the response
        return [200, cloneDeep(this._Dashboard)];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Dashboard - POST
    // -----------------------------------------------------------------------------------------------------

    this._fuseMockApiService
      .onPost(DashboardApiModule.DashboardApi)
      .reply(({ request }: any) => {
        // Get the user mock-api
        const Dashboard = cloneDeep(request.body);

        this._Dashboard = Dashboard;

        // Return the response
        return [200, cloneDeep(this._Dashboard)];
      });

    this._fuseMockApiService
      .onPost(DashboardApiModule.DashboardApi + '/reorder')
      .reply(({ request }: any) => {
        // Return the response
        return [200, cloneDeep(DashboardData)];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Dashboard - PUT
    // -----------------------------------------------------------------------------------------------------

    this._fuseMockApiService
      .onPut(DashboardApiModule.DashboardApi + '/200')
      .reply(({ request }: any) => {
        // Get the user mock-api
        const Dashboard = cloneDeep(request.body);

        this._Dashboard = Dashboard;

        // Return the response
        return [200, cloneDeep(this._Dashboard)];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Dashboard - DELETE
    // -----------------------------------------------------------------------------------------------------

    this._fuseMockApiService
      .onDelete(DashboardApiModule.DashboardApi + '/200')
      .reply(({ request }: any) => {
        // Get the user mock-api
        const Dashboard = cloneDeep(request.body);

        this._Dashboard = Dashboard;

        // Return the response
        return [200, cloneDeep(this._Dashboard)];
      });
  }
}
