import App from "../../components/App"
import InfoBox from "../../components/InfoBox"
import LandList from "../../components/LandList"
import Link from "next/link"
import { withApollo } from "../../lib/apollo"

const LandPage = props => (
  <App>
    <InfoBox>
      <h1>ข้อมูลเชิงพื้นที่และการถือครองที่ดิน</h1>
      <span className="pull-right">
        <Link href="/land/new" className="button is-light is-success">
          เพิ่ม
        </Link>
      </span>
    </InfoBox>
    <LandList />
  </App>
)

export default withApollo(LandPage)
