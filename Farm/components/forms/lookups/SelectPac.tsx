import React, { FC, ReactElement, useState,useEffect } from "react";

import * as PacUserPacListService from "../../lookups/services/Pac";
import {useField } from 'formik';
import { FormInputSelect,FormInputSelectOption } from "../input-fields/InputSelect";

export interface FormSelectPacProps {
    name: string
    label: string
    placeholder?: string
    autoFocus?:boolean
    disabled?: boolean
    isVisible?:boolean
  }

export const FormSelectPac: FC<FormSelectPacProps> = ({
    name,
    label,
    placeholder,
    autoFocus = false,
    disabled = false,
    isVisible = true,
  }): ReactElement => {
    const [field, meta, helpers] = useField(name);

    const [pacs, setPacs] = useState<FormInputSelectOption[]>([])

    const initList = (response:any) => {

        if(response &&
            response.data &&
            response.data.items )
        {
            const data:PacUserPacListService.QueryResult = response.data;
            const pacs = data.items.map(({ pacCode, pacName }) => ({ label: pacName, value:pacCode }));

            setPacs(pacs);
        }
    }

    useEffect(() => {
        PacUserPacListService.submitRequest()
        .then((response) => initList(response));
    },[]);

    return (
        <FormInputSelect
            label={label}
            name={name}
            options={pacs}
            isVisible={isVisible}
            />

    );
};
export default FormSelectPac;

