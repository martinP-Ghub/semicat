import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
// import { Project } from "../mocks/ProjectHandlers";
import { ProjectType } from "../type/Type";
import { formatDate } from "../utils/util";

const ProjectList = () => {
  const header = { "Content-Type": "application/json" };
  const [prj, setPrj] = useState<ProjectType[]>([]);
  const [addPrjSw, setAddPrjSw] = useState(false);
  const [submitType, setSubmitType] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userId: 1,
    status: 0,
  });

  const initProject = () => {
    fetch("/project")
      .then((res) => res.json())
      .then((data) => {
        setPrj(data);
      });
  };

  const search = () => {
    if (searchText == "") {
      initProject();
    } else {
      fetch("project/searchType=" + searchType + "&searchText=" + searchText)
        .then((res) => res.json())
        .then((data) => {
          setPrj(data);
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const addBtn = async () => {
    setAddPrjSw(true);
    setSubmitType("save");
  };
  // const addBtn = async () => {
  //   fetch("project", {
  //     method: "POST",
  //     headers: header,
  //     body: JSON.stringify({
  //       userId: 1,
  //       name: "new Project",
  //       description: "설명",
  //       status: "active",
  //     }),
  //   }).then(() => {
  //     // modalClose();
  //     initProject();
  //   });
  // };

  const prjSubmit = async () => {
    console.log(formData);
    // return false;
    fetch("project", {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    }).then(() => {
      modalClose();
      initProject();
    });
  };

  const prjMod = async () => {
    // fetch("project/" + modId, {
    //   method: "PUT",
    //   headers: header,
    //   body: JSON.stringify(formData),
    // }).then(() => {
    //   modalClose();
    //   initProject();
    // });
  };
  // const formData = new FormData();
  // formData.append("name", "test");
  // formData.append("email", "test@naver.com");

  // try {
  //   const response = await axios.post("/users", formData, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "*/*",
  //     },
  //   });
  // } catch (error) {
  //   alert("등록 중 오류가 발생했습니다.");
  //   console.error("오류가 발생했습니다.", error);
  // }
  const deleteProject = (id: string) => {
    window.confirm("정말로 삭제하시겠습니까?") &&
      fetch("project/" + id, {
        method: "DELETE",
        headers: header,
      }).then(() => {
        initProject();
      });
  };

  const modalClose = () => {
    setFormData({
      name: "",
      description: "",
      userId: 1,
      status: 0,
    });
    setAddPrjSw(false);
  };
  useEffect(() => {
    initProject();
  }, []);

  return (
    <>
      <div className="userContainer">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Project List</h5>
                <button className="btn btn-outline-info" onClick={addBtn}>
                  Project Add
                </button>
              </div>

              <div className="searchBox">
                <select
                  name="searchType"
                  id="searchType"
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="name">Project Name</option>
                  <option value="status">Status</option>
                </select>
                <input
                  type="search"
                  name="searchText"
                  className="searchText"
                  placeholder="Search Here"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="button" className="btn btn-base" onClick={search}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium pl-4"
                      >
                        project Seq
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        project Name
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        description
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        manager
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        regDate
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        manage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prj.length > 0 ? (
                      prj.map((prj: any, idx: number) => {
                        return (
                          <tr>
                            <td className="pl-4">{prj.id}</td>
                            <td>
                              <h5 className="font-medium mb-0">{prj.name}</h5>
                            </td>
                            <td>
                              <span className="text-muted">
                                {prj.description}
                              </span>
                            </td>
                            <td>
                              <span className="text-muted">{prj.userName}</span>
                            </td>
                            <td>
                              <span className="text-muted">
                                {prj.status === 0
                                  ? "Inactive"
                                  : prj.status === 1
                                  ? "Active"
                                  : "Completed"}
                              </span>
                            </td>
                            <td>
                              <span className="text-muted">
                                {formatDate(new Date(prj.regDate))}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                onClick={() => deleteProject(`${prj.id}`)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                // onClick={(e) => modBtn(e)}
                                // data-obj={prj && JSON.stringify(prj)}
                              >
                                <i
                                  className="fa fa-edit"
                                  onClick={() => {
                                    return false;
                                  }}
                                ></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                              >
                                <i
                                  className="fa fa-file-text"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan={7} className="nonData">
                            데이터가 없습니다.
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={addPrjSw} ariaHideApp={false}>
        <div className="container mt-5">
          <h2>Project {submitType === "mod" ? "Mod" : "Add"}</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <textarea
                // type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="manager" className="form-label">
                Manager
              </label>
              <input
                type="text"
                className="form-control"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              {/* <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                maxLength={13}
                required
              /> */}
              <select
                className="form-control category-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={0}>Inactive</option>
                <option value={1}>Active</option>
                <option value={2}>Completed</option>
              </select>
            </div>

            <div className="btnBox">
              <button
                // type="submit"
                type="button"
                className={`btn btn-outline-info ${
                  submitType === "mod" && "hidden"
                }`}
                onClick={prjSubmit}
              >
                저장
              </button>
              <button
                // type="submit"
                type="button"
                className={`btn btn-outline-info ${
                  submitType === "save" && "hidden"
                }`}
                onClick={prjMod}
              >
                수정
              </button>
              <button type="button" className="btn " onClick={modalClose}>
                취소
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProjectList;
