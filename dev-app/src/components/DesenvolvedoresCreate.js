import * as React from "react";
import {
    SimpleForm,
    Create,
    TextInput,
    NumberInput,
    DateInput,
    RadioButtonGroupInput,
} from "react-admin";

export const DesenvolvedoresCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="nome" />
            <RadioButtonGroupInput
                source="sexo"
                choices={[
                    { id: "M", name: "Masculino" },
                    { id: "F", name: "Feminino" },
                ]}
            />
            <NumberInput source="idade" />
            <TextInput source="hobby" />
            <DateInput
                source="datanascimento"
                label="Data de Nascimento"
                locales="en-GB"
            />
        </SimpleForm>
    </Create>
);
