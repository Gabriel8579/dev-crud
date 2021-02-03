import * as React from "react";
import { Admin, Resource } from "react-admin";
import { DesenvolvedoresList } from "./components/DesenvolvedoresList";
import { DesenvolvedoresEdit } from "./components/DesenvolvedoresEdit";
import apiAdapter from "./helpers/apiAdapter";
import { DesenvolvedoresCreate } from "./components/DesenvolvedoresCreate";
import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';

const messages = {
  'pt-br': ptBrMessages,
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br');

const dataProvider = apiAdapter;
const App = () => (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource
            name="developers"
            list={DesenvolvedoresList}
            edit={DesenvolvedoresEdit}
            create={DesenvolvedoresCreate}
            options={{ label: "Desenvolvedores" }}
        />
    </Admin>
);

export default App;
