import { useState } from "react";
import { Meta, SoeOutlet, Title } from "../../lib/src";

export const Header = () => {
  return (
    <header>
      <p>HEADER</p>
      <SoeOutlet />
    </header>
  );
};

const PreContent = ({title="HOLA PreContent !"}) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      PreContent
      
      <button onClick={e=>setShow(!show)}>OK {show? 'TRUE': 'FALSE'} - {title}</button>
      {show && <Title value={title} />}
      
    </div>
  );
};

const PostContent = () => {
  return (
    <main>
      PostContent
      <Title value="HOLA!!!!!!!!!!!!!!!" />
    </main>
  );
};

export const Content = () => {
  const [value, setValue] = useState("");
  return (
    <main>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {value}
      <Meta property="seo:xxxx" content={value} />
      <PreContent />
      <p>CONTENT</p>
      <PostContent />
      <PreContent title="XXX1"/>
      <PreContent title="OOOOOOOO1"/>
    </main>
  );
};
