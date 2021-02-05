import * as React from "react";
import { List, Datagrid, TextField, NumberField, DateField, SelectField } from "react-admin";
import { DesenvolvedoresFilter } from "./DesenvolvedoresFilter";

export const DesenvolvedoresList = (props) => (
    <List
        {...props}
        title="CRUD Desenvolvedores"
        bulkActionButtons={false}
        filters={<DesenvolvedoresFilter />}
    >
        <Datagrid rowClick="edit">
            <NumberField source="id" sortable={false} />
            <TextField source="nome" sortable={false} />
            <SelectField
                source="sexo"
                sortable={false}
                choices={[
                    { id: "M", name: "Masculino" },
                    { id: "F", name: "Feminino" },
                ]}
            />
            <NumberField source="idade" sortable={false} />
            <TextField source="hobby" sortable={false} />
            <DateField
                source="datanascimento"
                sortable={false}
                label="Data de Nascimento"
                locales="en-GB"
            />
        </Datagrid>
    </List>
);
