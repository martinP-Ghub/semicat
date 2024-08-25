import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Users } from "../mocks/UserHandlers";
import "../index.css";

const Main = () => {
  const header = { "Content-Type": "application/json" };
  const [users, setUsers] = useState<Users[]>([]);
  // const [user, setUser] = useState("");
  // const [loading, setLoading] = useState(false);
  const [addUserSw, setAddUserSw] = useState(false);
  const [submitType, setSubmitType] = useState("");
  const [modId, setModId] = useState("");
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

  useEffect(() => {
    initUser();
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    // const hour = String(date.getHours()).padStart(2, "0");
    // const min = String(date.getMinutes()).padStart(2, "0");
    // const sec = String(date.getSeconds()).padStart(2, "0");
    // ${hour}:${min}:${sec}
    return `${year}-${month}-${day}`;
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
    console.log(obj);
    console.log(obj.name);
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userSubmit = async () => {
    console.log(formData);
    // return false;
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

              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium pl-4"
                      >
                        #
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
                    {users.map((user: any, idx: number) => {
                      var phone = user.phone.replace(
                        /(\d{3})(\d{4})(\d{4})/,
                        "$1-$2-$3"
                      );
                      return (
                        <tr>
                          <td className="pl-4">{idx + 1}</td>
                          <td>
                            <h5 className="font-medium mb-0">{user.name}</h5>
                          </td>
                          <td>
                            <span className="text-muted">{user.position}</span>
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
                            >
                              <i className="fa fa-folder"></i>
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
      </div>

      <Modal isOpen={addUserSw} ariaHideApp={false}>
        <div className="container mt-5">
          <h2>유저 {submitType == "mod" ? "수정" : "등록"}</h2>
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

            <button
              // type="submit"
              type="button"
              className={`btn btn-outline-info ${
                submitType == "mod" && "hidden"
              }`}
              onClick={userSubmit}
            >
              저장
            </button>
            <button
              // type="submit"
              type="button"
              className={`btn btn-outline-info ${
                submitType == "save" && "hidden"
              }`}
              onClick={userMod}
            >
              수정
            </button>
            <button type="button" className="btn " onClick={modalClose}>
              취소
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Main;

{
  /* <tr>
  <td className="pl-4">1</td>
  <td>
    <h5 className="font-medium mb-0">Daniel Kristeen</h5>
  </td>
  <td>
    <span className="text-muted">Visual Designer</span>
  </td>
  <td>
    <span className="text-muted">
      <a
        href="/cdn-cgi/l/email-protection"
        className="__cf_email__"
        data-cfemail="5a3e3b34333f361a2d3f3829332e3f74393537"
      >
        [email&#160;protected]
      </a>
    </span>
  </td>
  <td>
    <span className="text-muted">999 - 444 - 555</span>
  </td>
  <td>
    <span className="text-muted">15 Mar 1988</span>
    <br />
    <span className="text-muted">10: 55 AM</span>
  </td>
  <td>
    <select
      className="form-control category-select"
      id="exampleFormControlSelect1"
    >
      <option>Modulator</option>
      <option>Admin</option>
      <option>User</option>
      <option>Subscriber</option>
    </select>
  </td>
  <td>
    <button
      type="button"
      className="btn btn-outline-info btn-circle btn-lg btn-circle"
    >
      <i className="fa fa-key"></i>
    </button>
    <button
      type="button"
      className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
    >
      <i className="fa fa-trash"></i>
    </button>
    <button
      type="button"
      className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
    >
      <i className="fa fa-edit"></i>
    </button>
  </td>
</tr> */
}
