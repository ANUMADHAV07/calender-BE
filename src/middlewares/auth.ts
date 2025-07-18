import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("=== Authentication Debug ===");
  console.log("Session ID:", req.sessionID);
  console.log("Is authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  console.log("Session data:", req.session);
  console.log("Cookies:", req.headers.cookie);
  console.log("================================");
  if (req.isAuthenticated()) {
    console.log("Session ID:", req.sessionID);
    console.log("Is authenticated:", req.isAuthenticated());
    console.log("User:", req.user);
    console.log("Session:", req.session);

    return next();
  }
  res.status(401).json({ message: "Authentication required" });
};

export default requireAuth;
