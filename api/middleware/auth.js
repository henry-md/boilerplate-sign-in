import { initializeLucia } from "../db/auth.js";

const lucia = await initializeLucia();

export const auth = async (req, res, next) => {
  const cookie = req.header("Cookie") ?? "";
  const sessionId = lucia.readSessionCookie(cookie);

  if (!sessionId) {
    req.user = null;
    req.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);

  // Clearing Old Session
  if (!session) {
    const blankSessionCookie = lucia.createBlankSessionCookie();
    res.header("Set-Cookie", blankSessionCookie.serialize(), {
      append: true,
    });
  }

  // Session Rotation
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.header("Set-Cookie", sessionCookie.serialize(), {
      append: true,
    });
  }

  req.session = session;
  req.user = user;
  return next();
};
