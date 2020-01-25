import App from "../components/App"
import InfoBox from "../components/InfoBox"
import { withApollo } from "../lib/apollo"
import FontAwesome from 'react-fontawesome'

const t = {
  คลองส่งน้ำชลประทาร:
  <FontAwesome
    name="check"
    className="check-btn fa-2x"
    style={{ color: "green" }}
  />,
  คลองน้ำธรรมชาติ:
  <FontAwesome
    name="check"
    className="check-btn fa-2x"
    style={{ color: "green" }}
  />,
  บ่อบาดาล:
  <FontAwesome
    name="times"
    className="times-btn fa-2x"
    style={{ color: "red" }}
  />,
  น้ำฝนตามฤดูกาล:
  <FontAwesome
    name="check"
    className="check-btn fa-2x"
    style={{ color: "green" }}
  />,
}

const BudgetPage = props => (
  <App>
    <InfoBox>
      <h1>ข้อมูลการใช้น้ำในการปลูกข้าว</h1>
      <span className="pull-right">
        <span>เพิ่ม</span>
      </span>
    </InfoBox>

    <nav className="level is-mobile">
      {Object.keys(t).map(k => (
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">{k} (บาท)</p>
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

export default withApollo(BudgetPage)
