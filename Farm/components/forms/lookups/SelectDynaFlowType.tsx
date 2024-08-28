import React, { FC, ReactElement, useState,useEffect } from "react";

import * as PacUserDynaFlowTypeListService from "../../lookups/services/DynaFlowType";
import {useField } from 'formik';
import { FormInputSelect,FormInputSelectOption } from "../input-fields/InputSelect";

export interface FormSelectDynaFlowTypeProps {
    name: string
    label: string
    placeholder?: string
    autoFocus?:boolean
    disabled?: boolean
    isVisible?:boolean
  }

export const FormSelectDynaFlowType: FC<FormSelectDynaFlowTypeProps> = ({
    name,
    label,
    placeholder,
    autoFocus = false,
    disabled = false,
    isVisible = true,
  }): ReactElement => {
    const [field, meta, helpers] = useField(name);

    const [dynaFlowTypes, setDynaFlowTypes] = useState<FormInputSelectOption[]>([])

    const initList = (response:any) => {

        if(response &&
            response.data &&
            response.data.items )
        {
            const data:PacUserDynaFlowTypeListService.QueryResult = response.data;
            const dynaFlowTypes = data.items.map(({ dynaFlowTypeCode, dynaFlowTypeName }) => ({ label: dynaFlowTypeName, value:dynaFlowTypeCode }));

            setDynaFlowTypes(dynaFlowTypes);
        }
    }

    useEffect(() => {
        PacUserDynaFlowTypeListService.submitRequest()
        .then((response) => initList(response));
    },[]);

    return (
        <FormInputSelect
            label={label}
            name={name}
            options={dynaFlowTypes}
            isVisible={isVisible}
            />

    );
};
export default FormSelectDynaFlowType;

