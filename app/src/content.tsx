import { useState } from "react";
import { Slot, Outlet } from "../../lib/src";

export const Header = () => {
  return (
    <table border={1}>
      <tr>
        <td>GROUP</td>
        <td>mode=priority</td>
        <td>mode=first</td>
        <td>mode=last</td>
        <td>mode=all</td>
      </tr>
      <tr>
        <td>HEADER</td>
        <td>
          <Outlet name="head" mode="priority" />
        </td>
        <td>
          <Outlet name="head" mode="first" />
        </td>
        <td>
          <Outlet name="head" mode="last" />
        </td>
        <td>
          <Outlet name="head" mode="all" />
        </td>
      </tr>
      <tr>
        <td>SCRIPT</td>
        <td>
          <Outlet name="script" mode="priority" />
        </td>
        <td>
          <Outlet name="script" mode="first" />
        </td>
        <td>
          <Outlet name="script" mode="last" />
        </td>
        <td>
          <Outlet name="script" mode="all" />
        </td>
      </tr>
    </table>
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
                {value}
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
      <AttachSlot name="head" title="Title 3" priority={4} />
      <p>SCRIPT</p>
      <AttachSlot name="script" title="Script 1" priority={2} />
      <AttachSlot name="script" title="Script 2" priority={3} />
      <AttachSlot name="script" title="Script 3" priority={4} />
    </main>
  );
};
