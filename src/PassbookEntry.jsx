import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  ProgressBar,
  Badge,
  Alert,
} from "react-bootstrap";

function PassbookEntry() {
  const { rid } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // CONSTANTS
  // =====================================================

  const INTEREST_RATE = 14;
  const TOTAL_MONTHS = 12;

  // Fine per late day
  const FINE_PER_DAY = 50;

  // =====================================================
  // STATES
  // =====================================================

  const [passbookEntries, setPassbookEntries] = useState([]);
  const [rdUser, setRdUser] = useState(null);

  // Payment date
  const [rddate, setRddate] = useState("");

  // Scheduled installment due date
  const [dueDate, setDueDate] = useState("");

  // RD amount
  const [rdamt, setRdamt] = useState("");

  // Fine calculation
  const [lateDays, setLateDays] = useState(0);
  const [fineAmount, setFineAmount] = useState(0);

  const [showForm, setShowForm] = useState(false);

  // =====================================================
  // GET RD USER
  // =====================================================

  const getRdUser = () => {
    axios
      .get("http://localhost:8080/FindById/" + rid)
      .then((res) => {
        console.log("RD User:", res.data);
        setRdUser(res.data);
      })
      .catch((error) => {
        console.error("RD User Error:", error);
        setRdUser(null);
      });
  };

  // =====================================================
  // GET PASSBOOK ENTRIES
  // =====================================================

  const getPassbookEntries = () => {
    console.log("Getting passbook entries for RID:", rid);

    axios
      .get("http://localhost:8080/getPassbookByid/" + rid)
      .then((res) => {
        console.log("Passbook entries:", res.data);

        if (Array.isArray(res.data)) {
          setPassbookEntries(res.data);
        } else {
          setPassbookEntries([]);
        }
      })
      .catch((error) => {
        console.error("Get passbook error:", error);
        setPassbookEntries([]);
      });
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    if (rid) {
      getRdUser();
      getPassbookEntries();
    }
  }, [rid]);

  // =====================================================
  // CALCULATE FINE
  // =====================================================

  const calculateFine = (due, payment) => {
    if (!due || !payment) {
      setLateDays(0);
      setFineAmount(0);
      return;
    }

    const dueParts = due.split("-");
    const paymentParts = payment.split("-");

    const dueDateObj = new Date(
      Number(dueParts[0]),
      Number(dueParts[1]) - 1,
      Number(dueParts[2]),
    );

    const paymentDateObj = new Date(
      Number(paymentParts[0]),
      Number(paymentParts[1]) - 1,
      Number(paymentParts[2]),
    );

    const difference =
      (paymentDateObj.getTime() - dueDateObj.getTime()) / (1000 * 60 * 60 * 24);

    const days = Math.max(0, Math.floor(difference));

    setLateDays(days);
    setFineAmount(days * FINE_PER_DAY);
  };

  // =====================================================
  // INSERT PASSBOOK ENTRY
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dueDate) {
      alert("Please select Due Date");
      return;
    }

    if (!rddate) {
      alert("Please select Payment Date");
      return;
    }

    if (!rdamt || Number(rdamt) <= 0) {
      alert("Please enter RD Amount");
      return;
    }

    const passbookData = {
      rid: Number(rid),
      dueDate: dueDate,
      rddate: rddate,
      rdamt: Number(rdamt),
    };

    console.log("Sending Passbook:", passbookData);

    axios
      .post("http://localhost:8080/InsertPassbook", passbookData)
      .then((res) => {
        console.log("Passbook inserted:", res.data);

        alert("Passbook entry added successfully!");

        setDueDate("");
        setRddate("");
        setRdamt("");
        setLateDays(0);
        setFineAmount(0);

        setShowForm(false);

        getPassbookEntries();
      })
      .catch((error) => {
        console.error("Insert passbook error:", error);

        let message = "Passbook entry failed";

        if (error.response?.data) {
          if (typeof error.response.data === "string") {
            message = error.response.data;
          } else if (error.response.data.message) {
            message = error.response.data.message;
          }
        }

        alert(message);
      });
  };

  // =====================================================
  // TOTAL ENTRIES
  // =====================================================

  const totalEntries = passbookEntries.length;

  // =====================================================
  // MONTHLY RD AMOUNT
  // =====================================================

  const monthlyAmount =
    passbookEntries.length > 0
      ? Number(passbookEntries[0].rdamt || 0)
      : Number(rdUser?.rdamt || 0);

  // =====================================================
  // TOTAL AMOUNT TO PAY
  // =====================================================

  const totalAmountToPay = monthlyAmount * TOTAL_MONTHS;

  // =====================================================
  // TOTAL PAID RD AMOUNT
  // =====================================================

  const totalPaidAmount = passbookEntries.reduce(
    (total, entry) => total + Number(entry.rdamt || 0),
    0,
  );

  // =====================================================
  // TOTAL FINE
  // =====================================================

  const totalFineAmount = passbookEntries.reduce(
    (total, entry) => total + Number(entry.famt || 0),
    0,
  );

  // =====================================================
  // TOTAL MONEY PAID
  // =====================================================

  const totalMoneyPaid = totalPaidAmount + totalFineAmount;

  // =====================================================
  // CURRENT YEAR INSTALLMENTS
  // =====================================================

  const currentYearEntries = passbookEntries.filter(
    (entry) => Number(entry.flg || 0) === 0,
  );

  const installmentsPaid = Math.min(currentYearEntries.length, TOTAL_MONTHS);

  const remainingInstallments = Math.max(0, TOTAL_MONTHS - installmentsPaid);

  // =====================================================
  // REMAINING AMOUNT
  // =====================================================

  const remainingAmount = Math.max(0, totalAmountToPay - totalPaidAmount);

  // =====================================================
  // TOTAL INTEREST
  // =====================================================

  const totalInterest =
    (monthlyAmount * TOTAL_MONTHS * (TOTAL_MONTHS + 1) * INTEREST_RATE) /
    (2 * 12 * 100);

  // =====================================================
  // TOTAL MATURITY AMOUNT
  // =====================================================

  const totalMaturityAmount = totalAmountToPay + totalInterest;

  // =====================================================
  // CURRENT INTEREST
  // =====================================================

  const currentInterest =
    (monthlyAmount *
      installmentsPaid *
      (installmentsPaid + 1) *
      INTEREST_RATE) /
    (2 * 12 * 100);

  // =====================================================
  // CURRENT MATURITY
  // =====================================================

  const currentMaturityAmount = totalPaidAmount + currentInterest;

  // =====================================================
  // PAYMENT PROGRESS
  // =====================================================

  const paymentProgress =
    TOTAL_MONTHS > 0
      ? Math.min(100, (installmentsPaid / TOTAL_MONTHS) * 100)
      : 0;

  // =====================================================
  // NEXT RD DATE
  // =====================================================

  const getNextRDDate = () => {
    if (!rdUser?.rddate) {
      return null;
    }

    const startDate = new Date(rdUser.rddate + "T00:00:00");

    // Find latest due date already paid
    if (passbookEntries.length > 0) {
      const sortedEntries = [...passbookEntries].sort((a, b) => {
        const dateA = new Date((a.dueDate || a.rddate) + "T00:00:00");

        const dateB = new Date((b.dueDate || b.rddate) + "T00:00:00");

        return dateB - dateA;
      });

      const latestDueDate = sortedEntries[0].dueDate || sortedEntries[0].rddate;

      if (latestDueDate) {
        const latestDate = new Date(latestDueDate + "T00:00:00");

        return new Date(
          latestDate.getFullYear(),
          latestDate.getMonth() + 1,
          latestDate.getDate(),
        );
      }
    }

    // First installment
    return startDate;
  };

  const nextRDDate = getNextRDDate();

  const formattedNextRDDate = nextRDDate
    ? nextRDDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  // =====================================================
  // MONEY FORMAT
  // =====================================================

  const money = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setDueDate("");
    setRddate("");
    setRdamt(monthlyAmount > 0 ? monthlyAmount : "");

    setLateDays(0);
    setFineAmount(0);

    setShowForm(true);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      {/* =================================================
          HEADER
      ================================================= */}

      <Row className="mb-3 align-items-center">
        <Col>
          <h3 className="fw-semibold mb-1">RD Passbook</h3>

          <div className="text-muted small">
            Manage and view passbook payment entries
          </div>
        </Col>

        <Col xs="auto">
          <Button
            variant="secondary"
            size="sm"
            className="me-2"
            onClick={() => navigate("/rduser")}
          >
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={openAddForm}
            className="px-3"
          >
            + Add Entry
          </Button>
        </Col>
      </Row>

      {/* =================================================
          RD USER INFORMATION
      ================================================= */}

      <Card className="border-0 shadow-sm mb-3">
        <Card.Body className="py-3">
          <Row className="g-3">
            <Col md={2}>
              <div className="text-muted small">RD User ID</div>

              <div className="fw-semibold">{rid}</div>
            </Col>

            <Col md={3}>
              <div className="text-muted small">Name</div>

              <div className="fw-semibold">{rdUser?.name || "-"}</div>
            </Col>

            <Col md={2}>
              <div className="text-muted small">Monthly RD</div>

              <div className="fw-semibold">{money(monthlyAmount)}</div>
            </Col>

            <Col md={2}>
              <div className="text-muted small">Total Entries</div>

              <div className="fw-semibold">{totalEntries}</div>
            </Col>

            <Col md={3}>
              <div className="text-muted small">Next RD Date</div>

              <div className="fw-semibold">{formattedNextRDDate}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <Row className="g-2 mb-3">
        <Col xl={2} lg={3} md={4} sm={6}>
          <Card className="border-0 shadow-sm h-100 summary-card">
            <Card.Body>
              <div className="summary-title">Total Amount to Pay</div>

              <div className="summary-value">{money(totalAmountToPay)}</div>

              <div className="summary-subtitle">{TOTAL_MONTHS} months</div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={2} lg={3} md={4} sm={6}>
          <Card className="border-0 shadow-sm h-100 summary-card">
            <Card.Body>
              <div className="summary-title">Total Paid</div>

              <div className="summary-value">{money(totalPaidAmount)}</div>

              <div className="summary-subtitle">
                {installmentsPaid} installments
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={2} lg={3} md={4} sm={6}>
          <Card className="border-0 shadow-sm h-100 summary-card">
            <Card.Body>
              <div className="summary-title">Remaining Amount</div>

              <div className="summary-value">{money(remainingAmount)}</div>

              <div className="summary-subtitle">
                {remainingInstallments} installments
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={2} lg={3} md={4} sm={6}>
          <Card className="border-0 shadow-sm h-100 summary-card">
            <Card.Body>
              <div className="summary-title">Total Fine</div>

              <div className="summary-value">{money(totalFineAmount)}</div>

              <div className="summary-subtitle">
                ₹{FINE_PER_DAY}/day late fine
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={2} lg={3} md={4} sm={6}>
          <Card className="border-0 shadow-sm h-100 summary-card">
            <Card.Body>
              <div className="summary-title">Maturity Amount</div>

              <div className="summary-value">{money(totalMaturityAmount)}</div>

              <div className="summary-subtitle">
                @ {INTEREST_RATE}% interest
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={2} lg={3} md={4} sm={6}>
          <Card className="border-0 shadow-sm h-100 summary-card">
            <Card.Body>
              <div className="summary-title">Current Maturity</div>

              <div className="summary-value">
                {money(currentMaturityAmount)}
              </div>

              <div className="summary-subtitle">Current value</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* =================================================
          PAYMENT PROGRESS
      ================================================= */}

      <Card className="border-0 shadow-sm mb-3">
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <div className="fw-semibold small">RD Payment Progress</div>

              <div className="text-muted small">
                {installmentsPaid} of {TOTAL_MONTHS} installments paid
              </div>
            </div>

            <Badge bg="success">{Math.round(paymentProgress)}%</Badge>
          </div>

          <ProgressBar
            now={paymentProgress}
            variant="success"
            style={{
              height: "8px",
            }}
          />
        </Card.Body>
      </Card>

      {/* =================================================
          PAYMENT ENTRIES
      ================================================= */}

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">Payment Entries</div>

              <div className="text-muted small">
                Manage all passbook payment records
              </div>
            </div>

            <Badge bg="primary">Total Entries: {totalEntries}</Badge>
          </div>
        </Card.Header>

        <Card.Body className="p-0">
          {passbookEntries.length === 0 ? (
            <Alert variant="light" className="m-3 text-center">
              No passbook entries found.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover responsive className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">Installment</th>

                    <th>Year</th>

                    <th>RD User ID</th>

                    <th>Due Date</th>

                    <th>Payment Date</th>

                    <th>RD Amount</th>

                    <th>Late Days</th>

                    <th>Fine Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {passbookEntries.map((entry, index) => (
                    <tr key={entry.pid || index}>
                      <td className="ps-3">
                        <Badge bg="primary">{entry.installmentNo || "-"}</Badge>
                      </td>

                      <td>
                        <Badge bg="secondary">
                          {Number(entry.flg || 0) + 1}
                        </Badge>
                      </td>

                      <td>{entry.rid || rid}</td>

                      <td>{formatDate(entry.dueDate)}</td>

                      <td>{formatDate(entry.rddate)}</td>

                      <td className="fw-semibold">{money(entry.rdamt)}</td>

                      <td>{entry.lday || 0}</td>

                      <td>{money(entry.famt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* =================================================
          ADD PASSBOOK ENTRY MODAL
      ================================================= */}

      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        centered
        size="sm"
        backdrop="static"
      >
        <Modal.Header closeButton className="py-2">
          <Modal.Title className="fs-6 fw-semibold">
            Add Passbook Entry
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-3">
            {/* DUE DATE */}

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Due Date</Form.Label>

              <Form.Control
                type="date"
                size="sm"
                value={dueDate}
                onChange={(e) => {
                  const value = e.target.value;

                  setDueDate(value);

                  calculateFine(value, rddate);
                }}
                required
              />

              <Form.Text className="text-muted">
                Select the installment's scheduled due date.
              </Form.Text>
            </Form.Group>

            {/* PAYMENT DATE */}

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">
                Payment Date
              </Form.Label>

              <Form.Control
                type="date"
                size="sm"
                value={rddate}
                onChange={(e) => {
                  const value = e.target.value;

                  setRddate(value);

                  calculateFine(dueDate, value);
                }}
                required
              />

              <Form.Text className="text-muted">
                Actual date on which the installment was paid.
              </Form.Text>
            </Form.Group>

            {/* RD AMOUNT */}

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">RD Amount</Form.Label>

              <Form.Control
                type="number"
                size="sm"
                min="1"
                value={rdamt}
                onChange={(e) => setRdamt(e.target.value)}
                placeholder="Enter RD amount"
                required
              />
            </Form.Group>
            {/* EXACT FINE AMOUNT */}

            <div className="border rounded p-2 mt-2 bg-light">
              <div className="d-flex justify-content-between">
                <span className="small text-muted">Late Days</span>

                <span className="fw-semibold">{lateDays} days</span>
              </div>

              <div className="d-flex justify-content-between mt-1">
                <span className="small text-muted">Fine Amount</span>

                <span className="fw-bold text-danger">{money(fineAmount)}</span>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="py-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>

            <Button variant="success" size="sm" type="submit">
              Save Entry
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default PassbookEntry;
