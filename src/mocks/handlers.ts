import { http, HttpResponse } from "msw";

export type Users = {
  id: number;
  name: string;
  email?: string;
};

const users: Users[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Sam Johnson", email: "sam@example.com" },
];

export const handlers = [
  // TODOLIST - GET
  http.get("/users", () => {
    return HttpResponse.json(users, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  // TODOLIST ADD - POST
  http.post("/users", async ({ request }) => {
    const requestData = (await request.json()) as Users;
    const name = requestData.name;
    const email = requestData.email;

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    return HttpResponse.json(users, { status: 201 });
  }),
];
