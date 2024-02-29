import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InvoiceForm from "./InvoiceForm";
import { Link } from "react-router-dom";

const NewInvoice = () => {
  //use State
  const netOption = [
    "Net 0",
    "Net 5",
    "Net 10",
    "Net 15",
    "Net 30",
    "Net 60",
    "Net 90",
  ];
  const [isDraft, setIsDraft] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");
  // const [addClient, setAddClient] = useState(false);

  //Handlers
  const handletoggleDraft = () => {
    setIsDraft(!isDraft);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInvoiceDate(currentDate);
  }, []);

  return (
    <>
      <Container fluid className="mt-2">
        <Row>
          <Col>
            <Form>
              <Form.Check
                style={{ fontWeight: "500", color: "#1d1d5e" }}
                type="switch"
                id="custom-switch"
                label={isDraft ? "Draft Invoice" : "Invoice"}
                onChange={handletoggleDraft}
              />
            </Form>
          </Col>
          <Col className="d-flex justify-content-end">
            <div>
              <Link
                to="/Invoice"
                style={{
                  textDecoration: "none",
                  color: "#1d1d5e",
                  fontWeight: "500",
                }}
              >
                <Button className="btn-c">Close</Button>
              </Link>
              <Button className="ms-3 btn-save">
                {isDraft ? "Save Draft" : "Save"}
              </Button>
            </div>
          </Col>
        </Row>

        <h1
          className="d-flex justify-content-center fs-5 fw-bolder"
          style={{ color: "#1d1d5e" }}
        >
          {isDraft ? "DRAFT INVOICE" : "INVOICE"}
        </h1>

        <>
          <Row className="w-100">
            <Col className="col-4">
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "8px",
                  width: 300,
                  height: "auto",
                  borderRadius: 5,
                }}
              >
                <p>
                  <strong style={{ fontSize: 12 }}>Bill From:</strong> <br />
                  <strong style={{ fontSize: 14 }}>H&T HOLIDAYS</strong> <br />
                  <small style={{ fontSize: 12 }}>Tours & Travels</small> <br />
                  <small style={{ fontSize: 12 }}>
                    Building No.10 AlNahyan Camp
                  </small>
                  <br />
                  <small style={{ fontSize: 12 }}>
                    Near Executive Suites, Abu Dhabi
                  </small>
                  <br />
                  <small style={{ fontSize: 12 }}>
                    +971 502226710, +971 542796562
                  </small>
                  <br />
                  <small style={{ fontSize: 12 }}>+971 25634643</small>
                  <br />
                  <small style={{ fontSize: 12 }}>
                    Email : H&Tholidays@gmail.com
                  </small>
                  <br />
                  <small style={{ fontSize: 12 }}>
                    Website :{" "}
                    <a
                      target="blank"
                      href="http://www.handtholidays.ae/"
                      style={{ textDecoration: "none", color: "#1d1d5e" }}
                    >
                      www.htholidays.ae
                    </a>
                  </small>
                </p>
              </div>
            </Col>
            <Col className="col-4 d-flex justify-content-center">
              <Form.Group>
                <Form.Control
                  className="text-center rounded-0"
                  type="search"
                  placeholder="+ Add Client"
                  style={{ backgroundColor: "#dedef8", width: "250px" }}
                />
              </Form.Group>
            </Col>
            <Col className="col-4 d-flex justify-content-end">
              <p>
                {isDraft ? (
                  <strong>
                    Draft Number: <span>INV-DR/2024/001</span>
                  </strong>
                ) : (
                  <strong>
                    Invoice Number: <span>INV/2024/001</span>
                  </strong>
                )}
                <br />
                <small>Balance: ₹ </small>
              </p>
            </Col>
          </Row>
        </>

        <>
          <Row className="mt-2 mb-3">
            <Col className="col-7 d-flex justify-content-around">
              <Form.Group>
                <Form.Label style={{ fontSize: 14, fontWeight:"500" }}>Invoice Date</Form.Label>
                <Form.Control
                  className="inputfocus rounded-0"
                  style={{ height: "30px", fontSize: 14 }}
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontSize: 14, fontWeight:"500"  }}>Due Date</Form.Label>
                <Form.Control
                  className="inputfocus rounded-0"
                  style={{ height: "30px", fontSize: 14 }}
                  type="date"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontSize: 14, fontWeight:"500"  }}>Net *</Form.Label>
                <Form.Select
                  className="inputfocus rounded-0"
                  style={{ width: 175, height: "30px", fontSize: 14 }}
                >
                  {netOption.map((net, index) => (
                    <option key={index} style={{ fontSize: 12, height: 20 }}>
                      {net}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontSize: 14, fontWeight:"500"  }}>Sales Person</Form.Label>
                <Form.Select
                  className="inputfocus rounded-0"
                  style={{ height: "30px", fontSize: 14 }}
                >
                  <option disabled style={{ fontSize: 12 }}>
                    Select Sales Person
                  </option>
                  <option style={{ fontSize: 12 }}>Sales Person 1</option>
                  <option style={{ fontSize: 12 }}>Sales Person 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </>
      </Container>
      <InvoiceForm />
    </>
  );
};

export default NewInvoice;
