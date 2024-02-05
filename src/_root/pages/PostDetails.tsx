import Loader from "@/components/shared/Loader";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import pro from "./../../../public/assets/icons/profile-placeholder.svg";
import edit from "./../../../public/assets/icons/edit.svg";
import deleteP from "./../../../public/assets/icons/delete.svg";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();
  const {mutateAsync: deletePost, isPending: isDeleting} = useDeletePost()
  const navigate = useNavigate()

  const handleDeletePost = () => {
    deletePost({ postId:post?.$id, imageId: post?.imageId });

    if (isDeleting) return <Loader />;
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator.imageUrl || pro}
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className=" base-medium lg:body-bold text-light-1 ">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className=" subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    <p className=" subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img src={edit} alt="edit" width={20} height={20} />
                </Link>

                <Button
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                  onClick={handleDeletePost}
                >
                  <img src={deleteP} alt="delete" width={20} height={20} />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li className="text-light-3" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
