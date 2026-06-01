import jwt from "jsonwebtoken";

import Api401Error from "../utils/errorBase/api401Error.js";

import {} from "../utils/errorBase/apiResponseMessage.js";
import configuration from "../config/configuration.js";
import User from "../models/user.model.js";


const auth = async (req, res, next) => {
  try {

    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["access-token"];
    if (!token) {
      throw new Api401Error(
        API_RESPONSE_MESSAGE.UNAUTHORIZED
      );
    }


    // =========================================================================
    // JWT VERIFY OPERATION
    // =========================================================================

    // jwt.verify():
    //
    // 1. Checks token validity
    // 2. Checks secret key
    // 3. Checks expiry
    // 4. Decodes payload
    //
    // If invalid:
    // throws error automatically

    const decoded = jwt.verify(
      token,
      configuration.JWT.SECRET
    );


    // =========================================================================
    // ATTACH USER TO REQUEST
    // =========================================================================

    // decoded example:
    //
    // {
    //   id: 1,
    //   email: "abhi@gmail.com",
    //   iat: 123456,
    //   exp: 123456
    // }
    //
    // req.user becomes available in controller

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };


    // =========================================================================
    // NEXT MIDDLEWARE / CONTROLLER
    // =========================================================================

    // next() passes request forward
    //
    // Flow:
    //
    // Request
    //   ↓
    // auth middleware
    //   ↓
    // controller

    next();

  } catch (error) {

    // Pass error to global error handler
    next(error);
  }
};



// ============================================================================
// 2. DETAIL AUTH MIDDLEWARE
// ============================================================================

// Purpose:
// --------
// Get FULL user details from database.
//
// auth middleware only gives:
// {
//   id,
//   email
// }
//
// auth_detail gives:
// {
//   id,
//   name,
//   email,
//   role,
//   phone,
//   etc
// }

const auth_detail = async (req, res, next) => {

  try {

    // =========================================================================
    // TOKEN EXTRACTION
    // =========================================================================

    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["access-token"];


    // =========================================================================
    // TOKEN CHECK
    // =========================================================================

    if (!token) {

      throw new Api401Error(
        API_RESPONSE_MESSAGE.UNAUTHORIZED
      );
    }


    // =========================================================================
    // VERIFY TOKEN
    // =========================================================================

    const decoded = jwt.verify(
      token,
      configuration.JWT.SECRET
    );


    // =========================================================================
    // DATABASE QUERY
    // =========================================================================

    // Find user by primary key
    //
    // SQL internally:
    //
    // SELECT * FROM users WHERE id = decoded.id

    const user = await User.findByPk(decoded.id);


    // =========================================================================
    // USER EXISTENCE CHECK
    // =========================================================================

    // If user deleted from DB
    // but token still exists

    if (!user) {

      throw new Api401Error(
        API_RESPONSE_MESSAGE.UNAUTHORIZED
      );
    }


    // =========================================================================
    // ATTACH FULL USER
    // =========================================================================

    req.user = user;


    // =========================================================================
    // CONTINUE REQUEST
    // =========================================================================

    next();

  } catch (error) {

    next(error);
  }
};



// ============================================================================
// 3. ADMIN AUTH MIDDLEWARE
// ============================================================================

// Purpose:
// --------
// Restrict routes to admin users only.
//
// Example:
// --------
// DELETE routes
// bulk operations
// sensitive APIs

const adminAuth = async (req, res, next) => {

  try {

    // =========================================================================
    // TOKEN EXTRACTION
    // =========================================================================

    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["access-token"];


    // =========================================================================
    // TOKEN CHECK
    // =========================================================================

    if (!token) {

      throw new Api401Error(
        API_RESPONSE_MESSAGE.UNAUTHORIZED
      );
    }


    // =========================================================================
    // VERIFY TOKEN
    // =========================================================================

    const decoded = jwt.verify(
      token,
      configuration.JWT.SECRET
    );


    // =========================================================================
    // FETCH USER FROM DATABASE
    // =========================================================================

    const user = await User.findByPk(decoded.id);


    // =========================================================================
    // ROLE CHECK
    // =========================================================================

    // Why DB check needed?
    //
    // Because token may contain old role
    //
    // Example:
    //
    // Yesterday:
    // role = admin
    //
    // Today:
    // admin removed
    //
    // Old token still says admin
    //
    // DB gives latest truth

    if (!user || user.role !== "admin") {

      throw new Api401Error(
        API_RESPONSE_MESSAGE.UNAUTHORIZED
      );
    }


    // =========================================================================
    // ATTACH ADMIN USER
    // =========================================================================

    req.user = user;


    // =========================================================================
    // CONTINUE REQUEST
    // =========================================================================

    next();

  } catch (error) {

    next(error);
  }
};



// ============================================================================
// 4. API KEY VERIFICATION
// ============================================================================

// Purpose:
// --------
// Server-to-server protection.
//
// NOT user login.
//
// Example:
// --------
// Payment Service → Your API
//
// Used in:
// Microservices
// Internal APIs

const verifyKey = async (req, res, next) => {

  try {

    // =========================================================================
    // API KEY EXTRACTION
    // =========================================================================

    // Support multiple header formats

    const apiKey =
      req.headers["x-api-key"] ||
      req.headers["api-key"] ||
      req.headers["api_key"];


    // =========================================================================
    // API KEY VALIDATION
    // =========================================================================

    // Compare incoming key with server key

    if (
      !apiKey ||
      configuration.APIKEY.INTERNAL_KEY !== apiKey
    ) {

      throw new Api401Error(
        API_RESPONSE_MESSAGE.UNAUTHORIZED
      );
    }


    // =========================================================================
    // CONTINUE REQUEST
    // =========================================================================

    next();

  } catch (error) {

    next(error);
  }
};



// ============================================================================
// EXPORT ALL MIDDLEWARES
// ============================================================================

export default {
  auth,
  auth_detail,
  adminAuth,
  verifyKey,
};