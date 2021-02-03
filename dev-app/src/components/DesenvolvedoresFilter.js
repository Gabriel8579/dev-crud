import * as React from "react";
import {
    DateInput,
    Filter,
    NumberInput,
    RadioButtonGroupInput,
    TextInput,
} from "react-admin";

export const DesenvolvedoresFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Procurar por nome" source="nome" alwaysOn />
        <TextInput source="hobby" allowEmpty />
        <NumberInput source="idade" allowEmpty />
        <RadioButtonGroupInput
            source="sexo"
            choices={[
                { id: "M", name: "Masculino" },
                { id: "F", name: "Femino" },
            ]}
            allowEmpty
        />
        <DateInput
            label="Data de Nascimento"
            source="datanascimento"
            allowEmpty
        />
    </Filter>
);
