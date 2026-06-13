import { SoeClient, SoeProvider } from "../../lib/src";
import { Content, Header } from "./content";


const client = new SoeClient();

export const Main = () => {
  return (
    <SoeProvider client={client}>
      <div>
        <Header />
        <Content />
      </div>
    </SoeProvider>
  );
};
