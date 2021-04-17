import authorize from "../authorize";

import User from "../models/user";

export const createUser: any = function ({ name, githubId }: any) {
  return new Promise((resolve, reject) => {
    let user = new User();

    user.name = name;
    user.githubId = githubId;

    user.save((err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const store = function (req: any, res: any) {
  createUser({ name: req.body.name, githubId: req.body.githubId })
    .then((user: any) => {
      res.json({
        message: "New User Added!",
        data: user,
      });
    })
    .catch((err: any) => {
      res.json(err);
    });
};

export const findUser: any = async function ({ githubId }: any) {
  let user = await User.findOne({ githubId });
  return user;
};

const view = async function (req: any, res: any) {
  const Authorize = authorize(req);
  if (Authorize.is) {
    // const user = await findUser({ githubId: Authorize.githubId });

    const user = await findUser({ githubId: Authorize.githubId });

    res.send({ user });
    return;
  } else {
    res.send({ user: null });
    return;
  }
};

export default {
  store,
  view,
};
