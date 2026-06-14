import { useState, type FC } from "react";
import { Slot, Outlet } from "react-slotx";
import {
  Badge,
  Card,
  Col,
  ListGroup,
  Row,
  Stack,
  Table,
  Form,
  Button,
} from "react-bootstrap";

const HeaderOutlet: FC<any> = ({ name }) => {
  return (
    <Table size="sm" bordered>
      <tbody>
        <tr>
          <td style={{ width: 120 }}>
            <b>PRIORITY</b>
          </td>
          <td>
            <Outlet name={name} mode="priority" />
          </td>
        </tr>
        <tr>
          <td>
            <b>FIRST</b>
          </td>
          <td>
            <Outlet name={name} mode="first" />
          </td>
        </tr>
        <tr>
          <td>
            <b>LAST</b>
          </td>
          <td>
            <Outlet name={name} mode="last" />
          </td>
        </tr>
        <tr>
          <td>
            <b>ALL</b>
          </td>
          <td>
            <Outlet name={name} mode="all" />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const ListItemSlot = ({
  name = "head",
  title = "Content!",
  priority = 1,
}) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(title);
  return (
    <ListGroup.Item>
      <Stack direction="horizontal" gap={3} className="align-items-center">
        <div style={{ minWidth: 80, fontWeight: 700 }}>{name}</div>
        <Form.Control
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ maxWidth: 240 }}
        />
        <Button size="sm" variant="outline-primary" onClick={() => setShow(!show)}>
          {show ? "hide" : "show"}
        </Button>
        <div style={{ marginLeft: "auto" }}>
          {show ? (
            <Slot name={name} priority={priority} dangerouslyEnableRender>
              <Badge bg={name === "head" ? "primary" : "danger"} className="mx-1">{value}</Badge>
            </Slot>
          ) : (
            <span style={{ color: "#666" }}>hidden</span>
          )}
        </div>
      </Stack>
    </ListGroup.Item>
  );
};

const ContentSlot: FC<any> = ({ name }) => {
  return (
    <ListGroup variant="flush">
      <ListItemSlot name={name} title="Title 1" priority={2} />
      <ListItemSlot name={name} title="Title 2" priority={3} />
      <ListItemSlot name={name} title="Title 3" priority={4} />
    </ListGroup>
  );
};

const CardExample: FC<any> = ({ name = "head" }) => {
  return (
    <Col md={4} className="mb-3">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>SLOT {name}</div>
          <Badge bg={name === "head" ? "primary" : "danger"}>{name}</Badge>
        </Card.Header>
        <Card.Body>
          <HeaderOutlet name={name} />
        </Card.Body>
        <Card.Body>
          <ContentSlot name={name} />
        </Card.Body>
      </Card>
    </Col>
  );
};
export const Example: FC<any> = () => {
  return (
    <Row>
      <CardExample name="head" />
      <CardExample name="script" />
      <CardExample name="other" />
    </Row>
  );
};
