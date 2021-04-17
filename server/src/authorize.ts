import jwt from "jsonwebtoken";

function authorize(req: any) {
  let isAuth = {
    is: true,
    githubId: "",
  };

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    isAuth.is = false;
    return isAuth;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    isAuth.is = false;
    return isAuth;
  }

  try {
    const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN);
    isAuth.githubId = payload.githubId;
  } catch (err) {
    isAuth.is = false;
    return isAuth;
  }

  isAuth.is = !!isAuth.githubId;
  return isAuth;
}
export default authorize;
