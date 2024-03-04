import { Request, Response } from 'express';
import { Comment } from '../model/commentModel';
import Article from '../model/articleModel';

// controller to create comment
const createComment = async (req:Request, res:Response) => {
    try {
      const { comment, articleId } = req.body;
      const exist = await Article.findById(articleId);
    if (!exist) {
      return res.status(404).json({ error: "Article not found!" });
    }    
      const newComment = new Comment({
        comment,
        article: articleId,
        user: req.user._id,
       });
      const savedComment = await newComment.save();
      await Article.updateOne({_id: exist._id}, { $push: { comments: savedComment._id } }, {new: true});
      return res.status(201).json({
      status: "success",
      comment: savedComment,
    });
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // controller to get all comments
  export const getAllComments = async (req:Request, res:Response) => {
    try {
      const allComments = await Comment.find();
      if (allComments.length > 0) {
        return res.status(200).json({status: "success", data: allComments});
      } else {
        return res.status(404).json({ message: "No Comment found in database" });
      }
    } catch (error) {
        console.log(error);      
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // get single comment controller
  export const getSingleComment = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (comment) {
        return res.status(200).json({ message: "Comment found", data: comment });
        } else {
        return res.status(404).json({ message: "Comment not found or invalid user ID" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    };

    // Delete a comment controller
    export const deleteComment = async (req:Request, res:Response) => {
        const { id } = req.params;
        try {
          const deletedComment = await Comment.findByIdAndDelete(id);
          if (deletedComment) {
            return res.status(200).json({ message: "Comment found and successfully deleted", data: deletedComment });
          } else {
            return res.status(404).json({ message: "Comment not found or invalid message ID and not deleted" });
          }
        } catch (error) {
          return res.status(500).json({ message: "Internal server error" });
        }
      };


  export default createComment;