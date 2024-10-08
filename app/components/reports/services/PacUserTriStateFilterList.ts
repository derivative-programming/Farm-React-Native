/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from "yup";
import * as ReportInit  from "./init/PacUserTriStateFilterListInitReport";
import { apiCall } from "../../../apiConfig/apiCall";

export const submitRequest = (data:QueryRequest, pacCode:string) => {
    return apiCall({
      url:  "/pac-user-tri-state-filter-list/" + pacCode,
      method: "get",
      params: data
    });
  };

export const submitCSVRequest = (data:QueryRequest, pacCode:string) => {
  console.log('csv request');
    return apiCall({
      url:  "/pac-user-tri-state-filter-list/" + pacCode + "/to-csv",
      method: "get",
      params: data
    });
  };

  export const initPage = (pacCode:string) => {
    const data = {};
    return apiCall({
      url: "/pac-user-tri-state-filter-list/" + pacCode + '/init',
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
    triStateFilterCode: string;
    triStateFilterDescription: string;
    triStateFilterDisplayOrder: number;
    triStateFilterIsActive: boolean;
    triStateFilterLookupEnumName: string;
    triStateFilterName: string;
    triStateFilterStateIntValue: number;
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
    triStateFilterCode: string;
    triStateFilterDescription: string;
    triStateFilterDisplayOrder: number;
    triStateFilterIsActive: boolean;
    triStateFilterLookupEnumName: string;
    triStateFilterName: string;
    triStateFilterStateIntValue: number;
    constructor() {
//endset
        this.triStateFilterCode = '00000000-0000-0000-0000-000000000000';
        this.triStateFilterDescription = '';
        this.triStateFilterDisplayOrder = 0;
        this.triStateFilterIsActive = false;
        this.triStateFilterLookupEnumName = '';
        this.triStateFilterName = '';
        this.triStateFilterStateIntValue = 0;
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

