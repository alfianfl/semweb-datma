import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

export default function TableList() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);

  const toggle = (npm) => {
    axios
      .get(`http://localhost:5000/api/datma/${npm}`)
      .then((response) => {
        console.log(response.data.data);
        setMahasiswa(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setModal(!modal);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/datma")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <GridContainer>
      {data.map((e) => (
        <GridItem key={e.npm} xs={12} sm={4} md={4} lg={4}>
          <div className="card mt-3 " style={{ width: "100%" }}>
            <img
              className="card-img-top"
              src={e.urlFoto}
              alt="Card image cap"
              height="250px"
            />
            <div className="card-body">
              <h5 className="card-title text-center">{e.nama}</h5>
              <p className="card-text text-center">
                {e.npm} <br></br>
                {e.prodi}
              </p>
              <div className="d-flex justify-content-end">
                <a
                  onClick={() => toggle(e.npm)}
                  href="#"
                  className="btn btn-primary "
                >
                  Detail
                </a>
              </div>
            </div>
          </div>
        </GridItem>
      ))}
      <div>
        {mahasiswa ? (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              {" "}
              <strong className="text-center">Informasi Mahasiswa</strong>{" "}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleNama">Nama</Label>
                <Input
                  value={mahasiswa.nama}
                  disabled
                  type="text"
                  name="nama"
                  id="exampleName"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleJeniskelamin">Jenis Kelamin</Label>
                <Input
                  disabled
                  type="text"
                  name="jeniskelamin"
                  id="exampleJeniskelamin"
                  value={mahasiswa.jk}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleAgama">Agama</Label>
                <Input
                  disabled
                  type="text"
                  name="agama"
                  id="exampleAgama"
                  value={mahasiswa.agama}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleNPM">NPM</Label>
                <Input
                  disabled
                  type="text"
                  name="NPM"
                  id="exampleNPM"
                  value={mahasiswa.npm}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  disabled
                  type="email"
                  name="email"
                  id="exampleEmail"
                  value={mahasiswa.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleProdstud">Program Studi</Label>
                <Input
                  disabled
                  type="text"
                  name="prodtud"
                  id="exampleProdstud"
                  value={mahasiswa.prodi}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleTextarea">Alamat</Label>
                <Input
                  disabled
                  type="textarea"
                  name="alamat"
                  id="exampleAlamat"
                  value={mahasiswa.alamat}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                back
              </Button>
            </ModalFooter>
          </Modal>
        ) : null}
      </div>
    </GridContainer>
  );
}
