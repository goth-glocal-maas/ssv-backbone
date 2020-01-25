import App from "../../components/App"
import InfoBox from "../../components/InfoBox"
import LandNew from "../../components/LandNew"
import { withApollo } from "../../lib/apollo"

const NewPostPage = props => {
  return (
    <App>
      <InfoBox><h1>เพิ่มข้อมูลเชิงพื้นที่และการถือครองที่ดิน</h1></InfoBox>
      <LandNew />
    </App>
  )
}

export default withApollo(NewPostPage)
