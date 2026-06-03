import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Api401Error from "../utils/errorbase/api401Error.js";
import API_RESPONSE_MESSAGE from "../utils/errorbase/apiResponseMEssage.js";
import student from "../models/student.model.js";

dotenv.config();

const secret = process.env.SECRET_KEY || "default_secret_key";
const internalApiKey = process.env.API_KEY;



const getTokenFromRequest = (req) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return req.headers["access-token"];
  }

  const token = authHeader.replace(/Bearer\s+/i, "").trim();
  return token || req.headers["access-token"];
};

const handleJwtError = (error) => {
  if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    return new Api401Error(error.message || API_RESPONSE_MESSAGE.UNAUTHORIZED);
  }
  return error;
};

const auth = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, secret);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    next(handleJwtError(error));
  }
};

const auth_detail = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, secret);
    const user = await student.findByPk(decoded.id);

    if (!user) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    next(handleJwtError(error));
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, secret);
    const user = await student.findByPk(decoded.id);

    if (!user || user.role !== "admin") {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    next(handleJwtError(error));
  }
};

const verifyKey = async (req, res, next) => {
  try {
    const apiKey =
      req.headers["x-api-key"] ||
      req.headers["api-key"] ||
      req.headers["api_key"];

    if (!apiKey || internalApiKey !== apiKey) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authentication = {
  auth,
  auth_detail,
  adminAuth,
  verifyKey,
};

export { authentication };
export default authentication;
