import axios from "axios";
import React, { useEffect, useState } from "react";
import modulecss from "../../Style.module.css";

const EditDoctor2 = () => {
  const [id, setId] = useState([]);
  const [treatmenttext, setTreatmentText] = useState([]);
  const [Doctor, setDoctor] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4001/Doctors`)
      .then((res) => {
      
     setTreatmentText(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editData = (id) => {
    axios
      .get(`http://localhost:4001/Doctors/${id}`)
      .then((res) => {
        setId(res.data.id);
        setDoctor(res.data.Doctor);

      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4001/Doctors/${id}`, { id,Doctor })
      .then((res) => {
        alert("student updated  sucessfully.......");
       
        setId("");
        setDoctor("");

      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <h1>
        Edit <span className="text-danger">Treatment</span>{" "}
      </h1>

      <div className="container my-5 ">
        <div className="row my-5">
          
          <div className="col-lg-12">
            <form
              className={`${modulecss.boxshadow} py-5 px-5 `}
              onSubmit={submitHandler}
            >
              <div className="row">
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="id"
                    placeholder="Id"
                    className="form-control mb-5"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    name="Message"
                    placeholder="Add Latest News"
                    className="form-control mb-5"
                    value={Doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  />
                  <input
                    type="submit"
                    placeholder="Send Message"
                    className=" form-control btn btn-success"
                  ></input>
                </div>
                <div className={`${modulecss}container mt-5`}>
                  <div className="row ">
                    <div className="col-lg-12">
                      <table className="table table-bordered display hover">
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>lnews</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {treatmenttext.map((stu) => {
                            return (
                              <tr key={stu.id}>
                                <td>{stu.id}</td>
                                <td>{stu.Doctor}</td>

                                <td className="d-flex">
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => editData(stu.id)}
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDoctor2;
