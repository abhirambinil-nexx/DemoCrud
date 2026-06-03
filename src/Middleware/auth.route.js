import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Api401Error from "../utils/errorbase/api401Error.js";
import API_RESPONSE_MESSAGE from "../utils/errorbase/apiResponseMEssage.js";
import student from "../models/student.model.js";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRETE;
const internalApiKey = process.env.INTERNAL_API_KEY || process.env.API_KEY;

const auth = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["access-token"];
    if (!token) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, jwtSecret);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const auth_detail = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["access-token"];

    if (!token) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    const decoded = jwt.verify(token, jwtSecret);
    const user = await student.findByPk(decoded.id);

    if (!user) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["access-token"];

    if (!token) {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, jwtSecret);

    const user = await student.findByPk(decoded.id);

    if (!user || user.role !== "admin") {
      throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
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
