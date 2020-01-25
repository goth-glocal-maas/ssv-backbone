import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import Router from "next/router";

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $prefix: String
    $first_name: String
    $last_name: String
    $email: String
    $dob: Date
  ) {
    update_users(
      _set: {
        prefix: $prefix
        first_name: $first_name
        last_name: $last_name
        email: $email
        dob: $dob
      }
    ) {
      returning {
        prefix
        first_name
        last_name
        email
        dob
      }
    }
  }
`;

export default function Profile({ toggleEdit, post }) {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      title: post.title,
      slug: post.slug,
      text: post.text,
      tags: post.tags
    }
  });
  const [
    updateProfile,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_PROFILE_MUTATION);

  const onSubmit = async values => {
    const result = await updateProfile({
      variables: values
    });
    if (result) {
      setEdit(false)
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
          <textarea
            className="textarea"
            rows="10"
            ref={register({
              required: "Required",
              minLength: 20
            })}
            name="text"
          ></textarea>
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
        Update
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
