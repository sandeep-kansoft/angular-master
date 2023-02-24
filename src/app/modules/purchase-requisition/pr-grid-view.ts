export interface PrGridDataDto {
  sno: number;
  prid: number;
  PR_NUM: string;
  DESCRIPTION?: string | null;
  CREATION_DATE: string;
  ApprovedDate: string;
  SiteName: number;
  PROJECT_NAME: string;
  DEPARTMENTNAME: string;
  PRTYPE: string;
  PRSubType: string;
  TotalValue: number;
  AssignBuyer: string;
  BUYERSTATUS: string;
  REQUESTED_BY?: string;
}
