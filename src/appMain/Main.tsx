import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "../mocks/handlers";
import "../index.css";

const Main = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);

        console.log(users);
      });
  }, []);

  const clickTest = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", "test");
    formData.append("email", "test@naver.com");
    const headers = {
      "Content-Type": "application/w-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
    };

    try {
      const response = await axios.post("/users", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
      console.error("오류가 발생했습니다.", error);
    }
    // fetch("users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: "test", email: "test@naver.com" }),
    // }).then((res) => {
    //   fetch("/users")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setUsers(data);
    //       setLoading(false);

    //       console.log(users);
    //     });
    // });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Users List</h5>
              </div>
              <div>
                <button onClick={clickTest}>버튼이다</button>
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Occupation
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
                        Added
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-uppercase font-medium"
                      >
                        Manage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pl-4">1</td>
                      <td>
                        <h5 className="font-medium mb-0">Daniel Kristeen</h5>
                        <span className="text-muted">
                          Texas, Unitedd states
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">Visual Designer</span>
                        <br />
                        <span className="text-muted">Past : teacher</span>
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
                        <br />
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
                        <button
                          type="button"
                          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                          <i className="fa fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="pl-4">2</td>
                      <td>
                        <h5 className="font-medium mb-0">Emma Smith</h5>
                        <span className="text-muted">
                          Texas, Unitedd states
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">Visual Designer</span>
                        <br />
                        <span className="text-muted">Past : teacher</span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="c2a6a3acaba7ae82b5a7a0b1abb6a7eca1adaf"
                          >
                            [email&#160;protected]
                          </a>
                        </span>
                        <br />
                        <span className="text-muted">999 - 444 - 555</span>
                      </td>
                      <td>
                        <span className="text-muted">15 Mar 1855</span>
                        <br />
                        <span className="text-muted">10: 00 AM</span>
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
                        <button
                          type="button"
                          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                          <i className="fa fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="pl-4">3</td>
                      <td>
                        <h5 className="font-medium mb-0">Olivia Johnson</h5>
                        <span className="text-muted">
                          Texas, Unitedd states
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">Visual Designer</span>
                        <br />
                        <span className="text-muted">Past : teacher</span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="375356595e525b77405255445e43521954585a"
                          >
                            [email&#160;protected]
                          </a>
                        </span>
                        <br />
                        <span className="text-muted">999 - 444 - 555</span>
                      </td>
                      <td>
                        <span className="text-muted">17 Aug 1988</span>
                        <br />
                        <span className="text-muted">12: 55 AM</span>
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
                        <button
                          type="button"
                          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                          <i className="fa fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="pl-4">4</td>
                      <td>
                        <h5 className="font-medium mb-0">Isabella Williams</h5>
                        <span className="text-muted">
                          Texas, Unitedd states
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">Visual Designer</span>
                        <br />
                        <span className="text-muted">Past : teacher</span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="5e3a3f30373b321e293b3c2d372a3b703d3133"
                          >
                            [email&#160;protected]
                          </a>
                        </span>
                        <br />
                        <span className="text-muted">999 - 444 - 555</span>
                      </td>
                      <td>
                        <span className="text-muted">26 Mar 1999</span>
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
                        <button
                          type="button"
                          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                          <i className="fa fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="pl-4">5</td>
                      <td>
                        <h5 className="font-medium mb-0">Sophia Jones</h5>
                        <span className="text-muted">
                          Texas, Unitedd states
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">Visual Designer</span>
                        <br />
                        <span className="text-muted">Past : teacher</span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="660207080f030a26110304150f12034805090b"
                          >
                            [email&#160;protected]
                          </a>
                        </span>
                        <br />
                        <span className="text-muted">999 - 444 - 555</span>
                      </td>
                      <td>
                        <span className="text-muted">16 Aug 2001</span>
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
                        <button
                          type="button"
                          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                          <i className="fa fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="pl-4">6</td>
                      <td>
                        <h5 className="font-medium mb-0">Charlotte Brown</h5>
                        <span className="text-muted">
                          Texas, Unitedd states
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">Visual Designer</span>
                        <br />
                        <span className="text-muted">Past : teacher</span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <a
                            href="/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="7f1b1e11161a133f081a1d0c160b1a511c1012"
                          >
                            [email&#160;protected]
                          </a>
                        </span>
                        <br />
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
                        <button
                          type="button"
                          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                        >
                          <i className="fa fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
