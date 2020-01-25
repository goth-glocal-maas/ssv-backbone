import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Textarea from "react-expanding-textarea";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { ALL_POSTS_QUERY, postsQueryVars } from "./PostList";

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $text: String!
    $slug: String!
    $tags: jsonb
  ) {
    insert_posts(
      objects: { title: $title, slug: $slug, text: $text, tags: $tags }
    ) {
      returning {
        id
        title
        slug
        tags
        text
        created_at
      }
    }
  }
`;

export default function PostNew() {
  const textareaRef = useRef(null);
  const { handleSubmit, register, errors, setValue } = useForm();
  const [
    createPost,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(CREATE_POST_MUTATION, {
    update(cache, { data }) {
      const cacheQuery = cache.readQuery({
        query: ALL_POSTS_QUERY,
        variables: postsQueryVars
      });
      const { posts, posts_aggregate } = cacheQuery;
      const {
        insert_posts: { returning }
      } = data;
      let updatedPosts = posts;
      if (updatedPosts.length > 9) updatedPosts.pop(); // maintain the same limit
      cache.writeQuery({
        query: ALL_POSTS_QUERY,
        variables: postsQueryVars,
        data: { posts: returning.concat(updatedPosts), posts_aggregate }
      });
    }
  });

  useEffect(() => {
    register(
      { name: "text" },
      {
        required: "Required",
        minLength: 20
      }
    );
  }, []);

  const onSubmit = async values => {
    const { title, slug, text, tags } = values;

    let body = {
      title,
      slug,
      text
    };
    if (tags) {
      body.tags = JSON.stringify(tags.split(",").map(item => item.trim()));
    }

    const result = await createPost({
      variables: body,
      ALL_POSTS_QUERY
      // refetchQueries: {
      //   query: ALL_POSTS_QUERY,
      //   variables: postsQueryVars
      // }
    });
    if (result) {
      Router.push("/post/manage");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label" htmlFor="title">
          หัวข้อ
        </label>
        <div className="control">
          <input
            name="title"
            className="input"
            ref={register({
              required: "Required",
              maxLength: 50
            })}
          />
        </div>
        {errors.title && (
          <p className="help is-danger">{errors.title.message}</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="slug">
          Slug
        </label>
        <div className="control">
          <input
            className="input"
            name="slug"
            type="slug"
            ref={register({
              required: "Required"
            })}
          />
        </div>
        {errors.slug && <p className="help is-danger">{errors.slug.message}</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="text">
          ข้อความ
        </label>
        <div className="control">
          <Textarea
            className="textarea"
            ref={textareaRef}
            name="text"
            onChange={e => {
              setValue("text", e.target.value);
            }}
          ></Textarea>
        </div>
        {errors.text && <p className="help is-danger">{errors.text.message}</p>}
        {errors.text && errors.text.type === "minLength" && (
          <p className="help is-danger">ข้อความสั้นเกินไป</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="tags">
          Tags
        </label>
        <div className="control">
          <input className="input" name="tags" type="tags" ref={register} />
        </div>
        {errors.tags && <p className="help is-danger">{errors.tags.message}</p>}
      </div>

      {/* {userData.error && <p className="error">Error: {userData.error}</p>} */}
      <button type="submit" disabled={mutationLoading}>
        Submit
      </button>

      {mutationError && (
        <p className="error">
          Error :( Please try again <br />
          {mutationError.message}
        </p>
      )}
    </form>
  );
}
