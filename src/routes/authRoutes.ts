import { Router, Request, Response } from "express";
import passport from "../auth/passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.json({ message: "Authentication successful with calendar access" });
  }
);

router.post("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/me", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
