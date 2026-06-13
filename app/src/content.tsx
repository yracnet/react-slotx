import { useState } from "react";
import { Slot, Outlet } from "../../lib/src";

export const Header = () => {
  return (
    <div>
      <p>HEADER</p>
      <Outlet name="head" />
      <p>SCRIPT</p>
      <Outlet name="script" />
    </div>
  );
};

const AttachSlot = ({
  name = "head",
  title = "HOLA PreContent !",
  priority = 1,
}) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(title);
  return (
    <table>
      <tr>
        <th colSpan={3}>{name}</th>
      </tr>
      <tr>
        <td>Title:</td>
        <td>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </td>
        <td>
          <button onClick={() => setShow(!show)}>
            {show ? "Ocultar" : "Mostrar"}
          </button>
        </td>
        <td>
          {show ? (
            <Slot name={name} priority={priority}>
              <b>
                {name} - {value}
              </b>
            </Slot>
          ) : (
            "HIDEN"
          )}
        </td>
      </tr>
    </table>
  );
};

export const Content = () => {
  return (
    <main>
      <p>HEAD</p>
      <AttachSlot name="head" title="Title 1" priority={2} />
      <AttachSlot name="head" title="Title 2" priority={3} />
      <p>SCRIPT</p>
      <AttachSlot name="script" title="Script 1" priority={2} />
      <AttachSlot name="script" title="Script 2" priority={3} />
    </main>
  );
};
