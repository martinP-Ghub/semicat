import { http, HttpResponse } from "msw";

export type Users = {
  id: number;
  name: string;
  position?: string;
  phone?: string;
  email?: string;
  addr?: string;
  regDate: number;
};

const users: Users[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    position: "CEO",
    phone: "01012345678",
    addr: "경기 오산시 가장산업로 28-78",
    regDate: 1724575461470,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    position: "대리",
    phone: "01012345678",
    addr: "경기 오산시 가장산업로 28-78",
    regDate: 1724570461470,
  },
  {
    id: 3,
    name: "Sam Johnson",
    email: "sam@example.com",
    position: "과장",
    phone: "01012345678",
    addr: "경기 오산시 가장산업로 28-78",
    regDate: 1724275461470,
  },
];

export const UserHandlers = [
  // USERLIST - GET
  http.get("/users", () => {
    return HttpResponse.json(users, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  // USER ADD - POST
  http.post("/users", async ({ request }) => {
    const requestData = (await request.json()) as Users;
    const name = requestData.name;
    const position = requestData.position;
    const phone = requestData.phone;
    const email = requestData.email;
    const addr = requestData.addr;
    const regDate = new Date().getTime();

    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      position,
      phone,
      email,
      addr,
      regDate,
    };
    users.push(newUser);

    return HttpResponse.json(users, { status: 201 });
  }),

  // DELETE USER - DELETE
  http.delete("/users/:id", async ({ params }) => {
    const userId = parseInt(params.id as string);
    console.log(userId);

    users.findIndex((user) => console.log(user.id === userId));
    // users 배열에서 해당 ID의 사용자를 찾고 삭제합니다.
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    users.splice(userIndex, 1);

    return HttpResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  }),

  // UPDATE USER - PUT
  http.put("/users/:id", async ({ params, request }) => {
    const userId = parseInt(params.id as string);
    const requestData = (await request.json()) as Partial<Users>; // 일부 필드만 업데이트 가능하므로 Partial 사용

    // users 배열에서 해당 ID의 사용자를 찾습니다.
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 사용자의 데이터를 업데이트합니다.
    users[userIndex] = { ...users[userIndex], ...requestData };

    return HttpResponse.json(users[userIndex], { status: 200 });
  }),
];
