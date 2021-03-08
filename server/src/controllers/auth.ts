import express from "express";
const router = express.Router();
import passport from "passport";

router.get(
  '/github',
  passport.authenticate(
    'github', {
    session: false
  })
);

router.get(
  '/github/callback',
  passport.authenticate(
  'github', {
    session: false
  }),
  (req:any, res) => {
    res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`)
  }
);

export default router;