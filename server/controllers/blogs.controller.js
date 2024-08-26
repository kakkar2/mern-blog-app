import Blog from "../models/blogs.model.js";

const handleAddNewBlog = async (req, res) => {
  try {
    const { title, desc, category, thumbnail } = req.body;

    if (!title && !desc && !category && !thumbnail)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const post = await Blog.create({
      title,
      description: desc,
      category,
      slug,
      thumbnail,
      createdBy: req.user.id,
    });

    if (!post)
      return res.status(400).json({
        success: false,
        message: "something went wrong while creating the blog post",
      });

    return res.status(200).json({
      success: true,
      slug,
      message: "blog post created successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const handleBlogs = async (req, res) => {
  try {
    //for search the data for certain query
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limt) || 8;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const blogs = await Blog.find({
      ...(req.query.userId && { createdBy: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: { $regex: req.query.searchTerm, $options: "i" },
            description: { $regex: req.query.searchTerm, $options: "i" },
          },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // this is to count how many blog post we have in database
    const totalBlogs = await Blog.countDocuments();
    //setting the time to check the data between previous month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    //this is to count that how many new post add to database in last month
    const lastMonthBlog = await Blog.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      success: true,
      blogs,
      totalBlogs,
      lastMonthBlog,
      message: "blogs fetch successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const handleUpdateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res
        .status(404)
        .json({ success: false, message: "blog id not found" });
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.desc,
          category: req.body.category,
          slug,
          thumbnail: req.body.thumbnail,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      slug,
      message: "blog updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const handleDeleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(404).json({
        success: false,
        message: "blog id not found",
      });

    await Blog.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { handleAddNewBlog, handleBlogs, handleDeleteBlog, handleUpdateBlog };
