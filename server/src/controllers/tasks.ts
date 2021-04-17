import authorize from "../authorize";
import Task from "../models/tasks";

export const createTask: any = function ({ title, githubId }: any) {
  return new Promise((resolve, reject) => {
    let task = new Task();

    task.title = title;
    task.user_id = githubId;

    task.save((err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(task);
      }
    });
  });
};

const store = function (req: any, res: any) {
  const Authorize = authorize(req);
  console.log({ Authorize });
  if (Authorize.is) {

    createTask({ title: req.body.title, githubId: Authorize.githubId })
      .then((task: any) => {
        res.json({
          message: "New Task Added!",
          data: task,
        });
      })
      .catch((err: any) => {
        res.json(err);
      });
  } else {
    res.send({ task: null });
    return;
  }
};

export const getTasks: any = async function ({ githubId }: any) {
  let tasks = await Task.find({ user_id: githubId });
  return tasks;
};

const index = async function (req: any, res: any) {
  const Authorize = authorize(req);
  if (Authorize.is) {
    // const user = await findUser({ githubId: Authorize.githubId });

    const tasks = await getTasks({ githubId: Authorize.githubId });

    res.send({ tasks });
    return;
  } else {
    res.send({ tasks: [] });
    return;
  }
};

export const getTask: any = async function ({ id }: any) {
  let task = await Task.findById(id);
  return task;
};

const view = async function (req: any, res: any) {
  const Authorize = authorize(req);
  if (Authorize.is) {
    // const user = await findUser({ githubId: Authorize.githubId });

    const task = await getTask({ id: req.params.task_id });
    if (task.user_id === Authorize.githubId) {
      res.send({ task });
    } else {
      res.send({ task: null });
    }
    return;
  } else {
    res.send({ user: null });
    return;
  }
};

export default {
  store,
  index,
  view,
};
