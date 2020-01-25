import App from "../../components/App"
import InfoBox from "../../components/InfoBox"
import { withApollo } from "../../lib/apollo"

const t = {
  ต้นทุน: "120,043",
  รายรับ: "198362.50"
}

const AssetPage = props => (
  <App>
    <InfoBox>
      <h1>ข้อมูลทรัพย์สินทางการเกษตรที่มี</h1>
      <span className="pull-right">
        <span>เพิ่ม</span>
      </span>
    </InfoBox>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th className="has-text-centered">#</th>
            <th className="has-text-centered">ทรัพย์สิน</th>
            <th className="has-text-centered">จำนวน</th>
            <th className="has-text-centered">ราคา (บาท)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>รถไถเครื่องยนต์</td>
            <td className="has-text-right">1</td>
            <td className="has-text-right">555,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>รถไถเดินตาม</td>
            <td className="has-text-right">4</td>
            <td className="has-text-right">80,000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>รถอีแต๋น</td>
            <td className="has-text-right">1</td>
            <td className="has-text-right">300,000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>เครื่องพ่นยาด้วยจักร</td>
            <td className="has-text-right">1</td>
            <td className="has-text-right">10,000</td>
          </tr>
          <tr>
            <td>5</td>
            <td>เครื่องพ่นยามือ</td>
            <td className="has-text-right">20</td>
            <td className="has-text-right">2,000</td>
          </tr>
          <tr>
            <td>6</td>
            <td>เครื่องสูบน้ำ</td>
            <td className="has-text-right">5</td>
            <td className="has-text-right">40,000</td>
          </tr>
        </tbody>
      </table>
    </div>

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

export default withApollo(AssetPage)
