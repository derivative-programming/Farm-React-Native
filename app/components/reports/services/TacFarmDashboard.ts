/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from "yup";
import * as ReportInit  from "./init/TacFarmDashboardInitReport";
import { apiCall } from "../../../apiConfig/apiCall";

export const submitRequest = (data:QueryRequest, tacCode:string) => {
    return apiCall({
      url:  "/tac-farm-dashboard/" + tacCode,
      method: "get",
      params: data
    });
  };

export const submitCSVRequest = (data:QueryRequest, tacCode:string) => {
  console.log('csv request');
    return apiCall({
      url:  "/tac-farm-dashboard/" + tacCode + "/to-csv",
      method: "get",
      params: data
    });
  };

  export const initPage = (tacCode:string) => {
    const data = {};
    return apiCall({
      url: "/tac-farm-dashboard/" + tacCode + '/init',
      method: "get"
    });
  };

export const buildQueryRequest = (initResult:ReportInit.InitResult) => {
  const result:QueryRequest = new QueryRequestInstance();

    return result;
}

export const buildValidationSchema = () => {

//endset
    const validationSchema  = Yup.object().shape({

      });
//endset

    return validationSchema;
}

export interface QueryResultItem {
    fieldOnePlantListLinkLandCode: string;
    conditionalBtnExampleLinkLandCode: string;
    isConditionalBtnAvailable: boolean;
    testFileDownloadLinkPacCode: string;
    testConditionalFileDownloadLinkPacCode: string;
    testAsyncFlowReqLinkPacCode: string;
    testConditionalAsyncFlowReqLinkPacCode: string;
}

export interface QueryRequest {

    pageNumber: number;
    ItemCountPerPage: number;
    OrderByColumnName: string;
    OrderByDescending: boolean;
    ForceErrorMessage: string;
}

export interface ResponseFull {
  data: QueryResult;
}
export interface QueryResult {
    pageNumber: number;
    items: QueryResultItem[];
    itemCountPerPage: number;
    orderByColumnName: string;
    orderByDescending: boolean;
    success: boolean;
    recordsTotal: number;
    recordsFiltered: number;
    message: string;
    appVersion: string;
    request: string;
}

export class QueryResultItemInstance implements QueryResultItem {
    fieldOnePlantListLinkLandCode: string;
    conditionalBtnExampleLinkLandCode: string;
    isConditionalBtnAvailable: boolean;
    testFileDownloadLinkPacCode: string;
    testConditionalFileDownloadLinkPacCode: string;
    testAsyncFlowReqLinkPacCode: string;
    testConditionalAsyncFlowReqLinkPacCode: string;
    constructor() {
        this.fieldOnePlantListLinkLandCode = '00000000-0000-0000-0000-000000000000';
        this.conditionalBtnExampleLinkLandCode = '00000000-0000-0000-0000-000000000000';
        this.isConditionalBtnAvailable = false;
        this.testFileDownloadLinkPacCode = '00000000-0000-0000-0000-000000000000';
        this.testConditionalFileDownloadLinkPacCode = '00000000-0000-0000-0000-000000000000';
        this.testAsyncFlowReqLinkPacCode = '00000000-0000-0000-0000-000000000000';
        this.testConditionalAsyncFlowReqLinkPacCode = '00000000-0000-0000-0000-000000000000';
    }
}

export class QueryRequestInstance implements QueryRequest {

    pageNumber: number;
    ItemCountPerPage: number;
    OrderByColumnName: string;
    OrderByDescending: boolean;
    ForceErrorMessage: string;

    constructor() {

        this.pageNumber = 1;
        this.ItemCountPerPage = 10;
        this.OrderByColumnName = '';
        this.OrderByDescending = false;
        this.ForceErrorMessage = '';
    }
}

export class QueryResultInstance implements QueryResult {
    pageNumber: number;
    items: QueryResultItem[];
    itemCountPerPage: number;
    orderByColumnName: string;
    orderByDescending: boolean;
    success: boolean;
    recordsTotal: number;
    recordsFiltered: number;
    message: string;
    appVersion: string;
    request: string;

    constructor() {
        this.pageNumber = 1;
        this.items = [];
        this.itemCountPerPage = 10;
        this.orderByColumnName = '';
        this.orderByDescending = false;
        this.success = false;
        this.recordsTotal = 0;
        this.recordsFiltered = 0;
        this.message = '';
        this.appVersion = '';
        this.request = '';
    }
}

export class QueryResultTestInstance implements QueryResult {
    pageNumber: number;
    items: QueryResultItem[];
    itemCountPerPage: number;
    orderByColumnName: string;
    orderByDescending: boolean;
    success: boolean;
    recordsTotal: number;
    recordsFiltered: number;
    message: string;
    appVersion: string;
    request: string;

    constructor() {
        this.pageNumber = 1;
        this.items = [];
        this.itemCountPerPage = 10;
        this.orderByColumnName = '';
        this.orderByDescending = false;
        this.success = false;
        this.recordsTotal = 0;
        this.recordsFiltered = 0;
        this.message = '';
        this.appVersion = '';
        this.request = '';

        this.items.push(new QueryResultItemInstance())
    }
}

export interface EnhancedQueryResultItem extends QueryResultItem {
  rowKey: string;
  rowNumber: number;
}

