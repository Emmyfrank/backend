import { Request, Response } from 'express';
import Article from '../model/articleModel';
import Like from '../model/likeModel';
import { v2 as cloudinary} from "cloudinary";
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// controller to create an article
const createArticle = async (req:Request, res:Response) => {
    try {
      if(!req.file){
        return res.status(400).json({ message: "Please upload the image" });
      }
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "images",
      });
      const { title, description } = req.body;
      const newArticle = new Article({
        title,
        description,
        image: uploadedImage.secure_url,
      });
      const saved = await newArticle.save();
      return res.status(201).json(
        {status: "success",
      Article: saved});
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // controller to get all articles
  export const getAllArticles = async (req:Request, res:Response) => {
    try {
      const allArticles = await Article.find();
      if (allArticles.length > 0) {
        return res.status(200).json({ststus: "success", articles: allArticles});
      } else {
        return res.status(404).json({ message: "No article found" });
      }
    } catch (error) {
        console.log(error);      
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // get single article controller
  export const getSingleArticle = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id).populate({path: "comments", populate: { path: "user" }});
        if (article) {
        return res.status(200).json({ message: "Article found",  deta:article });
        } else {
        return res.status(404).json({ message: "Article not found or invalid article ID" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    };

    // Delete a article controller
    export const deleteArticle = async (req:Request, res:Response) => {
        const { id } = req.params;
        try {
          const deletedArticle = await Article.findByIdAndDelete(id);
          if (deletedArticle) {
            return res.status(200).json({ message: "Article found and successfully deleted", data: deletedArticle });
          } else {
            return res.status(404).json({ message: "Article not found or invalid message ID and not deleted" });
          }
        } catch (error) {
          return res.status(500).json({ message: "Internal server error" });
        }
      };

  export const updateArticle = async (req:Request, res:Response) => {
        try {
          const { id } = req.params;
          const { title, description } = req.body;
          const article = await Article.findById(id);
          if (!article) return res.status(404).json({ message: "Article not found or invalid message ID and not deleted" });
          if(title){
            article.title = title;
          }
          if(description){
            article.description = description;
          }
          if(req.file){
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
              folder: "images",
            });
            article.image = uploadedImage.secure_url;
          }
          await article.save();
          const articleWithComments = await Article.findById(id).populate({path: "comments", populate: { path: "user" }});
          return res.status(200).json(
            {status: "success",
          Article: articleWithComments});
        } catch (error) {
            console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      };

  // controller to like or dislike an article
export const likeOrDislike = async (req:Request, res:Response) => {
  try {
    const { articleId } = req.params;
    const userId = req.user._id;
    const existArticle = await Article.findById(articleId);
  if (!existArticle) {
    return res.status(404).json({ error: "Article not found!" });
  }
  const existLike = await Like.findOne({ article: articleId, user: userId  });
  if(!existLike){
    const like = new Like({
      article: articleId,
      user: userId,
    });
    const savedLike = await like.save();
    await Article.updateOne({ _id: existArticle._id }, { $push: { likes: savedLike._id } }, { new: true })
    const articleLikes = await Like.find({ article: existArticle._id });
    return res.status(200).json({
      status: "Article liked",
      likes: articleLikes,
    });
  }
  await Article.updateOne({ _id: existArticle._id }, {
      $pull: {
        likes: existLike._id,
      },
    },
    )
    await Like.deleteOne({_id: existLike._id});

    const articleLikes = await Like.find({ article: existArticle._id });

    return res.status(200).json({status: "Article disliked", likes: articleLikes });
    
  } catch (error) {
      console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  export default createArticle;