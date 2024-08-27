import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import { Users } from "../mocks/UserHandlers";
import { UserType } from "../type/Type";
import { formatDate } from "../utils/util";

const User = () => {
  const header = { "Content-Type": "application/json" };
  const [users, setUsers] = useState<UserType[]>([]);
  const [project, setProject] = useState([]);
  const [addUserSw, setAddUserSw] = useState(false);
  const [projectInfoSw, setProjectInfoSw] = useState(false);
  const [submitType, setSubmitType] = useState("");
  const [modId, setModId] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    addr: "",
  });

  const initUser = () => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const search = () => {
    if (searchText == "") {
      initUser();
    } else {
      fetch("users/searchType=" + searchType + "&searchText=" + searchText)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    }
  };

  const deleteUser = (id: string) => {
    window.confirm("정말로 삭제하시겠습니까?") &&
      fetch("users/" + id, {
        method: "DELETE",
        headers: header,
      }).then(() => {
        initUser();
      });
  };

  const modBtn = (e: any) => {
    const obj = JSON.parse(e.target.dataset.obj);

    setFormData({
      name: obj.name,
      position: obj.position,
      email: obj.email,
      phone: obj.phone,
      addr: obj.addr,
    });

    setModId(obj.id);
    setAddUserSw(true);
    setSubmitType("mod");
  };

  const addBtn = async () => {
    setAddUserSw(true);
    setSubmitType("save");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userSubmit = async () => {
    fetch("users", {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    }).then(() => {
      modalClose();
      initUser();
    });
  };

  const userMod = async () => {
    fetch("users/" + modId, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(formData),
    }).then(() => {
      modalClose();
      initUser();
    });
  };

  const modalClose = () => {
    setFormData({
      name: "",
      position: "",
      email: "",
      phone: "",
      addr: "",
    });
    setAddUserSw(false);
  };

  const prjInfoView = (id: string) => {
    fetch("/project/searchType=userId&searchText=" + id)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
      });

    setProjectInfoSw(true);
  };

  const prjModalClose = () => {
    setProjectInfoSw(false);
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <>
      <div className="userContainer">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Users List</h5>
                <button onClick={addBtn} className="btn btn-outline-info">
                  추가
                </button>
              </div>

              <div className="searchBox">
                <select
                  name="searchType"
                  id="searchType"
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="name">이름</option>
                  <option value="email">Email</option>
                </select>
                <input
                  type="search"
                  name="searchText"
                  className="searchText"
                  placeholder="검색어를 입력해 주세요"
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
                        사번
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        이름
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        직급
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        주소
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        등록일
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user: any, idx: number) => {
                        var phone = user.phone.replace(
                          /(\d{3})(\d{4})(\d{4})/,
                          "$1-$2-$3"
                        );
                        return (
                          <tr>
                            <td className="pl-4">{user.id}</td>
                            <td>
                              <h5 className="font-medium mb-0">{user.name}</h5>
                            </td>
                            <td>
                              <span className="text-muted">
                                {user.position}
                              </span>
                            </td>
                            <td>
                              <span className="text-muted">{user.email}</span>
                            </td>
                            <td>
                              <span className="text-muted">{phone}</span>
                            </td>
                            <td>
                              <span className="text-muted">{user.addr}</span>
                            </td>
                            <td>
                              <span className="text-muted">
                                {formatDate(new Date(user.regDate))}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                onClick={() => deleteUser(`${user.id}`)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                onClick={(e) => modBtn(e)}
                                data-obj={user && JSON.stringify(user)}
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
                                onClick={() => prjInfoView(`${user.id}`)}
                              >
                                <i className="fa fa-folder"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan={8} className="nonData">
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

      <Modal isOpen={addUserSw} ariaHideApp={false}>
        <div className="container mt-5">
          <h2>유저 {submitType === "mod" ? "수정" : "등록"}</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
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
              <label htmlFor="position" className="form-label">
                직급
              </label>
              <input
                type="text"
                className="form-control"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={13}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="addr" className="form-label">
                주소
              </label>
              <input
                type="text"
                className="form-control"
                id="addr"
                name="addr"
                value={formData.addr}
                onChange={handleChange}
                required
              />
            </div>

            <div className="btnBox">
              <button
                type="button"
                className={`btn btn-outline-info ${
                  submitType === "mod" && "hidden"
                }`}
                onClick={userSubmit}
              >
                저장
              </button>
              <button
                type="button"
                className={`btn btn-outline-info ${
                  submitType === "save" && "hidden"
                }`}
                onClick={userMod}
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
        isOpen={projectInfoSw}
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
          <div className="felxBetween">
            <h2>담당 프로젝트</h2>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={prjModalClose}
              style={{ height: "40px" }}
            >
              닫기
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
                    Seq
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
                    description
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.length > 0 ? (
                  project.map((prj: any) => {
                    return (
                      <tr>
                        <td>{prj.id}</td>
                        <td>{prj.name}</td>
                        <td>{prj.description}</td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan={3} className="nonData">
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
    </>
  );
};

export default User;
