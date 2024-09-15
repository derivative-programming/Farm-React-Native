import React, { FC, ReactElement, useState,useEffect } from "react";

import * as PacUserDynaFlowTaskTypeListService from "../../lookups/services/DynaFlowTaskType";
import {useField } from 'formik';
import { FormInputSelect,FormInputSelectOption } from "../input-fields/InputSelect";

export interface FormSelectDynaFlowTaskTypeProps {
    name: string
    label: string
    placeholder?: string
    autoFocus?:boolean
    disabled?: boolean
    isVisible?:boolean
    isRequired?: boolean;
    detailText?: string;
  }

export const FormSelectDynaFlowTaskType: FC<FormSelectDynaFlowTaskTypeProps> = ({
    name,
    label,
    placeholder,
    autoFocus = false,
    disabled = false,
    isVisible = true,
    isRequired = false,
    detailText = '',
  }): ReactElement => {
    const [field, meta, helpers] = useField(name);

    const [dynaFlowTaskTypes, setDynaFlowTaskTypes] = useState<FormInputSelectOption[]>([])

    const initList = (response:any) => {

        if(response &&
            response.data &&
            response.data.items )
        {
            const data:PacUserDynaFlowTaskTypeListService.QueryResult = response.data;
            const dynaFlowTaskTypes = data.items.map(({ dynaFlowTaskTypeCode, dynaFlowTaskTypeName }) => ({ label: dynaFlowTaskTypeName, value:dynaFlowTaskTypeCode }));

            setDynaFlowTaskTypes(dynaFlowTaskTypes);
        }
    }

    useEffect(() => {
        PacUserDynaFlowTaskTypeListService.submitRequest()
        .then((response) => initList(response));
    },[]);

    return (
        <FormInputSelect
            label={label}
            name={name}
            options={dynaFlowTaskTypes}
            isVisible={isVisible}
            isRequired={isRequired}
            detailText={detailText}
            />

    );
};
export default FormSelectDynaFlowTaskType;

