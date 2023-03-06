export interface PurchaseRequest { }

export interface PrResponseDto {
  prid: number;
  pR_NUM: string;
  prepareR_ID: number;
  description: string;
  enterby: string;
  enterdate: string;
  approvedDate: string;
  siteId: number;
  siteName: string;
  projecT_NAME: any;
  departmentCode: any;
  departmentName: string;
  prtype: string;
  prSubType: string;
  preparer: string;
  totalValue: number;
  assignBuyer: string;
  pR_STATUS: string;
  buyerstatus: string;
}



export interface PrLineResponseDto {
  prtransid: number;
  prid: number;
  pR_NUM: string;
  itemcode: string;
  iteM_DESCRIPTION: string;
  uom: string;
  quantity: number;
  inProcessQUANTITY: number;
  usedQty: number;
  remQty: number;
  rate: number;
  netAmount: number;
  buyerstatus: string;
  rfqStatus: string;
  rfqno: string;
  poNo: string;
  poid: number;
  stateName: string;
  buyerid: number;
  siteID: number;
}

export interface PrHistoryResponseDto {
  round: string;
  pR_No: string;
  pR_Description: string;
  wF_No: string;
  level: string;
  approval?: any;
  required_By?: any;
  assigned_Date: string;
  action_Taken_By: string;
  action_Taken_Date: string;
  status: string;
  remarks: string;
  iteM_CODE?: any;
  product_Name?: any;
  quantity?: any;
  uniT_PRICE?: any;
  amount?: any;
}

export interface PrLineHistoryResponseDto {

  vendorcode: number,
  vendorname: string,
  pono: string,
  podate: string,
  itemcode: number,
  itemdescription: string,
  poqty: number,
  uom: string,
  netAmt: number,
  discAmt: number

}



export interface PrLineHeaderDetail {
  pR_Lines: any[];
  prepareR_ID: number;
  prid: number;
  pR_NUM: string;
  siteId: number;
  siteName: string;
  prtype: string;
  prSubType: string;
  creatioN_DATE: string;
  projecT_NAME?: any;
  description: string;
  tefrId?: any;
  bjReason?: any;
  bjDetails: string;
  woNumber?: any;
  totalValue: number;
  preparer: string;
  departmentCode?: any;
  departmentName: string;
  warehouse?: any;
  enterby: string;
  assignBuyer: string;
  pR_STATUS: string;
  enterDate: string;
  attachment?: any;
  mConsumptionDate: string;
}


