const { Media } = require("../db/schema")
const _ = require("lodash")
const { errorHandler } = require("../db/errors")
const FileType = require("file-type")
const path = require("path")

const handleOneFile = async (item, body) => {
  // move photo to uploads directory
  const { ext, mime } = await FileType.fromBuffer(item.data)

  const one = {
    user: body.user,
    name: item.name,
    ext: ext,
    mimetype: mime,
    size: item.size
  }

  try {
    const media = await Media.query()
      .allowInsert("[user_id, name, mimetype, ext, size]")
      .insert(one)
    const nPath = path.join(process.env.MEDIA_DIR, `${media.id}.${media.ext}`)
    item.mv(nPath)
    return media
  } catch (err) {
    console.log(err)
    return false
  }
}

exports.uploadFiles = async (req, res, next) => {
  try {
    if (req.body.user === undefined) {
      res.send({
        status: false,
        message: "No user argument"
      })
      return
    }
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      })
      return
    } else {
      let data = []
      //loop all files
      const { datafiles } = req.files
      if (_.isArray(datafiles)) {
        for (let i = 0; i < datafiles.length; i++) {
          const item = await handleOneFile(datafiles[i], req.body)
          if (item) data.push(item)
        }
      } else {
        const item = await handleOneFile(datafiles, req.body)
        if (item) data.push(item)
      }
      //return response
      res.send({
        status: true,
        message: "Files are uploaded",
        data
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
