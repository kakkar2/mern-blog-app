import Comment from "../models/comments.model.js";

const handlePostComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;
    const { description } = req.body;

    if (!userId && !blogId && !description)
      return res
        .status(404)
        .json({ success: false, message: "blog/user id or comment not found" });

    await Comment.create({
      description,
      blogId,
      createdBy: userId,
    });

    return res
      .status(200)
      .json({ success: true, message: "comment add successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const handleComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId)
      return res
        .status(404)
        .json({ success: false, message: "blog id not fund" });
    const comments = await Comment.find({ blogId }).populate("createdBy");
    const totalComments = await Comment.countDocuments({ blogId });
    return res.status(200).json({
      success: true,
      comments,
      totalComments,
      message: "comments fetch successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { handlePostComment, handleComment };
