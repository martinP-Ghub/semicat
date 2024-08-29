import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

import { ProjectType, UserType } from "../type/Type";
import { formatDate } from "../utils/util";

const ProjectList = () => {
  const header = { "Content-Type": "application/json" };
  const [prj, setPrj] = useState<ProjectType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [addPrjSw, setAddPrjSw] = useState(false);
  const [usersInfoSw, setUsersInfoSw] = useState(false);
  const [projectInfoSw, setProjectInfoSw] = useState(false);
  const [submitType, setSubmitType] = useState("");
  const [modId, setModId] = useState("");

  const [searchType, setSearchType] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [mSearchType, setMSearchType] = useState("name");
  const [mSearchText, setMSearchText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userId: 0,
    userName: "",
    status: 0,
  });

  const [projectInfo, setProjectInfo] = useState({
    id: 0,
    name: "",
    description: "",
    userId: 0,
    userName: "",
    status: 0,
    regDate: 0,
  });

  const initProject = () => {
    fetch("/project")
      .then((res) => res.json())
      .then((data) => {
        setPrj(data);
      });
  };

  const valid = () => {
    let chk = true;
    if (chk && formData.name === "") {
      alert(`Project values are empty, please check.`);
      chk = false;
    }

    if (chk && formData.description === "") {
      alert(`Description values are empty, please check.`);
      chk = false;
    }

    if (chk && formData.userName === "") {
      alert(`Manager values are empty, please check.`);
      chk = false;
    }

    return chk;
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

  const prjSubmit = async () => {
    valid() &&
      fetch("project", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: JSON.stringify(formData),
      }).then(() => {
        modalClose();
        initProject();
      });
  };

  const modBtn = (e: any) => {
    const buttonElement = e.currentTarget;
    const obj = JSON.parse(buttonElement.dataset.obj);

    setFormData({
      name: obj.name,
      description: obj.description,
      userId: obj.userId,
      userName: obj.userName,
      status: Number(obj.status),
    });

    setAddPrjSw(true);
    setModId(obj.id);
    setSubmitType("mod");
  };

  const prjMod = async () => {
    valid() &&
      fetch("project/" + modId, {
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
        body: JSON.stringify(formData),
      }).then(() => {
        modalClose();
        initProject();
      });
  };

  const prjInfo = (e: any) => {
    const buttonElement = e.currentTarget;
    const obj = JSON.parse(buttonElement.dataset.obj);

    setProjectInfo({
      id: obj.id,
      name: obj.name,
      description: obj.description,
      userId: obj.userId,
      userName: obj.userName,
      status: Number(obj.status),
      regDate: obj.regDate,
    });

    setProjectInfoSw(true);
  };
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
  const managerSearch = () => {
    if (mSearchText === "") {
      fetch("/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    } else {
      fetch("/users/searchType=" + mSearchType + "&searchText=" + mSearchText)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    }
    setUsersInfoSw(true);
  };

  const managerSel = (id: number, name: string) => {
    formData.userId = id;
    formData.userName = name;

    setMSearchText("");
    setUsersInfoSw(false);
  };
  const modalClose = () => {
    setFormData({
      name: "",
      description: "",
      userId: 0,
      userName: "",
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
                  <option value="userName">Status</option>
                </select>
                <input
                  type="search"
                  name="searchText"
                  className="searchText"
                  placeholder="Search Here"
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") search();
                  }}
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
                              <span className="text-muted ">
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
                                onClick={(e) => modBtn(e)}
                                data-obj={prj && JSON.stringify(prj)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                onClick={(e) => prjInfo(e)}
                                data-obj={prj && JSON.stringify(prj)}
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
          <h2>Project {submitType === "mod" ? "Modify" : "Add"}</h2>
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
              <div className="flexBetween">
                <input
                  type="hidden"
                  className="form-control"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "calc(100% - 140px)" }}
                  value={formData.userName}
                  required
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={managerSearch}
                >
                  manager Search
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
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
                type="button"
                className={`btn btn-outline-info ${
                  submitType === "mod" && "hidden"
                }`}
                onClick={prjSubmit}
              >
                저장
              </button>
              <button
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

      <Modal
        isOpen={usersInfoSw}
        ariaHideApp={false}
        style={{
          content: {
            height: "400px",
            width: "800px",
            margin: "auto",
          },
        }}
      >
        <div className="">
          <div className="flexBetween">
            <h2>Manager List</h2>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => {
                setUsersInfoSw(false);
                setMSearchText("");
              }}
              style={{ height: "40px" }}
            >
              cancle
            </button>
          </div>
          <div className="searchBox">
            <select
              name="mSearchType"
              id="searchType"
              onChange={(e) => setMSearchType(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <input
              type="search"
              name="mSearchText"
              className="searchText"
              placeholder="Search Here"
              value={mSearchText}
              onChange={(e) => setMSearchText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") managerSearch();
              }}
            />
            <button
              type="button"
              className="btn btn-base"
              onClick={managerSearch}
            >
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
          <div className="mb-3">
            <table className="table no-wrap user-table mb-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-0 text-uppercase font-medium"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="border-0 text-uppercase font-medium"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="border-0 text-uppercase font-medium"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="border-0 text-uppercase font-medium"
                  >
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u: any) => {
                    return (
                      <tr>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.position}</td>
                        <td>{u.email}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => {
                              managerSel(parseInt(`${u.id}`), `${u.name}`);
                            }}
                          >
                            √
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan={4} className="nonData">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={projectInfoSw}
        ariaHideApp={false}
        style={{
          content: {
            height: "800px",
            width: "800px",
            margin: "auto",
          },
        }}
      >
        <div className="">
          <div className="flexBetween">
            <h2>Project Detail Infomation</h2>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => {
                setProjectInfoSw(false);
              }}
              style={{ height: "40px" }}
            >
              cancle
            </button>
          </div>
          <div className="mb-3">
            <table className="table user-view-table m-0">
              <tbody>
                <tr>
                  <td>Project Seq</td>
                  <td>{projectInfo.id}</td>
                </tr>
                <tr>
                  <td>Project Name</td>
                  <td>{projectInfo.name}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td style={{ whiteSpace: "pre-line" }}>
                    {projectInfo.description}
                  </td>
                </tr>
                <tr>
                  <td>Manager</td>
                  <td>{projectInfo.userName}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    {projectInfo.status === 0
                      ? "Inactive"
                      : projectInfo.status === 1
                      ? "Active"
                      : "Completed"}
                  </td>
                </tr>
                <tr>
                  <td>RegDate</td>
                  <td>{formatDate(new Date(projectInfo.regDate))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectList;
