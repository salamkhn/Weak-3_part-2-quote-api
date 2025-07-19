import { quote } from "../models/quotesModel.js";
import Joi from "joi";

export const quoteSchema = Joi.object({
  author: Joi.string().required(),
  Quote: Joi.string().required(),
  category: Joi.string().required(),
});

//insert quote
export const insertQuote = async (req, res, next) => {
  const { error } = quoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      err: error.details[0].message,
    });
  }
  try {
    const { author, Quote, category } = req.body;

    const quoteDetails = new quote({
      author,
      Quote,
      category,
    });

    await quoteDetails.save();

    //save to dbs
    return res.status(201).json({
      message: "quote created",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//showallquote
export const showallQuote = async (req, res, next) => {
  try {
    const { category, author, page = 2, limit = 3 } = req.query;

    let queryObj = {};
    if (category) {
      queryObj.category = category;
    }

    if (author) {
      queryObj.author = { $regex: author, $options: "i" };
    }

    // if there is page and limits than how we can handale it

    console.log("quryObj :", queryObj);
    let skip = (page - 1) * limit;

    const allQuotes = await quote.find(queryObj).skip(skip).limit(limit);

    if (!allQuotes) {
      return res.status(400).json({
        message: "not any quote present",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "these quotes are found",
      allQuotes,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//getquote by id
export const getquotebyId = async (req, res) => {
  try {
    const id = req.params.id;

    const exist = await quote.findById(id);

    console.log("exist :", exist);
    if (!exist) {
      return res.status(400).json({
        message: "not any quote present with this id",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "quote found",
      Quote: exist,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//get by id and update
export const getquotebyIdandupdate = async (req, res) => {
  try {
    const { author, Quote, category } = req.body;
    const id = req.params.id;

    const exist = await quote.findByIdAndUpdate(
      id,
      { author, Quote, category },
      { new: true }
    );

    console.log("exist :", exist);
    if (!exist) {
      return res.status(400).json({
        message: "quote not found",
        success: false,
      });
    }

    //success response
    return res.status(200).json({
      message: "quote updated",
      Quote: exist,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//get by id and delete
export const getquotebyIdanddelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const exist = await quote.findByIdAndDelete(id);

    //success response
    return res.status(200).json({
      message: "quote deleted",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//get random quote

export const randomQuote = async (req, res, next) => {
  try {
    const allquote = await quote.find({});
    console.log("allquote :", allquote);

    if (!allquote) {
      return res.status(404).json({
        message: "quote not found",
        success: false,
      });
    }

    let randomNumber = Math.ceil(Math.random() * 25);
    const randomJok = allquote[randomNumber];

    return res.status(200).json({
      message: "these quote found",
      randomJok,
    });
  } catch (err) {
    next(err);
  }
};
