import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Rduser() {
  const navigate = useNavigate();

  // =========================
  // AUTH CONTEXT
  // =========================
  const { logoutAdmin } = useContext(AuthContext);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login");
  };

  // =========================
  // RD USER TABLE DATA
  // =========================
  const [rdata, setRdata] = useState([]);

  // =========================
  // SEARCH
  // =========================
  const [searchText, setSearchText] = useState("");

  // =========================
  // PAGINATION
  // =========================
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  // =========================
  // MODAL
  // =========================
  const [show, setShow] = useState(false);

  // =========================
  // EDIT ID
  // =========================
  const [editId, setEditId] = useState(null);

  // =========================
  // RD USER FORM FIELDS
  // =========================
  const [name, setName] = useState("");
  const [occuption, setOccuption] = useState("");
  const [acno, setAcno] = useState("");
  const [address, setAddress] = useState("");
  const [adharno, setAdharno] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [panno, setPanno] = useState("");
  const [rdamt, setRdamt] = useState("");
  const [rddate, setRddate] = useState("");
  const [nname, setNname] = useState("");
  const [nadharno, setNadharno] = useState("");
  const [npanno, setNpanno] = useState("");
  const [naddr, setNaddr] = useState("");

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {
    setName("");
    setOccuption("");
    setAcno("");
    setAddress("");
    setAdharno("");
    setDob("");
    setGender("");
    setPanno("");
    setRdamt("");
    setRddate("");
    setNname("");
    setNadharno("");
    setNpanno("");
    setNaddr("");
  };

  // =========================
  // OPEN ADD MODAL
  // =========================
  const handleShow = () => {
    clearForm();
    setEditId(null);
    setShow(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const handleClose = () => {
    setShow(false);
    setEditId(null);
    clearForm();
  };

  // =========================
  // GET ALL RD USERS
  // =========================
  const getRdUsers = () => {
    axios
      .get("http://localhost:8080/getAllrdusers")
      .then((res) => {
        console.log("RD Users:", res.data);

        setRdata(res.data);

        // Go to first page after refresh
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error fetching RD users:", error);
      });
  };

  // =========================
  // LOAD DATA WHEN PAGE OPENS
  // =========================
  useEffect(() => {
    getRdUsers();
  }, []);

  // =========================
  // INSERT RD USER
  // =========================
  const insertRdUser = () => {
    const rdUser = {
      name: name,
      occuption: occuption,
      acno: acno,
      address: address,
      adharno: adharno,
      dob: dob,
      gender: gender,
      panno: panno,
      rdamt: rdamt,
      rddate: rddate,
      nname: nname,
      nadharno: nadharno,
      npanno: npanno,
      naddr: naddr,
    };

    console.log("Sending RD User:", rdUser);

    axios
      .post("http://localhost:8080/InsertRDuser", rdUser)
      .then((res) => {
        console.log("RD User inserted:", res.data);

        alert("RD User added successfully!");

        handleClose();

        getRdUsers();
      })
      .catch((error) => {
        console.error("Insert RD User Error:", error);

        if (error.response) {
          console.log("Backend response:", error.response.data);

          alert(
            "Failed to add RD User: " +
              (error.response.data?.message || "Server error"),
          );
        } else {
          alert("Failed to add RD User");
        }
      });
  };

  // =========================
  // DELETE RD USER
  // =========================
  const handleDelete = (id) => {
    console.log("ID received:", id);

    if (!window.confirm("Are you sure you want to delete this RD User?")) {
      return;
    }

    axios
      .delete("http://localhost:8080/DeleteById/" + id)
      .then((res) => {
        console.log("Delete response:", res.data);

        alert("RD User deleted successfully");

        getRdUsers();
      })
      .catch((error) => {
        console.error("Delete error:", error);
        console.error("Status:", error.response?.status);
        console.error("Response:", error.response?.data);

        alert("Failed to delete RD User");
      });
  };

  // =========================
  // EDIT RD USER
  // =========================
  const handleUpdate = (data) => {
    console.log("Selected RD User:", data);

    setEditId(data.rid);
    setName(data.name || "");
    setOccuption(data.occupation || "");
    setAcno(data.acno || "");
    setAddress(data.address || "");
    setAdharno(data.adharno || "");
    setDob(data.dob || "");
    setGender(data.gender || "");
    setPanno(data.panno || "");
    setRdamt(data.rdamt || "");
    setRddate(data.rddate || "");
    setNname(data.nname || "");
    setNadharno(data.nadharno || "");
    setNpanno(data.npanno || "");
    setNaddr(data.naddr || "");

    setShow(true);
  };

  // =========================
  // UPDATE RD USER
  // =========================
  const updateRdUser = () => {
    const updatedData = {
      name,
      occuption,
      acno,
      address,
      adharno,
      dob,
      gender,
      panno,
      rdamt: Number(rdamt),
      rddate,
      nname,
      nadharno,
      npanno,
      naddr,
    };

    console.log("========== UPDATE ==========");
    console.log("EDIT ID:", editId);
    console.log("DATA:", updatedData);

    axios
      .patch("http://localhost:8080/UpdateById/" + editId, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("SUCCESS:", res.data);

        alert("RD User updated successfully");

        handleClose();

        getRdUsers();
      })
      .catch((error) => {
        console.log("========== UPDATE ERROR ==========");
        console.log("MESSAGE:", error.message);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("URL:", error.config?.url);

        alert(
          "Update failed. Status: " + (error.response?.status || "Unknown"),
        );
      });
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("EDIT ID =", editId);

    if (editId !== null) {
      updateRdUser();
    } else {
      insertRdUser();
    }
  };

  // =========================
  // GET PASSBOOK
  // =========================
  const getPassbookByid = (rid) => {
    axios
      .get("http://localhost:8080/getPassbookByid/" + rid)
      .then((res) => {
        console.log("Passbook data:", res.data);

        navigate("/passbook-entry/" + rid);
      })
      .catch((error) => {
        console.error("Get passbook error:", error);

        navigate("/passbook-entry/" + rid);
      });
  };

  // =====================================================
  // SEARCH FILTER
  // =====================================================
  const filteredData = rdata.filter((data) => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      String(data.rid || "").toLowerCase() === search ||
      String(data.name || "").toLowerCase() === search ||
      String(data.occupation || "").toLowerCase() === search ||
      String(data.rddate || "").toLowerCase() === search
    );
  });

  // =====================================================
  // PAGINATION
  // =====================================================
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  // =====================================================
  // PAGE CHANGE
  // =====================================================
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // =====================================================
  // JSX
  // =====================================================
  return (
    <Container fluid className="p-4">
      {/* ================= HEADER ================= */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-1">RD User Management</h3>

              <p className="text-muted mb-0">Manage Recurring Deposit Users</p>
            </div>

            <div className="d-flex gap-2">
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>

              <Button variant="success" onClick={handleShow}>
                + Add RD User
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* ================= SEARCH ================= */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="row align-items-center">
            <div className="col-md-8">
              <Form.Control
                type="text"
                placeholder="Search by RID, Name, Occupation or RD Date"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="col-md-4 mt-2 mt-md-0">
              <div className="text-muted">
                Showing <strong>{currentUsers.length}</strong> of{" "}
                <strong>{filteredData.length}</strong> users
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* ================= TABLE ================= */}
      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover responsive className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>RID</th>
                  <th>Name</th>
                  <th>Occupation</th>
                  <th>Account No</th>
                  <th>Address</th>
                  <th>Mobile/ID</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>PAN</th>
                  <th>RD Amount</th>
                  <th>RD Date</th>
                  <th>Nominee</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((data) => (
                    <tr key={data.rid}>
                      <td>
                        <strong>{data.rid}</strong>
                      </td>

                      <td>{data.name}</td>

                      <td>{data.occupation}</td>

                      <td>{data.acno}</td>

                      <td>{data.address}</td>

                      <td>{data.adharno}</td>

                      <td>{data.dob}</td>

                      <td>{data.gender}</td>

                      <td>{data.panno}</td>

                      <td>₹{data.rdamt}</td>

                      <td>{data.rddate}</td>

                      <td>{data.nname}</td>

                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => getPassbookByid(data.rid)}
                          >
                            View
                          </Button>

                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleUpdate(data)}
                          >
                            Update
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(data.rid)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4">
                      No RD Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.First
                  disabled={currentPage === 1}
                  onClick={() => changePage(1)}
                />

                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                />

                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                />

                <Pagination.Last
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(totalPages)}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* ================================================= */}
      {/* ADD / UPDATE MODAL */}
      {/* ================================================= */}

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editId !== null ? "Update RD User" : "Add RD User"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              {/* NAME */}
              <div className="col-md-6 mb-3">
                <Form.Label>Name</Form.Label>

                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* OCCUPATION */}
              <div className="col-md-6 mb-3">
                <Form.Label>Occupation</Form.Label>

                <Form.Control
                  type="text"
                  value={occuption}
                  onChange={(e) => setOccuption(e.target.value)}
                  required
                />
              </div>

              {/* ACCOUNT NUMBER */}
              <div className="col-md-6 mb-3">
                <Form.Label>Account Number</Form.Label>

                <Form.Control
                  type="text"
                  value={acno}
                  onChange={(e) => setAcno(e.target.value)}
                  required
                />
              </div>

              {/* ADDRESS */}
              <div className="col-md-6 mb-3">
                <Form.Label>Address</Form.Label>

                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* AADHAR */}
              <div className="col-md-6 mb-3">
                <Form.Label>Aadhar Number</Form.Label>

                <Form.Control
                  type="text"
                  value={adharno}
                  onChange={(e) => setAdharno(e.target.value)}
                  required
                />
              </div>

              {/* DOB */}
              <div className="col-md-6 mb-3">
                <Form.Label>Date of Birth</Form.Label>

                <Form.Control
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              {/* GENDER */}
              <div className="col-md-6 mb-3">
                <Form.Label>Gender</Form.Label>

                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </Form.Select>
              </div>

              {/* PAN */}
              <div className="col-md-6 mb-3">
                <Form.Label>PAN Number</Form.Label>

                <Form.Control
                  type="text"
                  value={panno}
                  onChange={(e) => setPanno(e.target.value)}
                  required
                />
              </div>

              {/* RD AMOUNT */}
              <div className="col-md-6 mb-3">
                <Form.Label>RD Amount</Form.Label>

                <Form.Control
                  type="number"
                  value={rdamt}
                  onChange={(e) => setRdamt(e.target.value)}
                  required
                />
              </div>

              {/* RD DATE */}
              <div className="col-md-6 mb-3">
                <Form.Label>RD Date</Form.Label>

                <Form.Control
                  type="date"
                  value={rddate}
                  onChange={(e) => setRddate(e.target.value)}
                  required
                />
              </div>

              {/* NOMINEE NAME */}
              <div className="col-md-6 mb-3">
                <Form.Label>Nominee Name</Form.Label>

                <Form.Control
                  type="text"
                  value={nname}
                  onChange={(e) => setNname(e.target.value)}
                  required
                />
              </div>

              {/* NOMINEE AADHAR */}
              <div className="col-md-6 mb-3">
                <Form.Label>Nominee Aadhar</Form.Label>

                <Form.Control
                  type="text"
                  value={nadharno}
                  onChange={(e) => setNadharno(e.target.value)}
                  required
                />
              </div>

              {/* NOMINEE PAN */}
              <div className="col-md-6 mb-3">
                <Form.Label>Nominee PAN</Form.Label>

                <Form.Control
                  type="text"
                  value={npanno}
                  onChange={(e) => setNpanno(e.target.value)}
                  required
                />
              </div>

              {/* NOMINEE ADDRESS */}
              <div className="col-md-6 mb-3">
                <Form.Label>Nominee Address</Form.Label>

                <Form.Control
                  type="text"
                  value={naddr}
                  onChange={(e) => setNaddr(e.target.value)}
                  required
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              {editId !== null ? "Update RD User" : "Add RD User"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
