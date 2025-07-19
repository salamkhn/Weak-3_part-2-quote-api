import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "author required"],
  },
  Quote: {
    type: String,
    required: [true, "quote required"],
  },
  category: {
    type: String,
    enum: {
      values: [
        "inspirational",
        "motivational",
        "life",
        "love",
        "success",
        "friendship",
        "humor",
        "wisdom",
        "education",
        "happiness",
        "philosophy",
      ],
      message: (props) => `${props.value} not supported`,
    },
  },
});

export const quote = mongoose.model("quote", quotesSchema);
