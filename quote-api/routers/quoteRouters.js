import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getquotebyId,
  getquotebyIdanddelete,
  getquotebyIdandupdate,
  insertQuote,
  randomQuote,
  showallQuote,
} from "../controllers/quoteController.js";

export const quoteRouter = Router();

// @purpose insertquotes
// @method post
// @endpoint "api/quote/insert"
quoteRouter.post("/insert", isAuthenticated, insertQuote);

// @purpose showallquote
// @method get
// @endpoint "api/quote/allquotes"
quoteRouter.get("/allquotes", showallQuote);

// @purpose getquotebyid
// @method get
// @endpoint "api/quote/getbyid/:id"
quoteRouter.get("/getbyid/:id", getquotebyId);

// @purpose getquotebyandupdateid
// @method get
// @endpoint "api/quote/updatebyid/:id"
quoteRouter.put("/updatebyid/:id", isAuthenticated, getquotebyIdandupdate);

// @purpose getquotebyanddelete
// @method get
// @endpoint "api/quote/deletebyid/:id"
quoteRouter.delete("/deletebyid/:id", isAuthenticated, getquotebyIdanddelete);

//@random quote
//@method get
//@endpoint "api/quote/random"
quoteRouter.get("/random", randomQuote);
