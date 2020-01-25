import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useForm } from "react-hook-form"
import Router from "next/router"
import { LANDS_QUERY, queryVars } from "./LandList"

const CREATE_LAND_MUTATION = gql`
  mutation createLand($type: String!, $area: String!, $zone: String!) {
    insert_land(objects: { type: $type, area: $area, zone: $zone }) {
      returning {
        id
        type
        area
        coords
        zone
        created_at
      }
    }
  }
`

export default function PostNew() {
  const { handleSubmit, register, errors } = useForm()
  const [
    createLand,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(CREATE_LAND_MUTATION, {
    update(cache, { data }) {
      const cacheQuery = cache.readQuery({
        query: LANDS_QUERY,
        variables: queryVars
      })
      const { land, land_aggregate } = cacheQuery
      const {
        insert_land: { returning }
      } = data
      let updateLands = land
      if (updateLands.length > 9) updateLands.pop() // maintain the same limit
      cache.writeQuery({
        query: LANDS_QUERY,
        variables: queryVars,
        data: { land: returning.concat(updateLands), land_aggregate }
      })
    }
  })

  const onSubmit = async values => {
    const result = await createLand({
      variables: values,
      LANDS_QUERY
    })
    if (result) {
      Router.push("/land")
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label" htmlFor="title">
          ประเภทการถือครอง
        </label>
        <div className="control">
          <label class="radio">
            <input
              name="type"
              type="radio"
              value="เนื้อที่เพาะปลูกของตนเอง"
              ref={register({ required: "ฟิลด์บังคับ" })}
            />
            เนื้อที่เพาะปลูกของตนเอง
          </label>
          <label class="radio">
            <input
              name="type"
              type="radio"
              value="เนื้อที่เพาะปลูกได้รับทำฟรี"
              ref={register({
                required: "ฟิลด์บังคับ"
              })}
            />
            เนื้อที่เพาะปลูกได้รับทำฟรี
          </label>
          <label class="radio">
            <input
              name="type"
              type="radio"
              value="เนื้อที่เพาะปลูกที่เช่า"
              ref={register({ required: "ฟิลด์บังคับ" })}
            />
            เนื้อที่เพาะปลูกที่เช่า
          </label>
        </div>
        {errors.type && <p className="help is-danger">{errors.type.message}</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="slug">
          จำนวน (ไร่)
        </label>
        <div className="control">
          <input
            className="input"
            name="area"
            type="text"
            ref={register({
              required: "ฟิลด์บังคับ",
              minLength: 1,
              pattern: {
                value: /^[0-9.]/,
                message: "ใส่ตัวเลขเท่านั้น"
              }
            })}
          />
        </div>
        {errors.area && <p className="help is-danger">{errors.area.message}</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="text">
          ข้อมูลโซนพื้นที่ของแปลง
        </label>
        <div className="control">
          <label class="radio">
            <input
              name="zone"
              type="radio"
              value="A"
              ref={register({ required: "ฟิลด์บังคับ" })}
            />
            A
          </label>
          <label class="radio">
            <input
              name="zone"
              type="radio"
              value="B"
              ref={register({ required: "ฟิลด์บังคับ" })}
            />
            B
          </label>
          <label class="radio">
            <input
              name="zone"
              type="radio"
              value="C"
              ref={register({ required: "ฟิลด์บังคับ" })}
            />
            C
          </label>
        </div>
        {errors.zone && <p className="help is-danger">{errors.zone.message}</p>}
      </div>

      {/* {userData.error && <p className="error">Error: {userData.error}</p>} */}
      <button type="submit" class="button is-success" disabled={mutationLoading}>
        Submit
      </button>

      {mutationError && (
        <p className="error">
          Error :( Please try again <br />
          {mutationError.message}
        </p>
      )}
    </form>
  )
}
