import { http, HttpResponse } from "msw";
import { users } from "./UserHandlers";
import { ProjectType } from "../type/Type";

const project: ProjectType[] = [
  {
    id: 20240001,
    userId: 1,
    name: "Project Alpha",
    description: "Description for Project Alpha",
    status: 1, //0 inactive 1 active 2 completed
    regDate: 1724575461470,
  },
  {
    id: 20240002,
    userId: 1,
    name: "Project Beta",
    description: "Description for Project Beta",
    status: 2,
    regDate: 1724570461470,
  },
  {
    id: 20240003,
    userId: 2,
    name: "Project Gamma",
    description: "Description for Project Gamma",
    status: 1,
    regDate: 1724275461470,
  },
  {
    id: 20240004,
    userId: 3,
    name: "Project Delta",
    description: "Description for Project Delta",
    status: 0,
    regDate: 1721275461470,
  },
];
let maxId = 4; // id 고유값 유지를 위해 임시 처리

export const ProjectHandlers = [
  // PROJECT - GET
  http.get("/project", () => {
    const projectReuslt = project.map((prj) => {
      const user = users.find((u: any) => u.id === prj.userId);

      return {
        ...prj,
        userName: user ? user.name : "삭제된 관리자",
      };
    });

    return HttpResponse.json(projectReuslt, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  // PROJECT SEARCH - GET
  http.get(
    "project/searchType=:searchType&searchText=:searchText",
    async ({ params }) => {
      const type = params.searchType as keyof ProjectType;
      let text = String(params.searchText).toLowerCase();

      const prjList = project.filter((prj) => {
        const value = prj[type];
        const user = users.find((u: any) => u.id === prj.userId);

        prj.userName = user ? user.name : "삭제된 관리자";

        if (typeof value == "string") {
          return value.toLowerCase().includes(text);
        } else if (typeof value == "number") {
          return value.toString().includes(text);
        }
      });

      return HttpResponse.json(prjList, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  ),

  // PROJECT ADD - POST
  http.post("/project", async ({ request }) => {
    const requestData = (await request.json()) as ProjectType;
    const name = requestData.name;
    const userId = Number(requestData.userId);
    const description = requestData.description;
    const status = requestData.status;
    const regDate = new Date().getTime();

    const newProject = {
      id: parseInt(
        String(new Date().getFullYear()) + String(maxId + 1).padStart(4, "0")
      ),
      name,
      userId,
      description,
      status,
      regDate,
    };
    project.push(newProject);

    maxId++;

    return HttpResponse.json(users, { status: 200 });
  }),

  // DELETE PROJECT - DELETE
  http.delete("/project/:id", async ({ params }) => {
    const prjId = parseInt(params.id as string);

    // project 배열에서 해당 ID 찾고 삭제합니다.
    const prjIndex = project.findIndex((prj) => prj.id === prjId);
    if (prjIndex === -1) {
      return HttpResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    project.splice(prjIndex, 1);

    return HttpResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  }),

  // UPDATE PROJECT - PUT
  http.put("/project/:id", async ({ params, request }) => {
    const projectId = parseInt(params.id as string);
    const requestData = (await request.json()) as Partial<ProjectType>;

    // project 배열에서 해당 ID를 찾습니다.
    const projectIndex = project.findIndex((prj) => prj.id === projectId);
    if (projectIndex === -1) {
      return HttpResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // 프로젝트의 데이터를 업데이트합니다.
    project[projectIndex] = { ...project[projectIndex], ...requestData };

    return HttpResponse.json(project[projectIndex], { status: 200 });
  }),
];
