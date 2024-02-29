import { Request, Response } from 'express';
import Article from '../model/articleModel';

// controller to create an article
const createArticle = async (req:Request, res:Response) => {
    try {
      const newArticle = new Article({ ...req.body });
      const saved = await newArticle.save();
      return res.status(201).json(
        {status: "success",
      date: saved});
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
        return res.status(200).json({ststus: "success", data: allArticles});
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
        const article = await Article.findById(id);
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


  export default createArticle;