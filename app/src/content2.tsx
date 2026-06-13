import { useState } from "react";
import { Headlet, Meta, SoeOutlet, Title } from "../../lib/src";

export const Header = () => {
  return (
    <header>
      <p>HEADER</p>
      <SoeOutlet />
    </header>
  );
};

const PreContent = ({ title = "HOLA PreContent !", priority = 1 }) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      PreContent
      <button onClick={(e) => setShow(!show)}>
        OK {show ? "TRUE" : "FALSE"} - {title}
      </button>
      {show && (
        <Headlet name="pre-content" priority={priority}>
          <title>{title}</title>
        </Headlet>
      )}
    </div>
  );
};

export const Content = () => {
  const [value, setValue] = useState("");
  return (
    <main>
      <h1>CONTET!!</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {value}
      <Headlet name="content">
        <title>My Name Is</title>
        <meta property="seo:xxxx" content={value} />
      </Headlet>
      <p>CONTENT</p>
      <PreContent title="Title 1" priority={2} />
      <PreContent title="Title 2" priority={3} />
      <PreContent title="Title 3" priority={4} />
    </main>
  );
};
