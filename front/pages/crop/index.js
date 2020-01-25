import App from "../../components/App"
import InfoBox from "../../components/InfoBox"
import LandList from "../../components/LandList"
import Link from "next/link"
import { withApollo } from "../../lib/apollo"

const t = {
  ข้าวขาว: 13,
  ข้าวขาวดอกมะลี: 6.4,
  ข้าวเหนียว: 25
}

const CropPage = props => (
  <App>
    <InfoBox>
      <h1>ข้อมูลการปลูกข้าวและชนิดข้าวที่ปลูก</h1>
      <span className="pull-right">
        <span>เพิ่ม</span>
      </span>
    </InfoBox>

    <nav className="level is-mobile">
      {Object.keys(t).map(k => (
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">{k} (ไร่)</p>
            <p className="title">{t[k]}</p>
          </div>
        </div>
      ))}
    </nav>

    <style jsx>{`
      section {
        padding-bottom: 20px;
      }
      .level-item > div {
        display: flex;
        flex-direction: column;
      }
      .level-item p.heading {
        font-size: 0.8rem;
        clear: both;
      }
    `}</style>
  </App>
)

export default withApollo(CropPage)
